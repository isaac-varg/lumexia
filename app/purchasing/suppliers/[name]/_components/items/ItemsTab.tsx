"use client"
import React, { useEffect, useState } from "react";
import { SupplierDetailsItems } from "../../_actions/getItems";
import Card from "@/components/Card";
import ItemRow from "./ItemRow";
import { SupplierFilterItems, getFilteredItems } from "../../_actions/getFilteredItems";
import Text from "@/components/Text";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import Layout from "@/components/Layout";
import ActionButton from "@/components/ActionButton";

const chartOptions: ApexOptions = {
  chart: {
    type: "area",
  },
  stroke: { curve: "smooth" },
};

const ItemsTab = ({ items }: { items: SupplierDetailsItems[] }) => {
  const [selectedItem, setSelectedItem] =
    useState<SupplierDetailsItems | null>();

  const [itemData, setItemData] = useState<SupplierFilterItems | null>(null);
  const [dateRangeMode, setDateRangeMode] = useState<
    "yearToDate" | "lastYear" | "all"
  >("yearToDate");

  const handleItemClick = (item: SupplierDetailsItems) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    if (!selectedItem) return;

    const fetchData = async () => {
      try {
        const data = await getFilteredItems(
          selectedItem.item.id,
          selectedItem.purchaseOrders.supplierId,
          dateRangeMode
        );
        setItemData(data as any);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchData();
  }, [selectedItem, dateRangeMode]);


  return (
    <div className="flex gap-x-4">
      <div className="w-1/3">
        <Card.Root>
          <Card.Title size="small">Items Supplied</Card.Title>
          {items.map((item) => (
            <ItemRow key={item.id} item={item} selectedItemId={selectedItem?.id} onClick={handleItemClick} />
          ))}
        </Card.Root>
      </div>
      <div className="w-full min-h-80">
        <Card.Root>
          {!itemData ? <Skeleton count={5} /> : (
            <div className="w-full flex flex-row gap-x-6">
              <div className="w-1/3">
                <Card.Title size="small">Summary</Card.Title>
                <div className="flex flex-col gap-y-2">
                  <Text.LabelDataPair label="Total Spent" data={itemData.totalSpent.toLocaleString()} />
                  <Text.LabelDataPair label="Last Price" data={`${itemData.lastPaid.price} $/${itemData.lastPaid.uom.abbreviation}`} />
                  <Text.LabelDataPair label="UOM(s)" data={itemData.uoms.toString()} />
                  <Text.LabelDataPair label="Purchases" data={itemData.purchases.length} />
                </div>
              </div>
              <div className="w-full min-h-80 ">
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
                <Card.Title size="small">Trends


                </Card.Title>
                {itemData && <Chart
                  options={chartOptions}
                  series={itemData.pricingChartData}
                  type="area"
                  height={"100%"}
                />}
              </div>
            </div>)}
        </Card.Root>
      </div>
    </div>
  );
};

export default ItemsTab;
