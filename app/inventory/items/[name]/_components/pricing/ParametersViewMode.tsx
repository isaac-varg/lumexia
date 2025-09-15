import { ItemPricingData } from '@/actions/accounting/pricing/getItemPricingData'
import Text from '@/components/Text'
import { useItemSelection } from '@/store/itemSlice'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'

const ViewMode = () => {

  const { pricingData: pricing } = useItemSelection()

  const arrivalCost = toFracitonalDigits.curreny(pricing?.arrivalCost || 0)
  const productionUsageCost = toFracitonalDigits.curreny(pricing?.productionUsageCost || 0)
  const unforeseenDifficultiesCost = toFracitonalDigits.curreny(pricing?.unforeseenDifficultiesCost || 0)
  const upcomingPrice = toFracitonalDigits.curreny(pricing?.upcomingPrice || 0)
  const upcomingPriceActive = pricing?.isUpcomingPriceActive || false
  const upcomingPriceUom = pricing?.upcomingPriceUom.abbreviation || 'NA'
  const auxiliaryUsageCost = toFracitonalDigits.curreny(pricing?.auxiliaryUsageCost || 0)

  const data = [
    { property: 'Arrival Cost', value: arrivalCost },
    { property: 'Production Usage Cost', value: productionUsageCost },
    { property: 'Unforeseen Difficulties Cost', value: unforeseenDifficultiesCost },
    { property: 'Auxiliary Usage Cost', value: auxiliaryUsageCost },
    { property: 'Upcoming Price', value: upcomingPrice },
    { property: 'Is Upcoming Price Active', value: upcomingPriceActive.toString() },
    { property: 'Upcoming Price UOM', value: upcomingPriceUom },
  ]



  return (

    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => {
            return (
              <tr key={index}>
                <td>{d.property}</td>
                <td>{d.value}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>


  )
}

export default ViewMode
