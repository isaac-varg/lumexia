'use client'
import Card from '@/components/Card'
import React from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { PricingExamination } from '@/actions/accounting/examinations/getAllByItem';
import { DateTime } from 'luxon';


const OverallItemPriceChart = ({ pricingExaminations }: { pricingExaminations: PricingExamination[] }) => {


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
            data: pricingExaminations.map((exam) => ({ x: DateTime.fromJSDate(exam.createdAt), y: exam.itemPricingDataArchive[0]?.overallItemCost || 0 }))
        },
    ]



    return (
        <Card.Root >
            <Card.Title>Overall Item Price</Card.Title>

            <Chart
                options={options}
                series={series}
                type="area" />
        </Card.Root >
    )
}

export default OverallItemPriceChart
