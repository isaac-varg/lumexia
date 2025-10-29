"use server"

import { uom } from "@/configs/staticRecords/unitsOfMeasurement";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import prisma from "@/lib/prisma";

export const getItemsForGenericUnits = async () => {
  const items = await prisma.item.findMany({
    where: {
      recordStatusId: {
        not: recordStatuses.archived,
      },
      purchaseOrderItem: {
        some: {
          OR: [
            { uomId: uom.units },
            { uomId: uom.case },
          ]
        }
      }
    },
    include: {
      purchaseOrderItem: {
        include: {
          purchaseOrders: {
            include: {
              supplier: true
            }
          }
        }
      }
    }
  });


  return items;
}

export type ItemForGenericUnits = Awaited<ReturnType<typeof getItemsForGenericUnits>>[number]
