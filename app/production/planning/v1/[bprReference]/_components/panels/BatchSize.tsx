'use client'

import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { usePlanningDashboardSelection } from "@/store/planningDashboardSlice"

const BatchSize = () => {

  const { bpr } = usePlanningDashboardSelection()

  if (!bpr || bpr.batchSize.batchSizeCompoundingVessels.length === 0 || !bpr.batchSize.batchSizeCompoundingVessels[0].compoundingVessel) {
    return (
      <Panels.Root>
        <Text.SectionTitle size="small">Batch Size</Text.SectionTitle>

        <p className="font-poppins text-rose-400 font-semibold text-xl">ERROR: The corresponding Master Batch Production Record is missing an active batch size or properly configured compounding vessel.</p>

      </Panels.Root>
    )
  }
  return (
    <Panels.Root>
      <Text.SectionTitle size="small">Batch Size</Text.SectionTitle>

      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-2">

          <div className="px-4 py-2 font-poppins text-4xl font-semibold flex items-center justify-center gap-x-2">
            <p className="text-base-content">
              {bpr?.batchSize.quantity}
            </p>
            <p className="text-neutral-600">
              lbs
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-neutral-700 rounded-xl font-poppins text-3xl font-semibold flex items-center justify-center gap-x-2">
          <p className="text-neutral-100">
            {bpr?.batchSize.batchSizeCompoundingVessels[0].compoundingVessel.equipment.name}
          </p>

        </div>

        <div className="px-4 py-2 bg-neutral-700 rounded-xl font-poppins text-3xl font-semibold flex items-center justify-center gap-x-2">
          <p className="text-neutral-100">
            {bpr?.batchSize.batchSizeCompoundingVessels[0].tankTime}
          </p>

          <p className="text-neutral-400">
            hours
          </p>

        </div>



      </div>

    </Panels.Root>
  )
}

export default BatchSize
