'use client'
import { PricingExamination } from '@/actions/accounting/examinations/getAllByItem'
import Card from '@/components/Card'
import { groupByProperty } from '@/utils/data/groupByProperty'
import { ApexOptions } from 'apexcharts'
import { DateTime } from 'luxon'
import React from 'react'
import Chart from "react-apexcharts";
import { groupByContainerItemId } from '../_functions/groupByContainer'

const ContainerPricingChart = ({ pricingExaminations }: { pricingExaminations: PricingExamination[] }) => {

    const groupedByContainer = groupByContainerItemId(pricingExaminations)



    const options: ApexOptions = {
        chart: {
            type: "area",
        },
        stroke: { curve: "smooth" },
        xaxis: {
            type: 'datetime'
        }
    };

    const series = groupedByContainer.map((container) => {
        return {
            name: container.containerName,
            data: container.entries.map((entries) =>  ({ y: entries.consumerPrice, x: DateTime.fromJSDate(entries.createdAt) }))
        }
    })


    return (
        <Card.Root>

            <Card.Title>Container Pricing</Card.Title>

            <Chart
                series={series}
                options={options}
                type="area" height={'100%'}
            />

        </Card.Root>
    )
}

export default ContainerPricingChart
