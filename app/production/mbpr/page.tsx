import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import CreateEditMBPR from './_components/CreateEditMBPR'
import { productionActions } from '@/actions/production'
import MbprTable from './_components/MbprTable'
import EditConfigurations from './_components/EditConfigurations'

const MbprMainPage = async () => {

    const mbprs = await productionActions.mbprs.getAll()

    return (
        <div>
            <PageTitle>Master Batch Production Record Dashboard</PageTitle>
            <PageBreadcrumbs />

            <div className='flex justify-between'>
                <CreateEditMBPR />
                <EditConfigurations />
            </div>

            <MbprTable mbprs={mbprs} />



        </div>
    )
}

export default MbprMainPage
