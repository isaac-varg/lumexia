'use server'

import prisma from "@/lib/prisma"
import { getOneItem } from "@/actions/inventory/items/getOne"
import { getLotsByItem } from "@/actions/auxiliary/getLotsByItem"
import { getAudits } from "@/app/inventory/items/[name]/_actions/inventory/getAudits"
import { getItemPurchaseOrders } from "@/app/inventory/items/[name]/_actions/purchasing/getItemPurchaseOrders"
import { getAllItemNotesByItem } from "@/actions/inventory/items/notes/getAllByItem"

const getAuditRequestsByItem = async (itemId: string) => {
  const requests = await prisma.auditRequest.findMany({
    where: { itemId },
    include: {
      item: true,
      requestedBy: true,
      status: true,
      notes: {
        include: {
          noteType: true,
          user: true,
        }
      },
      inventoryAudit: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return requests
}

const getInvestigationLots = async (itemId: string) => {
  const lots = await getLotsByItem(itemId)

  const lotIds = lots.map(l => l.id)

  const lotNotes = await prisma.lotNote.findMany({
    where: { lotId: { in: lotIds } },
    include: {
      user: true,
      noteType: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const notesByLot = new Map<string, typeof lotNotes>()
  for (const note of lotNotes) {
    const existing = notesByLot.get(note.lotId) || []
    existing.push(note)
    notesByLot.set(note.lotId, existing)
  }

  return lots.map(lot => ({
    ...lot,
    lotNotes: notesByLot.get(lot.id) || [],
  }))
}

export const getInvestigationData = async (itemId: string) => {
  const item = await getOneItem(itemId)

  const [
    lots,
    purchaseOrders,
    audits,
    auditRequests,
    notes,
  ] = await Promise.all([
    getInvestigationLots(item.id),
    getItemPurchaseOrders(item.id),
    getAudits(item.id),
    getAuditRequestsByItem(item.id),
    getAllItemNotesByItem(item.id),
  ])

  return { item, lots, purchaseOrders, audits, auditRequests, notes }
}

export type InvestigationData = Awaited<ReturnType<typeof getInvestigationData>>
export type InvestigationLot = InvestigationData['lots'][number]
export type InvestigationAuditRequest = InvestigationData['auditRequests'][number]
