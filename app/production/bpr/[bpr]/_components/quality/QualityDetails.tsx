import SectionTitle from "@/components/Text/SectionTitle"
import { useProductionSelection } from "@/store/productionSlice"
import Amounts from "../shared/Amounts"
import StagedQualityCard from "./StagedQualityCard"
import QualityActions from "./QualityActions"

const QualityDetails = () => {
  const { selectedBomItem, stagings, qualityDetailsViewMode } = useProductionSelection()

  if (!selectedBomItem) return false

  return (
    <div className="col-span-3" >
      <div className="flex flex-col gap-6">
        <SectionTitle>{`#${selectedBomItem.bom.identifier} ${selectedBomItem.bom.item.name}`}</SectionTitle>

        <QualityActions />


        <Amounts />



        {stagings.map(s => {
          return (
            <StagedQualityCard key={s.id} staged={s} />
          )
        })}





      </div>

    </div>
  )
}

export default QualityDetails
