'use client'
import Card from "@/components/Card"
import Text from "@/components/Text"
import { usePricingPurchasedSelection } from "@/store/pricingPurchasedSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"

const PurchasedBasics = () => {
  const { pricingData, lastPrice } = usePricingPurchasedSelection()

  if (!pricingData) return false;

  const { isUpcomingPriceActive, upcomingPriceUom, upcomingPrice, arrivalCost, unforeseenDifficultiesCost } = pricingData;


  return (
    <Card.Root>

      <div className='flex flex-col gap-y-2'>

        <Text.LabelDataPair
          label='Last Purchase Price'
          tooltip='The price per unit obtained from the last purchase order.'
          data={`${toFracitonalDigits.curreny(lastPrice?.pricePerUnit || 0)} $/${lastPrice?.uom.abbreviation || 'unspecified'} ` || 0}
        />

        <Text.LabelDataPair
          label='Upcoming Price'
          tooltip='A price set in the item details that can optionally override the last price by setting Upcoming Price Active to true.'
          data={isUpcomingPriceActive ? `${upcomingPrice} $/${upcomingPriceUom?.abbreviation}` : 'Inactive'}
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
    </Card.Root>
  )
}

export default PurchasedBasics
