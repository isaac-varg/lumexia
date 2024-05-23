import { PurchaseOrderItem } from "@/types/purchaseOrderItem";

export const calculateGrandTotal = (items: PurchaseOrderItem[]) => {
    return items.reduce((total, item) => {
        return total + item.quantity * item.pricePerUnit;
      }, 0);
}
