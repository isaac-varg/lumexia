import item from "@/prisma/seed/data/item";
import { Lot } from "@/types/lot";

export interface FlattenedLot extends Lot {
  containerTypeName: string;
  containerQuantity: number;
  totalQuantityOnHand: number;
  uomName: string;
  uomAbbreviation: string;
  lotNumber: string;
}

export const flattenLots = (lots: Lot[]): FlattenedLot[] => {
  return lots.map((lot) => {
    if (!lot.uom || lot.containers.length < 1) {
      return;
    }

    const uniqueContainerTypes = new Set(
      lot.containers.map((container) => container.containerTypeId),
    );

    const isSingleContainerType = uniqueContainerTypes.size === 1;

    const {
      uom: { name: uomName, abbreviation: uomAbbreviation },
      lotNumber,
    } = lot;

    const containerTypeName = isSingleContainerType
      ? lot.containers[0].containerType.name
      : "Multiple";
    const containerQuantity = lot.containers.length;

    return {
      ...lot,
      containerTypeName,
      containerQuantity,
      uomName,
      uomAbbreviation,
      lotNumber,
    } as any;
  });
};
