'use client'
import { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts";

const ItemTypeChart = ({ itemTypes }: {
    itemTypes: {
        itemTypeId: string,
        count: number,
        itemTypeName: string | undefined,
    }[]
}) => {

    const labels = itemTypes.map((it) => it.itemTypeName);
    const series = itemTypes.map((it) => it.count);


    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut',
        },
        labels:  labels as string[],
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
        <div>
            <Chart
                options={chartOptions}
                type="donut"
                series={series}
                height={250}
            />
        </div>
    )
}

export default ItemTypeChart
