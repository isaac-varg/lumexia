import { ProductionWizardContext } from '@/context/ProductionWizardContext'
import React, { useContext } from 'react'
import { useWizard } from 'react-use-wizard'

const StepDot = ({ isActive, permission, stepIndex }: { isActive: boolean, permission: boolean, stepIndex: number }) => {
  const { goToStep } = useWizard();
  const classes = {
    bg: {
      active: 'bg-swirl-500',
      inactive: 'bg-swirl-200',
      inactiveSelectable: 'bg-limed-spruce-300 hover:cursor-pointer hover:bg-limed-spruce-400'
    }
  }

  const bgClass = isActive
    ? classes.bg.active
    : permission
      ? classes.bg.inactiveSelectable
      : classes.bg.inactive

  const handleStepClick = () => {
    if (permission) {
      goToStep(stepIndex)
    }
  }
   
  return <div className={`w-6 h-6 ${bgClass} rounded-full`} onClick={handleStepClick}/>
}

const WizardFooter = () => {

  const { stepCount, activeStep   } = useWizard()
  const { selectedProducibleMaterial, selectedMbpr } = useContext(ProductionWizardContext)

  const permissions: Record<number, boolean> = {
    1: true, // first step is always allowed
    2: selectedProducibleMaterial !== null,
    3: selectedMbpr !== null, 
    4: selectedMbpr !== null,
  }


  return (
    <div className='flex flex-row items-center justify-center mt-8'>

      <span className='flex items-center gap-x-4'>
        {Array.from({ length: stepCount }).map((_, index) => (
          <StepDot key={index} isActive={index === activeStep} permission={permissions[index + 1] || false} stepIndex={index}/>
        ))}
      </span> 
      
    
    </div>
  )
}

export default WizardFooter
