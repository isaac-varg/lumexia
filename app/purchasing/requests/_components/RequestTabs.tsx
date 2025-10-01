"use client"

import TabsPanel from "@/components/Tabs"
import { RequestForDashboard } from "../_functions/getRequests"
import NewRequestsPanel from "./NewRequestsPanel"
import InfographicPanel from "./InfographicPanel"
import ByStatusPanel from "./ByStatusPanel"
import { RequestStatus } from "../[referenceCode]/_functions/getRequestStatuses"
import { RequestPriority } from "../_functions/getPriorities"
import BySupplierPanel from "./BySupplierPanel"
import RequestsCalendar from "./RequestsCalendar"
import { GeneralRequestMinimal } from "../general/_actions/getAllGeneralRequests"
import { requestStatuses } from "@/configs/staticRecords/requestStatuses"

type RequestTabsProps = {
  requests: RequestForDashboard[]
  statuses: RequestStatus[]
  priorities: RequestPriority[]
  generalRequests: GeneralRequestMinimal[]
}


const RequestTabs = ({ requests, statuses, priorities, generalRequests }: RequestTabsProps) => {

  const newRequests = requests.filter((request) => request.statusId === requestStatuses.requested)
  const allNewRequestsLength = newRequests.length + generalRequests.length;


  const tabs = [
    {
      identifier: 'new',
      label: 'New',
      badge: allNewRequestsLength
    },
    {
      identifier: 'byStatus',
      label: 'Grouped by Status'
    },
    {
      identifier: 'bySupplier',
      label: 'Grouped by Supplier'
    },
    {
      identifier: 'calendar',
      label: 'Calendar'
    },

  ]

  return (
    <TabsPanel.Root panelStateName="requestDashboard">

      <TabsPanel.List tabTriggers={tabs} panelStateName="requestDashboard" />

      <TabsPanel.Content identifier="new">
        <div className='grid grid-cols-2 gap-x-4'>
          <NewRequestsPanel statuses={statuses} priorities={priorities} generalRequests={generalRequests} requests={requests.filter((request) => request.statusId === requestStatuses.requested)} />

          <InfographicPanel requests={requests} />
        </div>
      </TabsPanel.Content>


      <TabsPanel.Content identifier="byStatus">
        <ByStatusPanel statuses={statuses} priorities={priorities} requests={requests} />
      </TabsPanel.Content>

      <TabsPanel.Content identifier="bySupplier">
        <BySupplierPanel statuses={statuses} priorities={priorities} requests={requests} />
      </TabsPanel.Content>

      <TabsPanel.Content identifier="calendar">
        <RequestsCalendar requests={requests} />
      </TabsPanel.Content>



    </TabsPanel.Root>
  )
}

export default RequestTabs
