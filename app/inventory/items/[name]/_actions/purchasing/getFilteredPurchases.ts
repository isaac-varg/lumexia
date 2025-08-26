import { DateTime } from "luxon";
import { isDateInInterval } from "./getIsWithinDateRange";
import { DashboardItemPurchaseOrder } from "./getItemPurchaseOrders";
import { groupByProperty } from "@/utils/data/groupByProperty";

export type PurchasingFilterMode = "yearToDate" | "lastYear" | "all" | "yearSelection"


export const getFilteredPurchases = (
  data: DashboardItemPurchaseOrder[],
  mode: PurchasingFilterMode,
  year?: string,
) => {

  // get start and end date for date range
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
    case "yearSelection":
      if (year == null) {
        throw new Error("Year must be provided for yearSelection mode.");
      }
      start = DateTime.local(parseInt(year), 1, 1);
      end = DateTime.local(parseInt(year), 12, 31);
      break;
    case "all":
      start = DateTime.local(1970, 1, 1); //arbitrary dates to encompasses all
      end = DateTime.local(9999, 12, 31);
      break;
    default:
      throw new Error("Invalid mode");
  }


  const filteredPOs = data.filter(po => {
    const createdAt = DateTime.fromJSDate(po.purchaseOrders.createdAt);
    return isDateInInterval(start, end, createdAt);
  });


  const groupedBySupplier = groupByProperty(filteredPOs, 'purchaseOrders.supplier.name');

  const suppliers = Object.values(groupedBySupplier).map(
    (purchaseOrders) => {
      const { supplier } = purchaseOrders[0].purchaseOrders;
      const quantityTotal = purchaseOrders.reduce((acc, curr) => curr.quantity + acc, 0);
      const purchasesTotal = purchaseOrders.reduce((acc, curr) => curr.lineTotal + acc, 0)




      return {
        quantityTotal,
        purchasesTotal,
        supplier,
        purchaseOrders,
      };
    },
  );

  return suppliers;
};

export type FilteredPurchaseOrder = Awaited<ReturnType<typeof getFilteredPurchases>>[number]
