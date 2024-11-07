import React from 'react'
import Test from './_components/Test';
import { getBpr } from './_functions/getBpr';
import { getBprBom } from './_functions/getBprBom';
import { getInventory } from './_functions/getInventory';
import Title from './_components/Title';
import SchedulingPanel from './_components/SchedulingPanel';

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

        <Title bpr={bpr as any} />
            <Test any={bpr} />

            <SchedulingPanel bprId={bpr.id} start={bpr.scheduledForStart} end={bpr.scheduledForEnd}/>

        </div>
    )
}

export default PlanningBprPage 
