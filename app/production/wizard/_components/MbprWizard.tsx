"use client"
import React from 'react'
import { Wizard } from 'react-use-wizard';
import Step1 from './step1/Step1';

const MbprWizard = () => {

  return (
    <Wizard>
      <Step1 />
    </Wizard>
  )
}

export default MbprWizard 
