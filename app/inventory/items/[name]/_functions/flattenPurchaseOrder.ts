import { PurchaseOrderWithItems } from "../_components/purchasing/PurchasingPanel";

export interface FlattenedPurchaseOrder extends PurchaseOrderWithItems {
  supplierName: string;
  statusName: string;
}

export const flattenPurchaseOrders = (
  purchaseOrders: PurchaseOrderWithItems[]
): FlattenedPurchaseOrder[] => {
  return purchaseOrders.map((purchaseOrder) => {
    return {
      ...purchaseOrder,
      supplierName: purchaseOrder.supplier.name,
      statusName: purchaseOrder.status.name,
    };
  });
};

