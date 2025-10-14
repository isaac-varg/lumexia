import SectionTitle from "@/components/Text/SectionTitle"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"
import StepActions from "./StepActions"
import Instructions from "./Instructions"
import Addendums from "./Addendums"
import { Fragment } from "react"
import Notes from "../shared/Notes"
import ActionButton from "@/components/ActionButton"
import { IoMdArrowRoundBack } from "react-icons/io"
import StepMaterials from "./StepMaterials"

const StepDetails = () => {

  const { selectedStep, compoundingDetailsMode } = useProductionSelection()

  if (!selectedStep) return false;

  return (
    <div className="col-span-3" >
      <div className="flex flex-col gap-6">

        <StepActions />

        {compoundingDetailsMode === 'main' && (
          <Fragment>
            <Instructions />
            <StepMaterials />
            {selectedStep.batchStep.StepAddendum.length !== 0 && <Addendums />}
          </Fragment>
        )}

        {compoundingDetailsMode === 'note' && (
          <Notes />
        )}



      </div>
    </div>


  )
}

export default StepDetails
