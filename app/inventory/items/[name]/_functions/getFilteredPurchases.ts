import { DateTime } from "luxon";
import { isDateInInterval } from "./isDateInInterval";
import { SupplierTotals } from "./getPurchasesTotals";

export const getFilteredPurchases = (
  data: SupplierTotals[],
  mode: "yearToDate" | "lastYear" | "all",
) => {
  const currentDate = DateTime.now();
  let start: DateTime;
  let end: DateTime;

  switch (mode) {
    case "yearToDate":
      start = DateTime.local(currentDate.year, 1, 1);
      end = currentDate;
      break;
    case "lastYear":
      start = DateTime.local(currentDate.minus({ years: 1 }).year, 1, 1);
      end = DateTime.local(currentDate.minus({ years: 1 }).year, 12, 31);
      break;
    case "all":
      start = DateTime.local(1970, 1, 1); //arbitrary dates to encompasses all
      end = DateTime.local(9999, 12, 31);
      break;
    default:
      throw new Error("Invalid mode");
  }

  const filtered = data.map((supplier) => {
    const filteredPOs = supplier.purchaseOrders.filter((purchase) => {
      const createdAt = DateTime.fromJSDate(purchase.createdAt);
      return isDateInInterval(start, end, createdAt);
    });

    const quantityTotal = filteredPOs.reduce(
      (acc, curr) => acc + curr.quantity,
      0,
    );

    const countTotal = filteredPOs.length;

    return {
      ...supplier,
      purchaseOrders: filteredPOs,
      quantityTotal,
      countTotal,
    };
  });

  return filtered;
};
