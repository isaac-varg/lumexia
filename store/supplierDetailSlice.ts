import { Supplier } from "@/types/supplier"
import { SupplierNote } from "@/types/SupplierNote"
import { SupplierContact } from "@/types/supplierContact"
import { SupplierDetailPurchases } from "@/app/purchasing/suppliers/[name]/_actions/getPurchases"
import { SupplierDetailsItems } from "@/app/purchasing/suppliers/[name]/_actions/getItems"
import { create } from "zustand"

type State = {
  supplier: Supplier | null
  notes: SupplierNote[]
  contacts: SupplierContact[]
  purchases: SupplierDetailPurchases[]
  items: SupplierDetailsItems[]
  selectedContact: SupplierContact | null
  selectedNote: SupplierNote | null
}

type Actions = {
  actions: {
    setSupplier: (supplier: Supplier) => void
    setNotes: (notes: SupplierNote[]) => void
    setContacts: (contacts: SupplierContact[]) => void
    setPurchases: (purchases: SupplierDetailPurchases[]) => void
    setItems: (items: SupplierDetailsItems[]) => void
    setSelectedContact: (contact: SupplierContact | null) => void
    setSelectedNote: (note: SupplierNote | null) => void
  }
}

export const useSupplierDetailSelection = create<State & Actions>((set) => ({
  supplier: null,
  notes: [],
  contacts: [],
  purchases: [],
  items: [],
  selectedContact: null,
  selectedNote: null,

  actions: {
    setSupplier: (supplier) => set(() => ({ supplier })),
    setNotes: (notes) => set(() => ({ notes })),
    setContacts: (contacts) => set(() => ({ contacts })),
    setPurchases: (purchases) => set(() => ({ purchases })),
    setItems: (items) => set(() => ({ items })),
    setSelectedContact: (contact) => set(() => ({ selectedContact: contact })),
    setSelectedNote: (note) => set(() => ({ selectedNote: note })),
  },
}))

export const useSupplierDetailActions = () => useSupplierDetailSelection((state) => state.actions)
