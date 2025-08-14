import { DateTime } from "luxon";
import { SupplierTotals } from "./getPurchasesTotals";

export const getQuantityChartData = (supplierTotals: SupplierTotals[]) => {
    const series = supplierTotals.map((supplierTotal: SupplierTotals) => {
        const data = supplierTotal.purchaseOrders.map(
            (purchase: any) => ({ y: purchase.quantity, x: DateTime.fromJSDate(purchase.createdAt) }),
        );

        return { name: supplierTotal.name, data };
    });

    return series;
};
