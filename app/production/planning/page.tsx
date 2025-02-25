import React from 'react'
import PageTitle from '@/components/Text/PageTitle';
import AddBprButton from './_components/createNewBpr/AddBprButton';
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs';
import PlanningTabs from './_components/PlanningTabs';
import { productionActions } from '@/actions/production';

const PlanningPage = async () => {
    const bprs = await productionActions.planning.getBprs()
    const statuses = await productionActions.bprs.statuses.getAll()

    return (

        <div className='flex flex-col gap-y-4'>
            <div className='flex justify-between items-center'>

                <div className='flex flex-col gap-y-4'>
                    <PageTitle>Planning</PageTitle>
                    <PageBreadcrumbs />
                </div>
                <div className='flex gap-x-2'>

                <AddBprButton />
                </div>
            </div>
            
            <PlanningTabs bprs={bprs} statuses={statuses} />


        </div>

    )
}

export default PlanningPage
