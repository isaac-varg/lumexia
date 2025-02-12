import Card from '@/components/Card'
import React from 'react'
import RequestCard from './RequestCard';
import { AuditRequest } from '@/actions/inventory/getAuditRequests';

const RequestsPanel =  ({requests}: {requests: AuditRequest[]}) => {


    return (
        <Card.Root>
            <Card.Title>Open Requests</Card.Title>

            <div className='grid grid-cols-3 gap-4'>
                {requests.map((r) => <RequestCard key={r.id} request={r} />)}

            </div>
        </Card.Root>
    )
}

export default RequestsPanel
