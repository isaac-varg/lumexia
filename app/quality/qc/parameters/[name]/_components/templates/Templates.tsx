'use client'
import SectionTitle from "@/components/Text/SectionTitle"
import { useQcParameterSelection } from "@/store/qcParametersSlice"
import { TbPlus } from "react-icons/tb"
import TemplateItem from "./TemplateItem"
import Card from "@/components/Card"
import { useState } from "react"

const Templates = () => {

  const { parameterTemplates } = useQcParameterSelection()
  const [viewMode, setViewMode] = useState<'view' | 'add'>('view')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SectionTitle>Templates</SectionTitle>
        <button onClick={() => setViewMode('add')} className="btn btn-secondary"><TbPlus className="size-4" /></button>
      </div>

      <Card.Root>

        {viewMode === 'view' && (
          <div className="grid grid-cols-1 gap-2">
            {parameterTemplates.map(t => <TemplateItem key={t.id} template={t} />)}

            {parameterTemplates.length === 0 && <span className="text-lg text-base-content/70">This parameter does not belong to a template</span>}
          </div>
        )}
      </Card.Root>



    </div>

  )
}

export default Templates
