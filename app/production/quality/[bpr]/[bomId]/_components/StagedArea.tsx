import { ExBprStaging } from '@/types/bprStaging'
import React from 'react'
import StagedCard from './StagedCard'
import Card from '@/components/Card'

const StagedArea = ({ stagings }: { stagings: ExBprStaging[] }) => {
  return (

    <div className='grid md:grid-cols-1 grid-cols-3 gap-4'>
      {stagings.map((staging) => <StagedCard key={staging.id} staging={staging} />)}
    </div>
  )
}

export default StagedArea
