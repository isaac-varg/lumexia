import Card from '@/components/Card'
import { staticRecords } from '@/configs/staticRecords'
import { ExBprBom } from '@/types/bprBom'
import React from 'react'
import ItemCard from './ItemCard'

const StagedPanel = ({ bom }: { bom: ExBprBom[] }) => {
  return (
    <Card.Root>
      <Card.Title>Staged</Card.Title>
      <div className='grid grid-cols-4 gap-4'>
        {bom.filter((bomItem) => bomItem.statusId !== staticRecords.production.bprBomStatuses.notStarted).map((item) => <ItemCard bomItem={item} />)}
      </div>

    </Card.Root>
  )
}

export default StagedPanel 
