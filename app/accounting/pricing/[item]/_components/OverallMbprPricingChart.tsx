'use client'
import Card from '@/components/Card'
import React from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { PricingExamination } from '@/actions/accounting/examinations/getAllByItem';
import { DateTime } from 'luxon';
import { ProducedExaminations } from '../_functions/getProducedPricingExamination';
import { dateFormatString } from '@/configs/data/dateFormatString';


const OverallMbprPricingChart = ({ pricingExaminations }: { pricingExaminations: ProducedExaminations[] }) => {


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
            data: pricingExaminations.map((exam) => ({ x: DateTime.fromJSDate(exam.createdAt), y: exam.bomCostPerLb || 0 }))
        },
    ]



    return (
        <Card.Root >
            <Card.Title>Overall BOM $/lb</Card.Title>

            <Chart
                options={options}
                series={series}
                type="area" />
        </Card.Root >
    )
}

export default OverallMbprPricingChart
