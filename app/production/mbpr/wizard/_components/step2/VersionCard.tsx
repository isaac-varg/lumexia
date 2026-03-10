import { MbprFromItem } from "@/actions/production/mbpr/getAllByProducedItem"
import { useMbprWizardActions } from "@/store/mbprWizardSlice"
import { TextUtils } from "@/utils/text"
import { MouseEvent } from "react"
import { TbCopy } from "react-icons/tb"
import { duplicateMbpr } from "../../_functions/duplicateMbpr"

const VersionCard = ({ mbpr, }: { mbpr: MbprFromItem }) => {
  const { setSelectedMbpr, setProducesItem, nextStep } = useMbprWizardActions()

  const handleDuplicate = async (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (!mbpr) throw new Error("mbpr not found");
    const newMbpr = await duplicateMbpr(mbpr.id);

    if (!newMbpr) throw new Error('MBPR not duplicated')

    setProducesItem(newMbpr.producesItemId)
    setSelectedMbpr(newMbpr);


  }

  const handleSelect = () => {
    setSelectedMbpr(mbpr)
    nextStep();
  }
  return (
    <div
      onClick={handleSelect}
      className="card bg-base-200 shadow-sm hover:shadow-md hover:cursor-pointer transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title font-poppins">
            {mbpr.versionLabel}
          </h2>
          <div onClick={(event) => handleDuplicate(event)} className="btn btn-circle btn-ghost btn-sm hover:bg-emerald-500 hover:text-white">
            <TbCopy className="text-lg" />
          </div>
        </div>

        <div className="card-actions">
          <div
            className="badge font-semibold py-3 px-4"
            style={{ backgroundColor: mbpr.recordStatus.bgColor, color: mbpr.recordStatus.textColor }}
          >
            {TextUtils.properCase(mbpr.recordStatus.name)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VersionCard
