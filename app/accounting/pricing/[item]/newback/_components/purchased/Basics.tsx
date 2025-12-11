'use client'
import Card from '@/components/Card'
import Text from '@/components/Text'
import { usePricingPurchasedSelection } from '@/store/pricingPurchasedSliceback'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'

const Basics = () => {

  const { lastPrice, upcomingPriceActive, upcomingPrice, upcomingPriceUom, unforeseenDifficultiesCost, arrivalCost, itemCost } = usePricingPurchasedSelection()

  const itemCostUomLabel = upcomingPriceActive ? `$/${upcomingPriceUom?.abbreviation}` : `$/${lastPrice?.uom.abbreviation}`

  return (
    <Card.Root>
      <Card.Title>Basics</Card.Title>

      <div className='flex justify-between gap-x-4'>
        <div className='flex flex-col gap-y-2 w-2/3'>

          <Text.LabelDataPair
            label='Last Purchase Price'
            tooltip='The price per unit obtained from the last purchase order.'
            data={`${toFracitonalDigits.curreny(lastPrice?.pricePerUnit || 0)} $/${lastPrice?.uom.abbreviation || 'unspecified'} ` || 0}
          />

          <Text.LabelDataPair
            label='Upcoming Price'
            tooltip='A price set in the item details that can optionally override the last price by setting Upcoming Price Active to true.'
            data={upcomingPriceActive ? `${upcomingPrice} $/${upcomingPriceUom?.abbreviation}` : 'Inactive'}
          />

          <Text.LabelDataPair
            label='Unforeseen Difficulties Cost'
            tooltip='Cost to account for natural disasters or supply chain issues causing a material price to increase or become diffcult to procure... think HWC or the fires our suppliers had'
            data={toFracitonalDigits.curreny(unforeseenDifficultiesCost || 0)}
          />

          <Text.LabelDataPair
            label='Arrival Cost'
            data={toFracitonalDigits.curreny(arrivalCost || 0)}

          />


        </div>
        <div className=' rounded-xl flex w-1/3 flex-col gap-y-2 padding-2 bg-sky-800 items-center justify-center'>
          <h1 className='font-poppins font-bold text-6xl text-white'>{toFracitonalDigits.curreny(itemCost)}</h1>
          <h2 className='font-poppins font-semibold text-lg text-neutral-300'>{itemCostUomLabel} </h2>
        </div>

      </div>
    </Card.Root>

  )
}

export default Basics
