"use client"

import React from 'react'
import { Wizard } from 'react-use-wizard'
import BprSelectionStep from './BprSelectionStep'
import { IBprForSSF } from '../_functions/getBprs'

const MicroWizard = ({bprs}: {bprs: IBprForSSF[]}) => {

  return (
      <Wizard>
        <BprSelectionStep bprs={bprs} onSelection={() => console.log('hi')} />
      </Wizard>
  )
}

export default MicroWizard
