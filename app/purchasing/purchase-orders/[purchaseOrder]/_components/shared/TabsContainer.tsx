"use client"
import { AnimatePresence, motion } from "framer-motion";
import AccountingPanel from "../accounting/AccountingPanel";
import Notes from "../notes/Notes";
import ActivityPanel from "../activity/ActivityPanel";
import { useTabSelection } from "@/store/tabSlice";
import LineItems from "../lineItems/LineItems";
import Options from "../options/Options";


const TabsContainer = () => {

  const { activeTab } = useTabSelection()
  const currentTab = activeTab['purchasing'];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {currentTab === 'items' && <LineItems />}
        {currentTab === 'accounting' && <AccountingPanel />}
        {currentTab === 'notes' && <Notes />}
        {currentTab === 'activity' && <ActivityPanel />}
        {currentTab === 'options' && <Options />}
      </motion.div>
    </AnimatePresence>
  )
}

export default TabsContainer
