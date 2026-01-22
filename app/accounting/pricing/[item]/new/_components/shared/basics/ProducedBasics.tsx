'use client'
import Card from "@/components/Card"
import Text from "@/components/Text"
import { usePricingProducedSelection } from "@/store/pricingProducedSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { BatchSummations } from "../../../_actions/getBomPricingSummations"

const ProducedBasics = () => {

  const { pricingData } = usePricingProducedSelection()


  const summations = pricingData?.isError ? null : pricingData as BatchSummations


  if (!pricingData || !summations) return false;





  return (
    <Card.Root>

      <div className='flex flex-col gap-y-2'>


        <Text.LabelDataPair
          label='Labor Cost'
          tooltip='The fixed labour cost times the tank time'
          data={toFracitonalDigits.pricingCurrency(summations.laborCost)}

        />
        <Text.LabelDataPair
          label='BOM $/batch'
          tooltip='The overall cost of each material at the concentration that they are put into the batch. Also includes things like the items Production Usage Cost, Arrival Cost, etc.'
          data={`${toFracitonalDigits.pricingCurrency(summations.totalBomCostPerBatch)}`}
        />
        <Text.LabelDataPair
          label='BOM $/lb'
          tooltip='The overall cost of each material at the concentration that they are put into the batch. Also includes things like the items Production Usage Cost, Arrival Cost, etc.'
          data={`${toFracitonalDigits.pricingCurrency(summations.totalBomCostPerLb)}`}
        />

        <Text.LabelDataPair
          label='Total $/batch'
          tooltip='The overall cost of everything per batch'
          data={`${toFracitonalDigits.pricingCurrency(summations.totalBomCostPerBatch)}`}
        />


      </div>
    </Card.Root >
  )
}

export default ProducedBasics 
