'use client'
import { BprStatus } from '@/actions/production/getBprStatuses'
import { PlanningBpr } from '@/actions/production/getPlanningBprs'
import TabsPanel from '@/components/Tabs'
import React from 'react'
import ByStatusPanel from './ByStatusPanel'
import ByTablePanel from './ByTablePanel'

type PlanningTabsProps = {
    bprs: PlanningBpr[],
    statuses: BprStatus[],
}



const PlanningTabs = ({ bprs, statuses }: PlanningTabsProps) => {
    const tabs = [
        {
            identifier: 'byStatus',
            label: 'Grouped by Status'
        },
        {
            identifier: 'byTable',
            label: 'Table'
        }
    ]

    return (
        <TabsPanel.Root panelStateName='planningDashboard'>
            <TabsPanel.List panelStateName='planningDashboard' tabTriggers={tabs} />


            <TabsPanel.Content identifier='byStatus'>
                <ByStatusPanel bprs={bprs} statuses={statuses} />
            </TabsPanel.Content>

            <TabsPanel.Content identifier='byTable'>
                <ByTablePanel bprs={bprs} />
            </TabsPanel.Content>

        </TabsPanel.Root>
    )
}

export default PlanningTabs
