'use server'

import { ItemType } from "@/actions/inventory/itemTypes/getAll"
import prisma from "@/lib/prisma"

export const updateItemTypes = async (itemTypes: ItemType[]) => {

  const responses = await Promise.all(itemTypes.map(async (it) => {
    if (!it.config) return;

    const response = await prisma.itemType.update({
      where: {
        id: it.id,
      },
      data: {
        name: it.name,
      }
    });

    await prisma.itemTypeConfig.update({
      where: {
        id: it.config.id
      },
      data: {
        isPricingExaminationTriggerEnabled: it.config.isPricingExaminationTriggerEnabled,
      }
    })

    return response;

  }));

  return responses

}
