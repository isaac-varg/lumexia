import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import { SupplierAlias } from "@/types/supplierAlias";

export interface POItemWithAlias extends PurchaseOrderItem {
    alias: SupplierAlias | null;
}

export interface FlattenedOrderItem extends PurchaseOrderItem {
  itemName: string;
  itemReferenceCode: string;
  uomName: string;
  uomAbbreviation: string;
  status: string;
  quantity: number
  alias: string | null

}

export const flattenOrderItems = (
  items: POItemWithAlias[]
): FlattenedOrderItem[] => {
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
