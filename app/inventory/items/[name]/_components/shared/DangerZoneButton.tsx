'use client'
import { useTabActions, useTabSelection } from "@/store/tabSlice"

const DangerZoneButton = () => {

  const { setActiveTab } = useTabActions()
  const { activeTab } = useTabSelection()

  if (activeTab.itemDetails === 'danger') {
    return null
  }
  return (
    <div className="flex justify-end">
      <button className="btn btn-outline btn-error"
        onClick={() => setActiveTab('itemDetails', 'danger')}
      >
        Danger Zone
      </button>
    </div>
  )
}

export default DangerZoneButton
