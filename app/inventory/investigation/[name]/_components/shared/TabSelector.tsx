'use client'

import { InvestigationTab } from "@/store/investigationSlice"
import { useTabActions, useTabSelection } from "@/store/tabSlice"

const tabs: InvestigationTab[] = ['lots', 'purchaseOrders', 'audits', 'notes']

const tabLabels: Record<InvestigationTab, string> = {
  lots: 'Lots',
  purchaseOrders: 'Purchase Orders',
  audits: 'Audits',
  notes: 'Notes',
}

const TabSelector = () => {

  const { setActiveTab } = useTabActions()
  const { activeTab } = useTabSelection()

  const currentTab = activeTab['investigation']

  return (
    <div className="flex items-center justify-start gap-x-6">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`min-w-40 btn btn-secondary ${currentTab === tab ? '' : 'btn-dash'}`}
          onClick={() => setActiveTab('investigation', tab)}
        >
          {tabLabels[tab]}
        </button>
      ))}
    </div>
  )
}

export default TabSelector
