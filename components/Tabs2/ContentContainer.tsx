'use client'

import { Children, isValidElement } from "react"
import { AnimatePresence } from "framer-motion"
import { useTabs } from "./Context"

export const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  const { activeTab } = useTabs()
  const activeContent = Children.toArray(children).find(
    (child) => isValidElement(child) && child.props.value === activeTab
  )

  return <AnimatePresence mode="wait">{activeContent}</AnimatePresence>
}
ContentContainer.displayName = "Tabs.ContentContainer";
