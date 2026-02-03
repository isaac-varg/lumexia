'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTabSelection } from "@/store/tabSlice"
import Lots from "../lots/Lots"
import PurchaseOrders from "../purchase-orders/PurchaseOrders"
import Audits from "../audits/Audits"
import Notes from "../notes/Notes"

const TabsContainer = () => {

  const { activeTab } = useTabSelection()
  const currentTab = activeTab['investigation']

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {currentTab === 'lots' && <Lots />}
        {currentTab === 'purchaseOrders' && <PurchaseOrders />}
        {currentTab === 'audits' && <Audits />}
        {currentTab === 'notes' && <Notes />}
      </motion.div>
    </AnimatePresence>
  )
}

export default TabsContainer
