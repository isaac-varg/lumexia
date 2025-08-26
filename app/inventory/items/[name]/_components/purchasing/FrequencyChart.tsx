import Card from "@/components/Card";
import { useItemSelection } from "@/store/itemSlice";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const FrequencyChart = () => {
  const { filteredPurchaseOrders } = useItemSelection();
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (filteredPurchaseOrders) {
      const yearlyData: { [year: string]: { [month: string]: number } } = {};
      const flat = filteredPurchaseOrders.flatMap(group => group.purchaseOrders);

      flat.forEach((po) => {
        const date = new Date(po.createdAt);
        const year = date.getFullYear().toString();
        const month = date.toLocaleDateString('en-US', { month: 'short' });

        if (!yearlyData[year]) {
          yearlyData[year] = {};
        }
        if (!yearlyData[year][month]) {
          yearlyData[year][month] = 0;
        }
        yearlyData[year][month] += po.quantity;
      });

      const allMonths = [...new Set(Object.values(yearlyData).flatMap(months => Object.keys(months)))].sort((a, b) => {
        return new Date(`1 ${a} 2000`).getMonth() - new Date(`1 ${b} 2000`).getMonth();
      });

      const chartSeries = Object.keys(yearlyData).map(year => {
        return {
          name: year,
          data: allMonths.map(month => yearlyData[year][month] || 0)
        };
      });

      setSeries(chartSeries);
      setOptions({
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: allMonths,
        },
        yaxis: {
          title: {
            text: 'Quantity'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " units"
            }
          }
        },
        title: {
          text: 'Total Quantity Ordered Per Month',
          align: 'left'
        },
      });
    }
  }, [filteredPurchaseOrders]);

  return (
    <Card.Root span={3}>
      <Card.Title>Frequency Trend</Card.Title>
      {typeof window !== 'undefined' && (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      )}
    </Card.Root>
  );
};

export default FrequencyChart;
