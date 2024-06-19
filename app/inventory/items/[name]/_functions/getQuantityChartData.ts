import { SupplierTotals } from "./getPurchasesTotals";

export const getQuantityChartData = (
  supplierTotals: SupplierTotals[],
) => {
  const series = supplierTotals.map((supplierTotal: SupplierTotals) => {
    const data = supplierTotal.purchaseOrders.map(
      (purchase: any) => purchase.quantity,
    );

    return { name: supplierTotal.name, data,  };
  });

  return series;
};
