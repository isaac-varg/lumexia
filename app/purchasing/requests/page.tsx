import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import { getRequests } from './_functions/getRequests'
import MainPanel from './_components/MainPanel'
import RequestTabs from './_components/RequestTabs'
import { getRequestStatuses } from './[referenceCode]/_functions/getRequestStatuses'

const RequestsPage = async () => {

    const requests = await getRequests()
    const statuses = await getRequestStatuses();


    return (
        <div className='flex flex-col gap-y-4'>
            <PageTitle>Request Dashboard</PageTitle>
            <PageBreadcrumbs />

            <RequestTabs requests={requests} statuses={statuses}/>

            <MainPanel requests={requests} />

        </div>
    )
}

export default RequestsPage
