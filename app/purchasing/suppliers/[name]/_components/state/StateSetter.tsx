'use client'

import { Supplier } from "@/types/supplier"
import { SupplierNote } from "@/types/SupplierNote"
import { SupplierContact } from "@/types/supplierContact"
import { SupplierDetailPurchases } from "../../_actions/getPurchases"
import { SupplierDetailsItems } from "../../_actions/getItems"
import { useSupplierDetailActions } from "@/store/supplierDetailSlice"
import { useEffect } from "react"

type Props = {
  supplier: Supplier
  notes: SupplierNote[]
  contacts: SupplierContact[]
  purchases: SupplierDetailPurchases[]
  items: SupplierDetailsItems[]
}

const StateSetter = ({ supplier, notes, contacts, purchases, items }: Props) => {

  const {
    setSupplier,
    setNotes,
    setContacts,
    setPurchases,
    setItems,
  } = useSupplierDetailActions()

  useEffect(() => {
    setSupplier(supplier)
    setNotes(notes)
    setContacts(contacts)
    setPurchases(purchases)
    setItems(items)
  }, [supplier, notes, contacts, purchases, items, setSupplier, setNotes, setContacts, setPurchases, setItems])

  return false
}

export default StateSetter
