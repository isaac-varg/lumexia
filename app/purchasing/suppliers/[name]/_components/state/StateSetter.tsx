'use client'

import { Supplier } from "@/types/supplier"
import { SupplierNote } from "@/types/SupplierNote"
import { SupplierContact } from "@/types/supplierContact"
import { SupplierDetailPurchases } from "../../_actions/getPurchases"
import { SupplierDetailsItems } from "../../_actions/getItems"
import { SupplierAliasDetails } from "../../_actions/getAliases"
import { useSupplierDetailActions } from "@/store/supplierDetailSlice"
import { useEffect } from "react"

type Props = {
  supplier: Supplier
  notes: SupplierNote[]
  contacts: SupplierContact[]
  purchases: SupplierDetailPurchases[]
  items: SupplierDetailsItems[]
  aliases: SupplierAliasDetails[]
}

const StateSetter = ({ supplier, notes, contacts, purchases, items, aliases }: Props) => {

  const {
    setSupplier,
    setNotes,
    setContacts,
    setPurchases,
    setItems,
    setAliases,
  } = useSupplierDetailActions()

  useEffect(() => {
    setSupplier(supplier)
    setNotes(notes)
    setContacts(contacts)
    setPurchases(purchases)
    setItems(items)
    setAliases(aliases)
  }, [supplier, notes, contacts, purchases, items, aliases, setSupplier, setNotes, setContacts, setPurchases, setItems, setAliases])

  return false
}

export default StateSetter
