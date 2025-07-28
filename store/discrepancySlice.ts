import { getUserId } from "@/actions/users/getUserId";
import { DiscrepancyItem, getDisrepancyItem } from "@/app/inventory/audit/discrepancy/conduct/_actions/getDiscrepancyItem";
import { handleDiscrepancyAuditAdjustment } from "@/app/inventory/audit/discrepancy/conduct/_actions/handleDiscrepencyAuditAdjustment";
import { getItemIdFromLot } from "@/app/purchasing/requests/new/_functions/getItemIdFromLot";
import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma";
import { warn } from "console";
import { create } from "zustand"

export type DiscrepancyAppMode = 'view' | 'item';

type State = {
    item: DiscrepancyItem | null
    isItemLoading: boolean
    isAdjustmentLoading: boolean
    itemLots: DiscrepancyItem['lots']
    mode: DiscrepancyAppMode

}

type Actions = {
    actions: {
        setSelectedItem: (id: string) => void;
        adjustLotQuantity: (lotId: string, newQuantity: number, currentQuantity: number) => void;
    }
}

export const useDiscrepancySelection = create<State & Actions>((set, get) => ({
    mode: 'view',
    item: null,
    itemLots: [],
    isItemLoading: false,
    isAdjustmentLoading: false,

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


        adjustLotQuantity: async (lotId, newQuantity, currentQuantity) => {

            set(() => ({ isAdjustmentLoading: true }))
            const { item } = get()

            if (!item) throw new Error('Cannot adjust quantity: Item not found');

            try {
                await handleDiscrepancyAuditAdjustment(item.id, newQuantity, currentQuantity, lotId);
                set((state) => ({
                    itemLots: state.itemLots.map((lot) =>
                        lot.id === lotId ? { ...lot, newQuantity } : lot
                    ),
                }));
            } catch (error) {
                console.log(error)
            } finally {
                set(() => ({ isAdjustmentLoading: false }))
            }
        },

    },
}))

export const useDiscrepancyActions = () => useDiscrepancySelection((state) => state.actions)
