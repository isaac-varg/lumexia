import { join } from "path";
import { SupplierTotals } from "./getPurchasesTotals";
import { DateTime } from "luxon";

export const getPricingChartData = (
  supplierTotals: SupplierTotals[],
) => {

  const series = supplierTotals.map((supplierTotal: SupplierTotals) => {
    const data = supplierTotal.purchaseOrders.map(
      (purchase: any) => ({y: purchase.pricePerUnit, x: DateTime.fromJSDate(purchase.createdAt) }),
    );

    return { name: supplierTotal.name, data,  };
  });

  return series;
};

