import Layout from "@/components/Layout";
import { getPurchasesTotals } from "../../_functions/getPurchasesTotals";
import Card from "@/components/Card";
import { useEffect, useMemo, useState } from "react";
import ActionButton from "@/components/ActionButton";
import { getFilteredPurchases } from "../../_functions/getFilteredPurchases";
import { Item } from "@/types/item";
import { FlattenedPurchaseOrder } from "../../_functions/flattenPurchaseOrder";
import PricingChart from "./PricingChart";
import TotalCards from "./TotalCards";
import PurchasesTable from "./PurchasesTable";
import QuantityChart from "./QuantityChart";
import Dropdown from "@/components/Dropdown";
import { getPurchaseOrderYears } from "../../_functions/getPurchaseOrderYears";

const PurchasingTotals = ({
    purchaseOrders,
    item,
}: {
    purchaseOrders: FlattenedPurchaseOrder[];
    item: Item;
}) => {
    const purchaseOrderYears = useMemo(() => getPurchaseOrderYears(purchaseOrders), [purchaseOrders, item])
    const [selectedYear, setSelectedYear] = useState<string>()

    const purchasesTotals = useMemo(
        () => getPurchasesTotals(purchaseOrders, item),
        [purchaseOrders, item],
    );

    const [dateRangeMode, setDateRangeMode] = useState<
        "yearToDate" | "lastYear" | "all" | "yearSelection"
    >("yearToDate");
    const [filteredPurchases, setFilteredPurchases] = useState(purchasesTotals);
    const [quantityTotal, setQuantityTotal] = useState(0);
    const [countTotal, setCountTotal] = useState(0);

    useEffect(() => {
        const filtered = getFilteredPurchases(purchasesTotals, dateRangeMode, selectedYear);
        setFilteredPurchases(filtered);

        setQuantityTotal(
            filtered.reduce((acc: number, curr: any) => acc + curr.quantityTotal, 0),
        );

        setCountTotal(
            filtered.reduce((acc: number, curr: any) => acc + curr.countTotal, 0),
        );
    }, [dateRangeMode, purchasesTotals, selectedYear]);

    return (
        <div className="flex flex-col gap-y-4 h-full">
            <Layout.Row justify="end">
                <Dropdown.General
                    onClick={(value) => {
                        setDateRangeMode('yearSelection')
                        setSelectedYear(value)
                    }}
                    label="Select Year"
                    options={purchaseOrderYears.map((year) => ({ label: year.toString(), value: year.toString() }))}


                />
                <button className={`btn  ${dateRangeMode === 'all' ? 'btn-accent' : ''}`}
                    onClick={() => setDateRangeMode("all")}
                >
                    All
                </button>
                <button className={`btn  ${dateRangeMode === 'yearToDate' ? 'btn-accent' : ''}`}
                    onClick={() => setDateRangeMode("yearToDate")}
                >
                    This Year
                </button>
                <button className={`btn  ${dateRangeMode === 'lastYear' ? 'btn-accent' : ''}`}
                    onClick={() => setDateRangeMode("lastYear")}
                >
                    Last Year
                </button>

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
                    <div className="col-span-2 w-full">
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
