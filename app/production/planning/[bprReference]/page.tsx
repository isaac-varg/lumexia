import React from 'react'
import Title from './_components/Title';
import StateSetter from './_components/StateSetter';
import Layout from '@/components/Layout';
import BatchSize from './_components/panels/BatchSize';
import SchedulingPanel from './_components/panels/scheduling/SchedulingPanel';
import Statuses from './_components/panels/status/Statuses';
import BomMain from './_components/panels/bom/BomMain';

type PlanningBprPage = {
    searchParams: {
        id: string;
    };
}

const PlanningBprPage = async ({ searchParams }: PlanningBprPage) => {

    const { id } = searchParams;

    return (
        <div className='flex flex-col gap-y-6'>

            <StateSetter bprId={id} />

            <Title />


            <Layout.Grid cols={3} >

                <BatchSize />

                <Statuses />

                <SchedulingPanel />

                <BomMain />

            </Layout.Grid>

            {/*
            <ActionsPanel bpr={bpr as any} />

                <SchedulingPanel bprId={bpr.id} start={bpr.scheduledForStart} end={bpr.scheduledForEnd} />


            {bpr.status.id === staticRecords.production.bprStatuses.draft && (
                <MaterialSufficiency materials={sortedMaterialInventory as any} />
            )}

*/}

        </div>
    )
}

export default PlanningBprPage 
