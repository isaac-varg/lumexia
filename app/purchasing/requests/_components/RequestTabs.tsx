"use client"

import TabsPanel from "@/components/Tabs"
import { RequestForDashboard } from "../_functions/getRequests"
import { staticRecords } from "@/configs/staticRecords"
import NewRequestsPanel from "./NewRequestsPanel"
import InfographicPanel from "./InfographicPanel"
import ByStatusPanel from "./ByStatusPanel"
import { RequestStatus } from "../[referenceCode]/_functions/getRequestStatuses"

type RequestTabsProps = {
    requests: RequestForDashboard[]
    statuses: RequestStatus[]
}


const RequestTabs = ({ requests , statuses}: RequestTabsProps) => {

    const newRequests = requests.filter((request) => request.statusId === staticRecords.purchasing.requestStatuses.requested)

    const tabs = [
        {
            identifier: 'new',
            label: 'New',
            badge: newRequests.length
        },
        {
            identifier: 'byStatus',
            label: 'Grouped by Status'
        }
    ]

    return (
        <TabsPanel.Root panelStateName="requestDashboard">

            <TabsPanel.List tabTriggers={tabs} panelStateName="requestDashboard" />

            <TabsPanel.Content identifier="new">
                <div className='grid grid-cols-2 gap-x-4'>
                    <NewRequestsPanel requests={requests.filter((request) => request.statusId === staticRecords.purchasing.requestStatuses.requested)} />

                    <InfographicPanel requests={requests} />
                </div>
            </TabsPanel.Content>


            <TabsPanel.Content identifier="byStatus">
                <ByStatusPanel statuses={statuses} requests={requests} />
            </TabsPanel.Content>


        </TabsPanel.Root>
    )
}

export default RequestTabs
