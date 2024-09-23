import LabelDataPair from '@/components/Text/LabelDataPair'
import React from 'react'

type Data = {
  lot: string | null
  quantity: number | null
  validity: Record<string, boolean>
} 

const ReviewStep = ({ data} : { data: Data}) => {
  



  return (
    <div>
    {data.validity.lot && <LabelDataPair label='Lot' data={data.lot || ""} /> }
    
    </div>
  )
}

export default ReviewStep
