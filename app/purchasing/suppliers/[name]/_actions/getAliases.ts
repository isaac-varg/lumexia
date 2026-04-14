import prisma from "@/lib/prisma";
import { Alias } from "@/types/alias";
import { Item } from "@/types/item";
import { AliasType } from "@/types/aliasType";

export interface SupplierAliasDetails extends Alias {
  item: Item;
  aliasType: AliasType;
}

export const getAliases = async (supplierId: string) => {
  const aliases = await prisma.alias.findMany({
    where: {
      supplierAlias: {
        some: {
          supplierId: supplierId,
        },
      },
    },
    include: {
      item: true,
      aliasType: true,
    },
  });

  return aliases as SupplierAliasDetails[];
};