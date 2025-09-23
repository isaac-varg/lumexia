'use client'
import { useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { AnimatePresence, motion } from "framer-motion"
import Lot from "../lot/Lot"


const StepContainer = () => {
  const { step } = useQcExaminationSelection()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {step === 0 && <Lot />}

      </motion.div>
    </AnimatePresence>

  )
}

export default StepContainer
