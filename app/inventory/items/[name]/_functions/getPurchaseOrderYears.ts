import { FlattenedPurchaseOrder } from "./flattenPurchaseOrder";

export const getPurchaseOrderYears = (purchaseOrders: FlattenedPurchaseOrder[]): number[] => {
    const yearSet = new Set<number>();

    purchaseOrders.forEach((po) => {
        yearSet.add(po.createdAt.getFullYear());
    })

    return Array.from(yearSet).sort((a, b) => a - b); 
}
