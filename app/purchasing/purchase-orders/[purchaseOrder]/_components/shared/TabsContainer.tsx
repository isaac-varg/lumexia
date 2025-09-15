"use client"
import { useItemSelection } from "@/store/itemSlice"
import { usePurchasingSelection } from "@/store/purchasingSlice";
import { AnimatePresence, motion } from "framer-motion";
import Items from "../items/Items";
import AccountingPanel from "../accounting/AccountingPanel";
import Notes from "../notes/Notes";
import ActivityPanel from "../activity/ActivityPanel";


const TabsContainer = () => {

  const { currentTab } = usePurchasingSelection();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {currentTab === 'items' && <Items />}
        {currentTab === 'accounting' && <AccountingPanel />}
        {currentTab === 'notes' && <Notes />}
        {currentTab === 'activity' && <ActivityPanel />}
      </motion.div>
    </AnimatePresence>
  )
}

export default TabsContainer
