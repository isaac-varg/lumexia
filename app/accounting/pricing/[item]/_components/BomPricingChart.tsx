'use client'

import Card from '@/components/Card'
import React from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ProducedPricingExaminationForDashboard } from '../_functions/getProducedPricingExamination';
import { DateTime } from 'luxon';
import { groupByProperty } from '@/utils/data/groupByProperty';

type Archive = {
    bomId: string;
    createdAt: Date;
    overallItemCostPerLb: number;
    item: {
        name: string;
    };
};

const BomPricingChart = ({ examinations }: { examinations: ProducedPricingExaminationForDashboard[] }) => {

    const flattenedArchives = examinations.flatMap((e) => e.BomPricingDataArchive)


    const groupedByBomId = flattenedArchives.reduce((acc: Record<string, Archive[]>, archive: Archive) => {
        const { bomId } = archive;
        if (!acc[bomId]) {
            acc[bomId] = [];
        }
        acc[bomId].push(archive);
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


    const series = Object.entries(groupedByBomId).map(([bomId, entries]) => ({
        name: entries[0].item.name || bomId,
        data: entries
            .map(entry => ({
                x: DateTime.fromJSDate(entry.createdAt),
                y: entry.overallItemCostPerLb || 0
            }))
    }));

    return (
        <Card.Root>
            <Card.Title>Overall Material Cost $/lb</Card.Title>
            <Chart
                options={options}
                series={series}
                type="area"
                height={350}
            />
        </Card.Root>
    )
}

export default BomPricingChart;

