"use client"
import { useQcParameterSelection } from '@/store/qcParametersSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Parameters from '../parameters/Parameters';

const TabsContainer = () => {

  const { currentTab } = useQcParameterSelection();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {currentTab === 'parameters' && <Parameters />}

      </motion.div>
    </AnimatePresence>
  )
}

export default TabsContainer
