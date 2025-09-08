import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { BprBomItem } from "../../_actions/getBprBom"

const MaterialButton = ({ material }: { material: BprBomItem }) => {

  const { selectedBomItem } = useProductionSelection()
  const { setSelectedBomItem } = useProductionActions()
  const isSelected = material.id === selectedBomItem?.id || false;

  const handleClick = () => {
    setSelectedBomItem(material);
  }

  return (
    <button onClick={() => handleClick()} className={`btn btn-xl ${isSelected ? 'btn-secondary' : 'btn-secondary btn-soft '} flex justify-start`}>

      <div className="flex gap-4 text-secondary-content ">

        <div className="rounded-xl bg-accent/50 p-4 size-8 min-w-16 flex items-center justify-center">{material.bom.identifier}</div>
        <span> {material.bom.item.name}</span>
      </div>
    </button>
  )
}

export default MaterialButton
