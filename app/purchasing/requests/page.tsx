import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import { getRequests } from './_functions/getRequests'
import NewRequestsPanel from './_components/NewRequestsPanel'
import InfographicPanel from './_components/InfographicPanel'
import MainPanel from './_components/MainPanel'

const RequestsPage = async () => {

    const requests = await getRequests()


    return (
        <div className='flex flex-col gap-y-4'>
            <PageTitle>Request Dashboard</PageTitle>
            <PageBreadcrumbs />


            <div className='grid grid-cols-2 gap-x-4'>
                <NewRequestsPanel requests={requests} />

                <InfographicPanel />
            </div>


            <MainPanel requests={requests} />

        </div>
    )
}

export default RequestsPage
