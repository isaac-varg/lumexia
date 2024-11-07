import { Panels } from '@/components/Panels'
import Text from '@/components/Text'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'

const BasicsPanel = ({bpr}: {bpr: BatchProductionRecord}) => {
  return (
      <Panels.Root>
            <Text.SectionTitle>Basics</Text.SectionTitle>
                
            <Text.LabelDataPair label='Batch Size' data={`${bpr.batchSize.quantity} lbs`} />
            
            
      </Panels.Root>
  )
}

export default BasicsPanel
