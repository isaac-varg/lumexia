import { PurchaseOrderItem } from "@/types/purchaseOrderItem";

export interface FlattenedOrderItem extends PurchaseOrderItem {
  itemName: string;
  itemReferenceCode: string;
  uomName: string;
  uomAbbreviation: string;
  status: string;
  quantity: number
}

export const flattenOrderItems = (
  items: PurchaseOrderItem[]
): FlattenedOrderItem[] => {
  return items.map((item) => {
    return {
      ...item,
      itemName: item.item.name,
      itemReferenceCode: item.item.referenceCode,
      uomName: item.uom.name,
      uomAbbreviation: item.uom.abbreviation,
      status: item.purchaseOrderStatus.name,
    };
  });
};
