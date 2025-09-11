'use client'
import TabButton from "./TabButton";

export type PlanningTab = 'status' | 'table' | 'recent'

const TabSelector = () => {

  const tabs: PlanningTab[] = ['status', 'table'];


  return (
    <div className="flex items-center justify-start gap-6">

      {tabs.map(tab => <TabButton key={tab} tab={tab} />)}
    </div>
  )
}

const Skeleton = () => {
  return (
    <div className="flex items-center justify-start gap-x-6">
      <button className="skeleton btn w-40"></button>
      <button className="skeleton btn w-40"></button>
      <button className="skeleton btn w-40"></button>
      <button className="skeleton btn w-40"></button>
    </div>
  )
}

export default TabSelector
