import React from 'react'
import bprStatusActions from '@/actions/production/bprStatuses';
import PageTitle from '@/components/Text/PageTitle';
import AddBprButton from './_components/createNewBpr/AddBprButton';
import ViewMode from './_components/ViewMode';
import { getBprs } from './_functions/getBprs';

const PlanningPage = async () => {
        const bprs = await getBprs();
        const statuses = await bprStatusActions.getAll()

    return (
        <div className='flex flex-col gap-y-4 w-full h-full max-w-screen overflow-x-hidden'>
            <div className='flex justify-between items-center '>
                <PageTitle>Planning</PageTitle>
                <AddBprButton />
            </div>

            <ViewMode bprs={bprs} statuses={statuses} />


        </div>
    )
}

export default PlanningPage
