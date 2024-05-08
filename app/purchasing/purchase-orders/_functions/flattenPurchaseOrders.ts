import { PurchaseOrder } from "@/types/purchaseOrder";

export interface FlattenedPurchaseOrder extends PurchaseOrder {
  supplierName: string;
  statusName: string;
}

export const flattenPurchaseOrders = (
  purchaseOrders: PurchaseOrder[]
): FlattenedPurchaseOrder[] => {
  return purchaseOrders.map((purchaseOrder) => {
    return {
      ...purchaseOrder,
      supplierName: purchaseOrder.supplier.name,
      statusName: purchaseOrder.status.name,
    };
  });
};
