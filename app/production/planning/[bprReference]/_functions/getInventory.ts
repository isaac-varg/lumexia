
"use server"

import { getLotsByItem } from "@/actions/auxiliary/getLotsByItem"
import { ExBprBom } from "@/types/bprBom"

export const getInventory = async (bom: ExBprBom[]) => {
    const data = await Promise.all(bom.map(async (material: ExBprBom) => {
        const lots = await getLotsByItem(material.bom.itemId)

        const totalOnHand = lots.reduce(
            (accumulator: number, current: any) => accumulator + current.totalQuantityOnHand, 0
        );

        return {
            ...material,
            totalQuantityOnHand: totalOnHand,
        }
    }))

    return data
}


const getAllocations = async ()

