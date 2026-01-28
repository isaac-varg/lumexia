import { usePricingPurchasedSelection } from "@/store/pricingPurchasedSlice";
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"


const TotalCostPerLbPurchased = () => {

  const { pricingData } = usePricingPurchasedSelection()
  const { totalCostPerLb, } = usePricingSharedSelection()

  if (!pricingData) return false;

  // totalCostPerLb is always converted to $/lb, so label should always be $/lb
  return (
    <div className=' rounded-xl flex  flex-col gap-y-2 padding-2 bg-sky-800 items-center justify-center'>
      <h1 className='font-poppins font-bold text-6xl text-white'>{toFracitonalDigits.pricingCurrency(totalCostPerLb)}</h1>
      <h2 className='font-poppins font-semibold text-lg text-neutral-300'>$/lb</h2>
    </div>
  )
}

export default TotalCostPerLbPurchased
