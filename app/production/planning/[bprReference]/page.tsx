import bprActions from '@/actions/production/bprActions';
import React from 'react'
import Test from './_components/Test';
import { getBpr } from './_functions/getBpr';
import bprBomActions from '@/actions/production/bprBom';
import { getBprBom } from './_functions/getBprBom';
import { getInventory } from './_functions/getInventory';

type PlanningBprPage = {
    searchParams: {
        id: string;
    };
}

const PlanningBprPage = async ({ searchParams }: PlanningBprPage) => {

    const { id } = searchParams;
    const bpr = await getBpr(id)

    if (!bpr) { return null }
    const bom = await getBprBom(bpr.id)

    if (!bom) {return null}
    const inventory = await getInventory(bom as any) 


    return (
        <div>
            <Test any={inventory} />

        </div>
    )
}

export default PlanningBprPage 
