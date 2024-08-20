"use client"
import React from 'react'
import { Wizard } from 'react-use-wizard';
import Step1 from './step1/Step1';
import WizardFooter from './WizardFooter';
import Step2 from './step2/Step2';
import Step3 from './step3/Step3';

const MbprWizard = () => {

  return (
    <Wizard
      footer={<WizardFooter />}
    >
      <Step1 />
      <Step2 />
      <Step3 />
    </Wizard>
  )
}

export default MbprWizard 
