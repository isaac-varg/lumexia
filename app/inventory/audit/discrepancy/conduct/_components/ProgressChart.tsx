import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { staticRecords } from "@/configs/staticRecords";
import { useDiscrepancySelection } from "@/store/discrepancySlice";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ProgressChart = () => {

    const { auditItems } = useDiscrepancySelection()
    const [series, setSeries] = useState([0])
    const chartOptions: ApexOptions = {
        labels: ['Completion'],
    }


    useEffect(() => {
        if (auditItems.length === 0 || !auditItems) return;

        const completed = auditItems.filter(i => i.statusId === staticRecords.inventory.discrepancyAudits.items.statuses.audited);
        const ratio = Math.round((completed.length / auditItems.length) * 100)

        setSeries([ratio])
    }, [auditItems])

    return (
        <Panels.Root>
            <SectionTitle size="small">Progress</SectionTitle>


            <Chart
                series={series}
                type="radialBar"
                options={chartOptions}
                height={'400px'}
            />

        </Panels.Root>
    )
}

export default ProgressChart
