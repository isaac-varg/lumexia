import Card from "@/components/Card"
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"
import { useItemSelection } from "@/store/itemSlice";

const UsageChart = () => {

  const { usage } = useItemSelection()

  if (!usage) return false;

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: usage.charts.seriesLabel,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: { show: true },
            value: { show: true },
            total: { show: true }
          },

        }
      }
    }
  }

  return (
    <Card.Root>

      <Card.Title>Usage Percentage</Card.Title>


      <Chart
        options={chartOptions}
        type="donut"
        series={usage.charts.series}
        height={500}
      />
    </Card.Root>
  )
}

export default UsageChart
