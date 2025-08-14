"use server"

import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"
import { toMathFractionalDigits } from "@/utils/data/toMathFractionalDigits";


interface Usage {
    producedItem: string
    concentration: number
    quantity: number
    mbprLabel: string | null
}

export interface BomUsage {
    usage: Usage[]
    totalUsage: number
    charts: {
        series: number[],
        seriesLabel: string[]
    }
}


export const getBomUsage = async (itemId: string) => {

    // first get the bom, the active mbpr, 
    const usage = await prisma.billOfMaterial.findMany({
        where: {
            itemId,
            mbpr: {
                recordStatusId: staticRecords.app.recordStatuses.active,
            }
        },
        include: {
            mbpr: {
                include: {
                    producesItem: true,
                    BatchSize: {
                        where: {
                            recordStatusId: staticRecords.app.recordStatuses.active,
                        }
                    }
                }
            }
        }
    });


    // then calulate how much that would be for every bom entry

    const data = await Promise.all(usage.map((bom) => {

        if (bom.mbpr.BatchSize.length !== 1) {

            console.error(`${bom.mbpr.versionLabel} MBPR either has 0 or too many active batch sizes.`)
            return {
                producedItem: `ERROR: ${bom.mbpr.producesItem.name}`,
                concentration: '',
                quantity: 0,
                mbprLabel: 'MBPR either has 0 or too many active batch sizes',
            }

        }

        const concentration = bom.concentration;
        const batchSize = bom.mbpr.BatchSize[0].quantity;

        const quantity = (concentration * 0.01) * batchSize;


        return {
            producedItem: bom.mbpr.producesItem.name,
            concentration: bom.concentration,
            quantity,
            mbprLabel: bom.mbpr.versionLabel,

        }
    }));

    const totalUsage = data.reduce((previous, current) => previous + current.quantity, 0);

    // now for series data for charts

    const series: number[] = []
    const seriesLabel: string[] = []
    data.forEach((usage) => {
        series.push(usage.quantity)
        //series.push(toMathFractionalDigits( usage.quantity / totalUsage, 4) * 100);
        seriesLabel.push(usage.producedItem);
    });

    const payload: BomUsage = {
        usage: [...data as any],
        totalUsage,
        charts: {
            series,
            seriesLabel
        }
    }


    return payload

}
