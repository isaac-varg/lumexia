'use client'
import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import { useQcParameterSelection } from "@/store/qcParametersSlice"
import { useState } from "react"
import { TbPlus } from "react-icons/tb"
import AddGroup from "./AddGroup"
import GroupItem from "./GroupItem"

const Groups = () => {

  const { parameterGroups } = useQcParameterSelection()
  const [viewMode, setViewMode] = useState<'view' | 'add'>('view')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SectionTitle>Groups</SectionTitle>
        <button onClick={() => setViewMode('add')} className="btn btn-secondary"><TbPlus className="size-4" /></button>
      </div>

      <Card.Root>

        {viewMode === 'view' && (
          <div className="grid grid-cols-1 gap-2">
            {parameterGroups.map(g => <GroupItem key={g.id} group={g} />)}

            {parameterGroups.length === 0 && <span className="text-lg text-base-content/70">This parameter does not belong to a group</span>}
          </div>
        )}

        {viewMode === 'add' && <AddGroup setViewMode={setViewMode} />}
      </Card.Root>



    </div>

  )
}

export default Groups
