import { MbprFromItem } from "@/actions/production/mbpr/getAllByProducedItem"
import { useMbprWizardActions } from "@/store/mbprWizardSlice"
import { TextUtils } from "@/utils/text"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import useDialog from "@/hooks/useDialog"
import { MouseEvent } from "react"
import { TbCopy, TbEdit } from "react-icons/tb"
import { duplicateMbpr } from "../../_functions/duplicateMbpr"

const VersionCard = ({ mbpr, setDialogMode }: { mbpr: MbprFromItem, setDialogMode: (mode: 'edit' | 'create') => void }) => {
  const { setSelectedMbpr, setProducesItem, nextStep } = useMbprWizardActions()
  const { showDialog } = useDialog()

  const handleDuplicate = async (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (!mbpr) throw new Error("mbpr not found");
    const newMbpr = await duplicateMbpr(mbpr.id);

    if (!newMbpr) throw new Error('MBPR not duplicated')

    await createActivityLog('Duplicated MBPR', 'mbpr', newMbpr.id, { context: `Duplicated from version: ${mbpr.versionLabel}` })
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
          <div className="flex gap-x-1">
            <div onClick={(event) => { event.stopPropagation(); setSelectedMbpr(mbpr); setDialogMode('edit'); showDialog('mbprForm') }} className="btn btn-circle btn-ghost btn-sm hover:bg-blue-500 hover:text-white">
              <TbEdit className="text-lg" />
            </div>
            <div onClick={(event) => handleDuplicate(event)} className="btn btn-circle btn-ghost btn-sm hover:bg-emerald-500 hover:text-white">
              <TbCopy className="text-lg" />
            </div>
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
