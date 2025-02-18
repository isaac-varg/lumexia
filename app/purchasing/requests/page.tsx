import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import { getRequests } from './_functions/getRequests'
import MainPanel from './_components/MainPanel'
import RequestTabs from './_components/RequestTabs'
import { getRequestStatuses } from './[referenceCode]/_functions/getRequestStatuses'
import { getPriorities } from './_functions/getPriorities'
import CreateRequestButton from './_components/CreateRequestButton'
import ArchiveButton from './_components/ArchiveButton'

const RequestsPage = async () => {

    const requests = await getRequests()
    const statuses = await getRequestStatuses();
    const priorities = await getPriorities();


    return (
        <div className='flex flex-col gap-y-4'>
            <div className='flex justify-between items-center'>

                <div className='flex flex-col gap-y-4'>
                    <PageTitle>Request Dashboard</PageTitle>
                    <PageBreadcrumbs />
                </div>
                <div className='flex gap-x-2'>
                   <CreateRequestButton />  
                   <ArchiveButton />
                </div>
            </div>

            <RequestTabs requests={requests} statuses={statuses} priorities={priorities} />

            <MainPanel requests={requests} />

        </div>
    )
}

export default RequestsPage
