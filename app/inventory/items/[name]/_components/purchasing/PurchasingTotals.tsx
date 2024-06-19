import Layout from "@/components/Layout";
import { getPurchasesTotals } from "../../_functions/getPurchasesTotals";
import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { useEffect, useMemo, useState } from "react";
import ActionButton from "@/components/ActionButton";
import { getFilteredPurchases } from "../../_functions/getFilteredPurchases";
import { Item } from "@/types/item";
import { PurchaseOrderWithItems } from "./PurchasingPanel";
import { FlattenedPurchaseOrder } from "../../_functions/flattenPurchaseOrder";
import PricingChart from "./PricingChart";
import TotalCards from "./TotalCards";
import Text from "@/components/Text";
import PurchasesTable from "./PurchasesTable";
import QuantityChart from "./QuantityChart";

const PurchasingTotals = ({
  purchaseOrders,
  item,
}: {
  purchaseOrders: FlattenedPurchaseOrder[];
  item: Item;
}) => {
  const purchasesTotals = useMemo(
    () => getPurchasesTotals(purchaseOrders, item),
    [purchaseOrders, item],
  );

  const [dateRangeMode, setDateRangeMode] = useState<
    "yearToDate" | "lastYear" | "all"
  >("yearToDate");
  const [filteredPurchases, setFilteredPurchases] = useState(purchasesTotals);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const [countTotal, setCountTotal] = useState(0);

  useEffect(() => {
    const filtered = getFilteredPurchases(purchasesTotals, dateRangeMode);
    setFilteredPurchases(filtered);

    setQuantityTotal(
      filtered.reduce((acc: number, curr: any) => acc + curr.quantityTotal, 0),
    );

    setCountTotal(
      filtered.reduce((acc: number, curr: any) => acc + curr.countTotal, 0),
    );
  }, [dateRangeMode, purchasesTotals]);

  return (
    <div className="flex flex-col gap-y-4 h-full">
      <Layout.Row justify="end">
        <ActionButton
          color={dateRangeMode === "all" ? "cuttySark" : "cararra"}
          onClick={() => setDateRangeMode("all")}
        >
          All
        </ActionButton>
        <ActionButton
          color={dateRangeMode === "yearToDate" ? "cuttySark" : "cararra"}
          onClick={() => setDateRangeMode("yearToDate")}
        >
          This Year
        </ActionButton>
        <ActionButton
          color={dateRangeMode === "lastYear" ? "cuttySark" : "cararra"}
          onClick={() => setDateRangeMode("lastYear")}
        >
          Last Year
        </ActionButton>
      </Layout.Row>

      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <TotalCards
              filteredPurchases={filteredPurchases}
              countTotal={countTotal}
              quantityTotal={quantityTotal}
            />
          </div>
          <div className="col-span-2 w-full h-full">
            <Card.Root>
              <Card.Title size="small">pricing trends</Card.Title>
              <PricingChart data={filteredPurchases} />
            </Card.Root>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Card.Root>
              <Card.Title size="small">Quantity Trends</Card.Title>

              <QuantityChart data={filteredPurchases} />
            </Card.Root>
          </div>
          <div className="col-span-2 w-full h-full">
            <Card.Root>
              <Card.Title size="small">Purchase Orders</Card.Title>
              <PurchasesTable purchaseOrders={purchaseOrders} />
            </Card.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasingTotals;
