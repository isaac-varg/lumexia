"use client"
import React from 'react'
import { Wizard } from 'react-use-wizard';
import Step1 from './step1/Step1';
import WizardFooter from './WizardFooter';
import Step2 from './step2/Step2';
import Step3 from './step3/Step3';
import Step4 from './step4/Step4';

const MbprWizard = () => {

  return (
    <Wizard
      header={<WizardFooter />}
    >
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
    </Wizard>
  )
}

export default MbprWizard 
