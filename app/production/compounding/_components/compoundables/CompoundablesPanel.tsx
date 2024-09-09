import Card from '@/components/Card'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'
import BprCard from './BprCard'

type CompoundablesPanelProps = {
  compoundables:  BatchProductionRecord[],
}

const CompoundablesPanel = ({compoundables} : CompoundablesPanelProps) => {
  return (
    <Card.Root>
        <Card.Title>All</Card.Title>
        <div className='grid grid-cols-4 gap-4'>
          {compoundables.map((bpr ) => <BprCard key={bpr.id} bpr={bpr} /> )}
        </div>
    </Card.Root>
  )
}

export default CompoundablesPanel
