"use client"

import TabsPanel from "@/components/Tabs"
import { RequestForDashboard } from "../_functions/getRequests"
import { staticRecords } from "@/configs/staticRecords"
import NewRequestsPanel from "./NewRequestsPanel"
import InfographicPanel from "./InfographicPanel"
import ByStatusPanel from "./ByStatusPanel"
import { RequestStatus } from "../[referenceCode]/_functions/getRequestStatuses"
import { RequestPriority } from "../_functions/getPriorities"
import BySupplierPanel from "./BySupplierPanel"

type RequestTabsProps = {
    requests: RequestForDashboard[]
    statuses: RequestStatus[]
    priorities: RequestPriority[]
}


const RequestTabs = ({ requests, statuses, priorities }: RequestTabsProps) => {

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
        },
        {
            identifier: 'bySupplier',
            label: 'Grouped by Supplier'
        }

    ]

    return (
        <TabsPanel.Root panelStateName="requestDashboard">

            <TabsPanel.List tabTriggers={tabs} panelStateName="requestDashboard" />

            <TabsPanel.Content identifier="new">
                <div className='grid grid-cols-2 gap-x-4'>
                    <NewRequestsPanel statuses={statuses} priorities={priorities} requests={requests.filter((request) => request.statusId === staticRecords.purchasing.requestStatuses.requested)} />

                    <InfographicPanel requests={requests} />
                </div>
            </TabsPanel.Content>


            <TabsPanel.Content identifier="byStatus">
                <ByStatusPanel statuses={statuses} priorities={priorities} requests={requests} />
            </TabsPanel.Content>

            <TabsPanel.Content identifier="bySupplier">
                <BySupplierPanel statuses={statuses} priorities={priorities} requests={requests} />
            </TabsPanel.Content>



        </TabsPanel.Root>
    )
}

export default RequestTabs
