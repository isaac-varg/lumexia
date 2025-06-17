import React from 'react'
import Title from './_components/Title';
import SchedulingPanel from './_components/SchedulingPanel';
import Layout from '@/components/Layout';
import BasicsPanel from './_components/BasicsPanel';
import MaterialSufficiency from './_components/MaterialSufficiency';
import ActionsPanel from './_components/ActionsPanel';
import ChangeStatusDialog from './_components/ChangeStatusDialog';
import { staticRecords } from '@/configs/staticRecords';
import StateSetter from './_components/StateSetter';

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
            {/*
            <ActionsPanel bpr={bpr as any} />

            <Layout.Grid cols={2} >

                <BasicsPanel bpr={bpr as any} />
                <SchedulingPanel bprId={bpr.id} start={bpr.scheduledForStart} end={bpr.scheduledForEnd} />

            </Layout.Grid>

            {bpr.status.id === staticRecords.production.bprStatuses.draft && (
                <MaterialSufficiency materials={sortedMaterialInventory as any} />
            )}

*/}

        </div>
    )
}

export default PlanningBprPage 
