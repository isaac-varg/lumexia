'use client'
import { BprStatus } from '@/actions/production/getBprStatuses'
import { PlanningBpr } from '@/actions/production/getPlanningBprs'
import TabsPanel from '@/components/Tabs'
import React from 'react'
import ByStatusPanel from './ByStatusPanel'
import ByTablePanel from './ByTablePanel'
import { useBprPlanningSelection } from '@/store/bprPlanningSlice'


const PlanningTabs = () => {
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

  const { bprs, statuses } = useBprPlanningSelection()

  const bprsArray = Object.values(bprs).flat()

  return (
    <TabsPanel.Root panelStateName='planningDashboard'>

      <TabsPanel.List panelStateName='planningDashboard' tabTriggers={tabs} />


      <TabsPanel.Content identifier='byStatus'>
        <ByStatusPanel bprs={bprsArray} statuses={statuses} />
      </TabsPanel.Content>

      <TabsPanel.Content identifier='byTable'>
        <ByTablePanel bprs={bprsArray} />
      </TabsPanel.Content>

    </TabsPanel.Root>
  )
}

export default PlanningTabs
