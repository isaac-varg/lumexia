"use server"

import { requestStatuses } from "@/configs/staticRecords/requestStatuses";
import prisma from "@/lib/prisma"

const { delivered, requestCancelledDuplicateRequest, discontinuedIngredient } = requestStatuses;

export const getRequests = async () => {
  const requests = await prisma.purchasingRequest.findMany({
    where: {
      statusId: {
        notIn: [
          delivered,
          requestCancelledDuplicateRequest,
          discontinuedIngredient,
        ]
      }
    },
    include: {
      item: true,
      status: true,
      priority: true,
      pos: {
        include: {
          po: {
            include: {
              supplier: true,
              purchaseOrderItems: {
                include: {
                  purchaseOrderStatus: true,
                  details: true
                }
              }
            }
          }
        }
      },
      supplierTags: {
        include: {
          supplier: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const workedUp = requests.map((r) => {
    const relevantPoItems = r.pos.length > 0 ? r.pos[0].po.purchaseOrderItems.filter((i) => i.itemId === r.itemId) : null;

    const suppliers = new Map();
    r.supplierTags.forEach(tag => {
      if (tag.supplier) {
        suppliers.set(tag.supplier.id, tag.supplier);
      }
    });
    r.pos.forEach(p => {
      if (p.po.supplier) {
        suppliers.set(p.po.supplier.id, p.po.supplier);
      }
    });
    const uniqueSuppliers = Array.from(suppliers.values());

    return ({
      ...r,
      requestedItemName: r.item.name,
      statusName: r.status.name,
      priorityName: r.priority.name,
      relevantPoItems,
      suppliers: uniqueSuppliers
    })
  })


  return workedUp
}


export type RequestForDashboard = Awaited<ReturnType<typeof getRequests>>[number]

// alias for some other types I made to match the one above 
export type IPurchasingRequest = RequestForDashboard

