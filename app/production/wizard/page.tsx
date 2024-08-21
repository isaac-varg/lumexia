import React from 'react'
import MbprWizard from './_components/MbprWizard'
import WizardTitle from './_components/WizardTitle'

const WizardPage = () => {
  return (
    <div className='h-full'>
      <WizardTitle />
      <MbprWizard />
    </div>
  )
}

export default WizardPage
