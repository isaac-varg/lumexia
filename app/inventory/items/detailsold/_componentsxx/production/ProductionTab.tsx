"use client"
import { Item } from "@/types/item"
import { BomUsage } from "../../_functions/getBomUsage"
import UsageTable from "./UsageTable"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"
import Layout from "@/components/Layout"

type ProductionTabProps = {
  item: Item
  usage: BomUsage
}
const ProductionTab = ({ item, usage }: ProductionTabProps) => {

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

  if (!usage) { return null }

  return (
    <div>

      <Layout.Grid>
        <Panels.Root bg="elevated">
          <Text.SectionTitle>Component Of</Text.SectionTitle>
          <UsageTable usage={usage} />
        </Panels.Root>

        <Panels.Root bg="elevated">

          <Text.SectionTitle>Usage</Text.SectionTitle>

          <Chart
            options={chartOptions}
            type="donut"
            series={usage.charts.series}
            height={500}
          />
        </Panels.Root>
      </Layout.Grid>

    </div>
  )
}

export default ProductionTab
