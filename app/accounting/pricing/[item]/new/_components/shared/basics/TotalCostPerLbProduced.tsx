import { usePricingProducedSelection } from "@/store/pricingProducedSlice";
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"


const TotalCostPerLbProduced = () => {

  const { totalCostPerLb } = usePricingSharedSelection()
  const { pricingData } = usePricingProducedSelection()

  if (!pricingData) return false;


  return (
    <div className=' rounded-xl flex  flex-col gap-y-2 padding-2 bg-sky-800 items-center justify-center'>
      <h1 className='font-poppins font-bold text-6xl text-white'>{toFracitonalDigits.pricingCurrency(totalCostPerLb)}</h1>
      <h2 className='font-poppins font-semibold text-lg text-neutral-300'>$ / lbs </h2>
    </div>
  )
}

export default TotalCostPerLbProduced
