'use client'
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { RequestForDashboard } from "../_functions/getRequests";
import { groupByProperty } from "@/utils/data/groupByProperty";

const InfographicPanel = ({
    requests,
}: {
    requests: RequestForDashboard[]
}) => {
    
    const grouped = groupByProperty(requests, 'status.name')
    const series =  Object.values(grouped).map((group:any) => group.length);
    const labels = Object.keys(grouped);

    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut',
        },
        labels,
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
        <div className='card bg-base-200'>
            <div className='card-body'>
            <Chart
                series={series}
                options={chartOptions}
                type="donut"
                height={500}
            />
            </div>
        </div>
    )
}

export default InfographicPanel
