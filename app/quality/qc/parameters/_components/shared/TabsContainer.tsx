"use client"
import { useQcParameterSelection } from '@/store/qcParametersSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Parameters from '../parameters/Parameters';
import Templates from '../templates/Templates';
import Groups from '../groups/Groups';

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
        {currentTab === 'templates' && <Templates />}
        {currentTab === 'groups' && <Groups />}

      </motion.div>
    </AnimatePresence>
  )
}

export default TabsContainer
