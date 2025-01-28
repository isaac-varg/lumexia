import { POItem } from "./getPOItems";

export const flattenOrderItems = (
  items: POItem[]
)  => {
  return items.map((item) => {
    
    const alias = item.alias ? item.alias.alias.name : null;

    return {
      ...item,
      itemName: item.item.name,
      itemReferenceCode: item.item.referenceCode,
      uomName: item.uom.name,
      uomAbbreviation: item.uom.abbreviation,
      status: item.purchaseOrderStatus.name,
      alias,
    };
  });
};


export type PoFlattenedOrderItems = ReturnType<typeof flattenOrderItems>


export type FlattenedOrderItem =  PoFlattenedOrderItems[number]
