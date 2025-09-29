import SectionTitle from "@/components/Text/SectionTitle"
import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { TbPlus, TbTrash } from "react-icons/tb"
import AddParameters from "./AddParameters"
import Card from "@/components/Card"
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem"
import { qualityActions } from "@/actions/quality"
import { useRouter } from "next/navigation"

const Parameters = () => {

  const { qualityTemplateViewMode, qcItemParameters } = useItemSelection()
  const { setQualityTemplateViewMode } = useItemActions()
  const router = useRouter()

  const handleDelete = async (parameter: QcItemParameter) => {
    await qualityActions.qc.itemParameters.delete(parameter.id);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <SectionTitle>Parameters</SectionTitle>
        <button onClick={() => setQualityTemplateViewMode('add')} className="btn btn-secondary btn-outline"> <TbPlus className="size-4" /> </button>
      </div>

      <Card.Root>

        {(qualityTemplateViewMode === 'view' && qcItemParameters.length === 0) && <p>None so far</p>}

        {qualityTemplateViewMode === 'view' && (
          <div className="grid grid-cols-1 gap-2">
            {qcItemParameters.map(p => {
              return (
                <div
                  key={p.id}
                  className="flex justify-between bg-base-300/65 rounded-xl px-4 py-2  items-center"
                >

                  <div className="font-medium text-xl text-base-content">
                    {p.parameter.name}
                  </div>
                  <button onClick={() => handleDelete(p)} className="btn btn-ghost btn-error"> <TbTrash className="size-4" /> </button>
                </div>
              )
            })}
          </div>
        )}


        {qualityTemplateViewMode === 'add' && <AddParameters />}
      </Card.Root >
    </div >
  )
}

export default Parameters
