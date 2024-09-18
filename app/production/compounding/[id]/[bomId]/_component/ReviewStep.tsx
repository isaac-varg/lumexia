import LabelDataPair from '@/components/Text/LabelDataPair'
import React from 'react'

type Data = {
  lot: string | null
  quantity: number | null
} 

const ReviewStep = ({ data} : { data: Data}) => {
  return (
    <div>
      <LabelDataPair label='Lot' data={data.lot}
    
    </div>
  )
}

export default ReviewStep
