"use server"

import prisma from "@/lib/prisma";
import { Alias } from "@/types/alias";
import { IExSupplierAlias, SupplierAlias } from "@/types/supplierAlias";

export interface IAliasWithSupplier extends Alias {
    supplierAlias: IExSupplierAlias[] 
}

export const getAliases = async (itemId: string) => {
    const aliases = await prisma.alias.findMany({
        where: {
            itemId,
        },
        include: {
            aliasType: true,
            supplierAlias: {
                include: {
                    supplier: true
                }
            }
        }
    })

    return aliases as any 

    

}
