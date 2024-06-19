import { Item } from "@/types/item";
import { FlattenedPurchaseOrder } from "./flattenPurchaseOrder";

export type SupplierTotals = {
    name: string;
    purchaseOrders: {
        id: string;
        referenceCode: number;
        createdAt: Date;
        pricePerUnit: number;
        quantity: number;
    }[];
    supplierId: string;
};

export const getPurchasesTotals = (
    data: FlattenedPurchaseOrder[],
    item: Item,
): SupplierTotals[] => {

    const supplierTotals: SupplierTotals[] = data.reduce(
        (acc: SupplierTotals[], curr: FlattenedPurchaseOrder) => {
            const itemIndexFromPO = curr.purchaseOrderItems.findIndex(
                (lineItem) => lineItem.itemId === item.id,
            );
            if (itemIndexFromPO === -1) {
                return acc;
            }

            const lineItem = curr.purchaseOrderItems[itemIndexFromPO];

            const {
                id: purchaseOrderId,
                supplierId,
                supplierName,
                createdAt,
                referenceCode,
            } = curr;

            const supplierIndexInAccumulator = acc.findIndex(
                (supplier: SupplierTotals) => supplier.supplierId === supplierId,
            );

            if (supplierIndexInAccumulator >= 0) {
                acc[supplierIndexInAccumulator].purchaseOrders.push({
                    id: purchaseOrderId,
                    referenceCode: referenceCode,
                    createdAt: createdAt,
                    pricePerUnit: lineItem.pricePerUnit,
                    quantity: lineItem.quantity,
                });
                return acc;
            }

            return [
                ...acc,
                {
                    name: supplierName,
                    supplierId: supplierId,
                    purchaseOrders: [
                        {
                            id: purchaseOrderId,
                            referenceCode: referenceCode,
                            createdAt: createdAt,
                            pricePerUnit: lineItem.pricePerUnit,
                            quantity: lineItem.quantity,
                        },
                    ],
                },
            ];
        },
        []
    );

    return supplierTotals;
};

