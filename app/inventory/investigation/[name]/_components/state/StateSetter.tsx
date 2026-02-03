'use client'

import { SingleItem } from "@/actions/inventory/getOneItem"
import { ItemNote } from "@/actions/inventory/items/notes/getAllByItem"
import { ItemInventoryAudits } from "@/app/inventory/items/[name]/_actions/inventory/getAudits"
import { DashboardItemPurchaseOrder } from "@/app/inventory/items/[name]/_actions/purchasing/getItemPurchaseOrders"
import { InvestigationAuditRequest, InvestigationLot } from "../../_actions/getInvestigationData"
import { useInvestigationActions } from "@/store/investigationSlice"
import { useEffect } from "react"

type StateSetterProps = {
  item: SingleItem | null
  lots: InvestigationLot[]
  purchaseOrders: DashboardItemPurchaseOrder[]
  audits: ItemInventoryAudits
  auditRequests: InvestigationAuditRequest[]
  notes: ItemNote[]
}

const StateSetter = ({
  item,
  lots,
  purchaseOrders,
  audits,
  auditRequests,
  notes,
}: StateSetterProps) => {

  const {
    setItem,
    setLots,
    setPurchaseOrders,
    setAudits,
    setAuditRequests,
    setNotes,
    setCurrentTab,
  } = useInvestigationActions()

  useEffect(() => {
    setItem(item)
    setCurrentTab('lots')
  }, [item, setItem, setCurrentTab])

  useEffect(() => {
    setLots(lots)
    setPurchaseOrders(purchaseOrders)
    setAudits(audits)
    setAuditRequests(auditRequests)
    setNotes(notes)
  }, [item, lots, purchaseOrders, audits, auditRequests, notes, setLots, setPurchaseOrders, setAudits, setAuditRequests, setNotes])

  return false
}

export default StateSetter
