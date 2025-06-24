'use client'
import Card from '@/components/Card'
import React from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { DateTime } from 'luxon';
import { ProducedPricingExaminationForDashboard } from '../_functions/getProducedPricingExamination';
import { toMathFractionalDigits } from '@/utils/data/toMathFractionalDigits';


const OverallMbprPricingChart = ({ examinations }: { examinations: ProducedPricingExaminationForDashboard[] }) => {

    const dataArchives = examinations.flatMap((e) => e.producedPricingDataArchives);

    const options: ApexOptions = {
        chart: {
            type: "area",
        },
        stroke: { curve: "smooth" },
        xaxis: {
            type: 'datetime'
        }
    };

    const series = [
        {
            name: 'Prices',
            data: dataArchives.map((exam) => ({ x: DateTime.fromJSDate(exam.createdAt), y: toMathFractionalDigits( exam.totalCostPerLb || 0, 3) }))
        },
    ]



    return (
        <Card.Root >
            <Card.Title>Overall $/lb</Card.Title>

            <Chart
                options={options}
                series={series}
                type="area" />
        </Card.Root >
    )
}

export default OverallMbprPricingChart
