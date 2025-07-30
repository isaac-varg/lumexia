import { DiscrepancyItem, getDisrepancyItem } from "@/app/inventory/audit/discrepancy/conduct/_actions/getDiscrepancyItem";
import { handleDiscrepancyAuditAdjustment } from "@/app/inventory/audit/discrepancy/conduct/_actions/handleDiscrepencyAuditAdjustment";
import { getItemIdFromLot } from "@/app/purchasing/requests/new/_functions/getItemIdFromLot";
import { create } from "zustand"
import { AuditItemNoteType, getAuditItemNoteTypes } from "@/app/inventory/audit/discrepancy/conduct/_actions/getAuditItemNoteTypes";
import { AuditItemNote, getAuditItemNotes } from "@/app/inventory/audit/discrepancy/conduct/_actions/getAuditItemNotes";
import { DiscrepancyAudit, getDiscrepancyAudit } from "@/app/inventory/audit/discrepancy/conduct/_actions/getDiscrepancyAudit";
import { getAllDiscrepancyAuditItems } from "@/app/inventory/audit/discrepancy/conduct/_actions/getAllDiscrepancyAuditItems";

export type DiscrepancyAppMode = 'view' | 'item';

type State = {
    audit: DiscrepancyAudit | null
    auditItems: DiscrepancyItem[]
    item: DiscrepancyItem | null
    isItemLoading: boolean
    isAdjustmentLoading: boolean
    itemLots: DiscrepancyItem['lots']
    mode: DiscrepancyAppMode
    noteTypes: AuditItemNoteType[]
    notes: AuditItemNote[]

}

type Actions = {
    actions: {
        setSelectedItem: (id: string) => void;
        setSeletedItemFromApp: (item: DiscrepancyItem) => void;
        adjustLotQuantity: (lotId: string, newQuantity: number, currentQuantity: number) => void;
        getNoteTypes: () => void;
        getNotes: () => void;
        getDiscrepancyAudit: (auditId: string) => void;
        getAuditItems: () => void;
        zeroDepletions: (lots: string[]) => void;
        setDiscrepancyAppMode: (mode: DiscrepancyAppMode) => void;
        clearAuditItems: () => void;
        clearItem: () => void;
    }
}

export const useDiscrepancySelection = create<State & Actions>((set, get) => ({
    mode: 'item',
    audit: null,
    auditItems: [],
    item: null,
    itemLots: [],
    isItemLoading: false,
    itemQuantityTotal: 0,
    isAdjustmentLoading: false,
    noteTypes: [],
    notes: [],

    actions: {
        setSelectedItem: async (id) => {
            set(() => ({ isItemLoading: true }));
            try {
                const itemId = await getItemIdFromLot(id);
                const itemData = await getDisrepancyItem(itemId);


                set(() => ({
                    item: itemData,
                    itemLots: itemData.lots
                }));
            } catch (error) {
                console.error('Failed', error);
            } finally {
                set(() => ({ isItemLoading: false }))
            };
        },

        setSeletedItemFromApp: (item) => {
            set(() => ({ item: item, itemLots: item.lots }))
        },

        setDiscrepancyAppMode: (mode) => {
            set(() => ({ mode, }))
        },

        zeroDepletions: (lots) => {

            set((state) => ({
                itemLots: state.itemLots.map((lot) =>
                    lots.includes(lot.id) ? { ...lot, totalQuantityOnHand: 0 } : lot
                ),
            }));

        },

        adjustLotQuantity: async (lotId, newQuantity, currentQuantity) => {

            set(() => ({ isAdjustmentLoading: true }))
            const { item } = get()

            if (!item) throw new Error('Cannot adjust quantity: Item not found');

            try {
                await handleDiscrepancyAuditAdjustment(item.id, newQuantity, currentQuantity, lotId);
                set((state) => ({
                    itemLots: state.itemLots.map((lot) =>
                        lot.id === lotId ? { ...lot, totalQuantityOnHand: newQuantity } : lot
                    ),
                }));
            } catch (error) {
                console.log(error)
            } finally {
                set(() => ({ isAdjustmentLoading: false }))
            }
        },

        getNoteTypes: async () => {
            const noteTypes = await getAuditItemNoteTypes();
            set(() => ({ noteTypes, }))
        },

        getNotes: async () => {
            const { item } = get()
            if (!item) return;

            const notes = await getAuditItemNotes(item.id);
            set(() => ({ notes, }))
        },

        getDiscrepancyAudit: async (auditId) => {
            const audit = await getDiscrepancyAudit(auditId);
            set(() => ({ audit, }))
        },

        getAuditItems: async () => {
            const { audit } = get()

            if (!audit) return;

            const auditItems = await getAllDiscrepancyAuditItems(audit.id);

            set(() => ({ auditItems, }))
        },

        clearAuditItems: () => {
            set(() => ({ auditItems: [] }))
        },
        clearItem: () => {
            set(() => ({ item: null }))
        }


    },
}))

export const useDiscrepancyActions = () => useDiscrepancySelection((state) => state.actions)
