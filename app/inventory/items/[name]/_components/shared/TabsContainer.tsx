"use client"
import { useItemSelection } from "@/store/itemSlice"
import Basics from "../basics/Basics"
import Purchasing from "../purchasing/Purchasing";
import { motion, AnimatePresence } from 'framer-motion';


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
        {currentTab === 'purchasing' && <Purchasing />}
      </motion.div>
    </AnimatePresence>
  )
}

export default TabsContainer
