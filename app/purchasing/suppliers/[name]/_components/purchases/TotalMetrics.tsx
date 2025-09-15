import Card from "@/components/Card";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SupplierDetailPurchases } from "../../_actions/getPurchases";
import {
  SupplierDetailsFilteredPurchases,
  getFilteredPurchases,
} from "../../_actions/getFilteredPurchases";
import ActionButton from "@/components/ActionButton";
import Text from "@/components/Text";
import { ApexOptions } from "apexcharts";
import { getPurchasesChartData } from "../../_actions/getPurchasesChartData";

const chartOptions: ApexOptions = {
  chart: {
    type: "area",
  },
  stroke: { curve: "smooth" },
};

const TotalMetrics = ({
  purchases,
}: {
  purchases: SupplierDetailPurchases[];
}) => {
  const [dateRangeMode, setDateRangeMode] = useState<
    "yearToDate" | "lastYear" | "all"
  >("yearToDate");
  const [filteredPurchases, setFilteredPurchases] =
    useState<SupplierDetailsFilteredPurchases>();
  const [purchasesCount, setPurchasesCount] = useState<number>(0);
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    const filteredData = getFilteredPurchases(purchases, dateRangeMode);

    setFilteredPurchases(filteredData);
    setPurchasesCount(filteredData.filteredPurchases.length);

    const chartData = getPurchasesChartData(filteredData.filteredPurchases);
    setChartData(chartData);
  }, [purchases, dateRangeMode]);

  return (
    <div className="flex flex-col gap-y-4">
      <Layout.Row justify="end">
        <ActionButton
          color={dateRangeMode === "all" ? "secondarySoft" : "neutral"}
          onClick={() => setDateRangeMode("all")}
        >
          All
        </ActionButton>
        <ActionButton
          color={dateRangeMode === "yearToDate" ? "secondarySoft" : "neutral"}
          onClick={() => setDateRangeMode("yearToDate")}
        >
          This Year
        </ActionButton>
        <ActionButton
          color={dateRangeMode === "lastYear" ? "secondarySoft" : "neutral"}
          onClick={() => setDateRangeMode("lastYear")}
        >
          Last Year
        </ActionButton>
      </Layout.Row>

      <div className="grid grid-cols-2 gap-4 min-h-80">
        <Card.Root bg="elevated" shadow='none'>
          <Card.Title>Summary</Card.Title>
          <Text.LabelDataPair label="Purchase Orders" data={purchasesCount} />
          {filteredPurchases && (
            <Text.LabelDataPair
              label="Total ($)"
              data={filteredPurchases.totalSpent.toLocaleString()}
            />
          )}
        </Card.Root>
        <Card.Root bg="elevated" shadow='none'>
          {filteredPurchases && (
            <Chart
              options={chartOptions}
              series={chartData}
              type="area"
              height={"100%"}
            />
          )}
        </Card.Root>
      </div>
    </div>
  );
};

export default TotalMetrics;
