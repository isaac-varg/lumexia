'use client'
import Card from '@/components/Card'
import { ApexOptions } from 'apexcharts'
import { DateTime } from 'luxon'
import React from 'react'
import Chart from "react-apexcharts";
import { ProducedPricingExaminationForDashboard } from '../_functions/getProducedPricingExamination'
import { PricingExamination } from '@/actions/accounting/examinations/getAllByItem'
import { toMathFractionalDigits } from '@/utils/data/toMathFractionalDigits'


const FinishedProductsChart = ({ examinations }: { examinations: PricingExamination[] }) => {


    const fps = examinations.flatMap(fp => fp.FinishedProductArchive);

    type fpType = typeof fps[number]

    const grouped = fps.reduce<Record<string, fpType[]>>((acc, item) => {
        const key = item.currentFinishedProductId;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);
        return acc;
    }, {});



    const options: ApexOptions = {
        chart: {
            type: "area",
        },
        stroke: { curve: "smooth" },
        xaxis: {
            type: 'datetime'
        }
    };

    const series = Object.entries(grouped).map(([finishedProductId, finishedProducts]) => ({
        name: finishedProducts[0].name || finishedProductId,
        data: finishedProducts
            .map(entry => ({
                x: DateTime.fromJSDate(entry.createdAt),
                y: toMathFractionalDigits( entry.finishedProductTotalCost || 0, 3)
            }))
    }));

    

    return (
        <Card.Root>

            <Card.Title>Finished Product Pricing</Card.Title>

            <Chart
                series={series}
                options={options}
                type="area" height={'100%'}
            />

        </Card.Root>
    )
}

export default FinishedProductsChart 
