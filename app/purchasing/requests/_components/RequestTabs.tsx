"use client"

import TabsPanel from "@/components/Tabs"
import { RequestForDashboard } from "../_functions/getRequests"
import { staticRecords } from "@/configs/staticRecords"
import NewRequestsPanel from "./NewRequestsPanel"
import InfographicPanel from "./InfographicPanel"



type RequestTabsProps = {
    requests: RequestForDashboard[]
}

const RequestTabs = ({ requests }: RequestTabsProps) => {

    const newRequests = requests.filter((request) => request.statusId === staticRecords.purchasing.requestStatuses.requested)

    const tabs = [
        {
            identifier: 'new',
            label: 'New',
            badge: newRequests.length 
        },
        {
            identifier: 'all',
            label: 'All'
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


            <TabsPanel.Content identifier="all">
                cxc
            </TabsPanel.Content>


        </TabsPanel.Root>
    )
}

export default RequestTabs
