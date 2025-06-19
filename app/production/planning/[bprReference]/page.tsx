import React from 'react'
import Title from './_components/Title';
import StateSetter from './_components/StateSetter';
import Layout from '@/components/Layout';
import BatchSize from './_components/panels/BatchSize';
import SchedulingPanel from './_components/panels/scheduling/SchedulingPanel';
import Statuses from './_components/panels/status/Statuses';
import BomMain from './_components/panels/BomMain';
import QcRecordsPanel from './_components/panels/qcRecords/QcRecordsPanel';
import RequirementsPanel from './_components/panels/requirements/RequirementsPanel';
import NotesPanel from './_components/panels/notes/NotesPanel';

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

                <QcRecordsPanel />
                <RequirementsPanel />

                <NotesPanel />

            </Layout.Grid>

            {/*
            <ActionsPanel bpr={bpr as any} />

*/}

        </div>
    )
}

export default PlanningBprPage 
