import { SupplierTotals } from "./getPurchasesTotals";

export const getPricingChartData = (
  supplierTotals: SupplierTotals[],
) => {
  const series = supplierTotals.map((supplierTotal: SupplierTotals) => {
    const data = supplierTotal.purchaseOrders.map(
      (purchase: any) => purchase.pricePerUnit,
    );

    return { name: supplierTotal.name, data,  };
  });

  return series;
};
