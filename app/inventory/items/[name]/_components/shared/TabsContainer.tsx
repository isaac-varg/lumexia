"use client"
import { useItemSelection } from "@/store/itemSlice"
import Basics from "../basics/Basics"
import Purchasing from "../purchasing/Purchasing";
import { motion, AnimatePresence } from 'framer-motion';
import Inventory from "../inventory/Inventory";
import Pricing from "../pricing/Pricing";
import Production from "../production/Production";


const TabsContainer = () => {

  const { currentTab } = useItemSelection();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {currentTab === 'basics' && <Basics />}
        {currentTab === 'inventory' && <Inventory />}
        {currentTab === 'purchasing' && <Purchasing />}
        {currentTab === 'pricing' && <Pricing />}
        {currentTab === 'production' && <Production />}
      </motion.div>
    </AnimatePresence>
  )
}

export default TabsContainer
