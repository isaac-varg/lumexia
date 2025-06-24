import Card from '@/components/Card'
import React from 'react'
import RequestCard from './RequestCard';
import { AuditRequest } from '@/actions/inventory/getAuditRequests';
import { Panels } from '@/components/Panels';
import Text from '@/components/Text';

const RequestsPanel = ({ requests }: { requests: AuditRequest[] }) => {


    return (
        <Panels.Root>
            <Text.SectionTitle size='normal'>Open Requests</Text.SectionTitle>

            {requests.length === 0 && <p className='font-poppins text-xl'>No hay nada que ver aquí</p>}

            <div className='grid grid-cols-3 gap-4'>
                {requests.map((r) => <RequestCard key={r.id} request={r} />)}

            </div>
        </Panels.Root>
    )
}

export default RequestsPanel
