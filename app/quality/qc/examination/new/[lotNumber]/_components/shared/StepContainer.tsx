'use client'
import { useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { AnimatePresence, motion } from "framer-motion"
import Type from "../type/Type"
import Examination from "../examination/Examination"


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
        {step === 1 && <Type />}
        {step === 2 && <Examination />}

      </motion.div>
    </AnimatePresence>

  )
}

export default StepContainer
