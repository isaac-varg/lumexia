import React from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import RequestCard from './RequestCard'
import { RequestStatus } from '../[referenceCode]/_functions/getRequestStatuses'
import { RequestPriority } from '../_functions/getPriorities'
import { GeneralRequestMinimal } from '../general/_actions/getAllGeneralRequests'
import GeneralRequestCard from './GeneralRequestCard'
import Card from '@/components/Card'

type PanelProps = {
  requests: IPurchasingRequest[]
  statuses: RequestStatus[]
  priorities: RequestPriority[]
  generalRequests: GeneralRequestMinimal[]
}

const NewRequestsPanel = ({ requests, statuses, priorities, generalRequests }: PanelProps) => {
  return (
    <Card.Root bg='elevated' shadow='none'>
      <div className='card-body flex flex-col gap-y-12'>

        <div>
          <h2 className='card-title'>New Requests</h2>


          <div className='grid grid-cols-3 gap-4'>
            {requests.map((request) => <RequestCard priorities={priorities} statuses={statuses} key={request.id} request={request} />)}
          </div>
        </div>

        <div>
          <h2 className='card-title'>New General Requests</h2>


          <div className='grid grid-cols-3 gap-4'>
            {generalRequests.map((request) => <GeneralRequestCard key={request.id} request={request} />)}
          </div>
        </div>




      </div>
    </Card.Root>

  )
}

export default NewRequestsPanel
