import React from "react";
import { SupplierTotals } from "../../_functions/getPurchasesTotals";
import { getPricingChartData } from "../../_functions/getPricingChartData";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PricingChart = ({ data }: { data: SupplierTotals[] }) => {
  const seriesData = getPricingChartData(data);

  const options: ApexOptions = {
    chart: {
      type: "area",
    },
    stroke: { curve: "smooth" },
  };
  return <Chart options={options} series={seriesData} type="area" height={'100%'}/>;
};

export default PricingChart;
