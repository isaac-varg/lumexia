import { qualityActions } from "@/actions/quality"
import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import SearcherUnmanaged from "@/components/Search/SearcherUnmanaged"
import { useQcParameterSelection } from "@/store/qcParametersSlice"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"

const AddTemplate = ({ setViewMode }: { setViewMode: Dispatch<SetStateAction<'add' | 'view'>> }) => {

  const { selectedParameter, templates } = useQcParameterSelection()
  const router = useRouter()
  const [input, setInput] = useState('');
  const [filtered, setFiltered] = useState<QcTemplate[]>(templates);

  const handleSelection = async (template: QcTemplate) => {
    if (!selectedParameter) return;

    await qualityActions.qc.templateParameters.create({
      templateId: template.id,
      parameterId: selectedParameter.id,
    });

    router.refresh()
    setViewMode('view');

  }

  if (!selectedParameter) return false

  return (
    <div className="flex flex-col gap-4">
      <SearcherUnmanaged<QcTemplate>
        input={input}
        setInput={setInput}
        data={templates}
        keys={['name', 'abbreviation']}
        onQueryComplete={setFiltered}
      />

      <div className="grid grid-cols-1 gap-1 overflow-auto">

        {filtered.map(t => {
          return (
            <div
              onClick={() => handleSelection(t)}
              key={t.id}
              className="px-4 py-1 bg-accent/25 rounded-xl text-lg font-medium text-base-content hover:cursor-pointer hover:bg-accent/15"
            >
              {t.name}
            </div>
          )
        })}
      </div>


    </div>
  )
}

export default AddTemplate
