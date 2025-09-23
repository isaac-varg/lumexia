import { inventoryActions } from "@/actions/inventory"
import StateSetter from "./_components/state/StateSetter"
import StepTrack from "../_components/shared/StepTrack"
import StepContainer from "./_components/shared/StepContainer"
import { qualityActions } from "@/actions/quality"

type Props = {
  searchParams: {
    lotId: string
  }
}
const ExaminationConductPage = async ({ searchParams }: Props) => {

  const specimenLot = await inventoryActions.lots.getOne(searchParams.lotId);

  if (!specimenLot) {
    throw new Error("Specimen lot not found");
  }

  const [
    examinationTypes,
    itemParameters,
  ] = await Promise.all([
    await qualityActions.qc.examinationTypes.getAll(),
    await qualityActions.qc.itemParameters.getByItem(specimenLot.item.id)
  ])

  return (
    <div className="flex flex-col gap-6">
      <StateSetter
        examinationTypes={examinationTypes}
        itemParameters={itemParameters}
        specimenLot={specimenLot}
      />
      <StepTrack />
      <StepContainer />

    </div>
  )
}

export default ExaminationConductPage; 
