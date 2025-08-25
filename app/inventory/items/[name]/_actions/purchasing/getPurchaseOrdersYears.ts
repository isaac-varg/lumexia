import { DashboardItemPurchaseOrder } from "./getItemPurchaseOrders";

export const getPurchaseOrdersYears = (purchaseOrders: DashboardItemPurchaseOrder[]): number[] => {
  const yearSet = new Set<number>();

  purchaseOrders.forEach((po) => {
    yearSet.add(po.createdAt.getFullYear());
  })

  return Array.from(yearSet).sort((a, b) => a - b);
}
