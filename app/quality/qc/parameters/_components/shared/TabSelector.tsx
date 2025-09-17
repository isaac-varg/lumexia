'use client'
import TabButton from "./TabButton";

// define the tabs
export type QcParameterTab = 'parameters' | 'groups' | 'templates'

const TabSelector = () => {

  const tabs: QcParameterTab[] = ['parameters', 'groups', 'templates'];

  return (
    <div className="flex items-center justify-start gap-x-6">
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
