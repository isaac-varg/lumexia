'use client'
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { RequestForDashboard } from "../_functions/getRequests";
import { groupByProperty } from "@/utils/data/groupByProperty";
import Card from "@/components/Card";

const InfographicPanel = ({
  requests,
}: {
  requests: RequestForDashboard[]
}) => {

  const grouped = groupByProperty(requests, 'status.name');
  const series = Object.values(grouped).map((group: any) => group.length);
  const labels = Object.keys(grouped);

  // Extract colors from requests based on status
  const colors = labels.map(label => {
    const request = requests.find(req => req.status.name === label);
    return request?.status.bgColor || "#cccccc";
  });

  // Extract text colors from requests based on status
  const textColors = labels.map(label => {
    const request = requests.find(req => req.status.name === label);
    return request?.status.textColor || "#000000";
  });

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels,
    colors,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              color: "#333333",
            },
            total: {
              show: true,
            }
          },
        }
      }
    },
    dataLabels: {
      style: {
        colors: ["#333333"]
      }
    }
  }

  const chartOptionsss: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels,
    colors, // Set slice colors dynamically
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: { show: true },
            value: { show: true },
            total: {
              show: true,
              label: "Total",
              color: "#000000",
            }
          }
        }
      }
    },
    dataLabels: {
      style: {
        colors: textColors
      }
    }
  };

  return (
    <Card.Root bg="elevated" shadow="none">
      <div className='card-body'>
        <Chart
          series={series}
          options={chartOptions}
          type="donut"
          height={500}
        />
      </div>
    </Card.Root>

  );
}

export default InfographicPanel;

