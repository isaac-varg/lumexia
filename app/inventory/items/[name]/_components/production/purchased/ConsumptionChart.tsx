import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { toMathFractionalDigits } from "@/utils/data/toMathFractionalDigits";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ConsumptionChart = () => {

  const { usage } = useItemSelection()
  const consumption = usage?.consumption;
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    if (consumption) {
      const yearlyData: { [year: string]: { [month: string]: number } } = {};

      consumption.forEach((transaction) => {
        const date = new Date(transaction.createdAt);
        const year = date.getFullYear().toString();
        const month = date.toLocaleDateString('en-US', { month: 'short' });

        if (!yearlyData[year]) {
          yearlyData[year] = {};
        }
        if (!yearlyData[year][month]) {
          yearlyData[year][month] = 0;
        }
        yearlyData[year][month] += transaction.amount;
      });

      const allMonths = Array.from(new Set(Object.values(yearlyData).flatMap(months => Object.keys(months)))).sort((a, b) => {
        return new Date(`1 ${a} 2000`).getMonth() - new Date(`1 ${b} 2000`).getMonth();
      });

      const chartSeries = Object.keys(yearlyData).map(year => {
        return {
          name: year,
          data: allMonths.map(month => toMathFractionalDigits(yearlyData[year][month] || 0, 3))
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
            text: 'Amount'
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
      });
    }
  }, [consumption]);

  return (
    <Card.Root>
      <Card.Title>Consumption Frequency</Card.Title>
      {typeof window !== 'undefined' && (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={500}
        />
      )}
    </Card.Root>
  )
}

export default ConsumptionChart
