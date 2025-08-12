import { PackagingItem } from "@/actions/accounting/consumerContainers/getPackagingItems"
import { Search } from "@/components/Search"
import { UnmanagedForm } from "@/components/UnmanagedForm"
import { usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TbEdit } from "react-icons/tb"
import { InterimAuxiliaryItem } from "./StepAuxiliaries"



const EditModeStepAuxiliariesAdd = ({ setMode, onAuxiliaryAdd }: { setMode: Dispatch<SetStateAction<'view' | 'add'>>, onAuxiliaryAdd: (data: InterimAuxiliaryItem) => void }) => {

  // packaging is considered auxiliary here..
  const { packagingItems } = usePricingSharedSelection()
  const { getPackagingItems } = usePricingSharedActions()
  const [selectedAuxiliaryItem, setSelectedAuxiliaryItem] = useState<PackagingItem>()
  const [queryInput, setQueryInput] = useState("");
  const [queryResults, setQueryResults] = useState<PackagingItem[]>([])
  const [quantity, setQuantity] = useState("")
  const [difficultyAdjustmentCost, setDifficultyAdjustmentCost] = useState("")
  const [itemMode, setItemMode] = useState<'view' | 'modify'>(selectedAuxiliaryItem ? 'view' : 'modify');
  const [isError, setIsError] = useState<boolean>(false);

  const handleAdd = () => {

    if (quantity.length === 0 || difficultyAdjustmentCost.length === 0 || !selectedAuxiliaryItem) {
      setIsError(true)
      return;
    }

    const payload: InterimAuxiliaryItem = {
      auxiliaryItemId: selectedAuxiliaryItem.id,
      auxiliaryItemName: selectedAuxiliaryItem.name,
      difficultyAdjustmentCost,
      quantity,
    }

    onAuxiliaryAdd(payload);
    setMode('view')


  }

  const handleQuerySelection = (item: PackagingItem) => {
    setSelectedAuxiliaryItem(item);
    setQueryInput("")
    setItemMode('view')
  }


  useEffect(() => {
    if (packagingItems.length === 0) {
      getPackagingItems();
    }
  }, [])

  return (
    <div className="flex flex-col gap-y-4">

      {isError ? <h1 className="font-poppins text-2xl text-rose-400 font-semibold">Please Complete the Form</h1> : <div />}


      {itemMode === 'view' ? (
        <div className="flex gap-x-4 items-center">
          <h1 className="font-poppins text-xl font-semibold">{selectedAuxiliaryItem?.name || 'Select Item'}</h1>
          <button className="btn btn-md" onClick={() => setItemMode('modify')} ><span className="text-xl"><TbEdit /></span></button>

        </div>) : (

        <div>
          <Search.SearcherUnmanaged data={packagingItems} keys={['name']} input={queryInput} setInput={setQueryInput} onQueryComplete={setQueryResults} limit={5} />

          <div className="grid grid-cols-1 gap-1">

            {queryResults.map((item) => <div onClick={() => handleQuerySelection(item)} className="flex px-4 py-2 bg-neutral-200 rounded-xl" key={item.id}>{item.name}</div>)}
          </div>

        </div>


      )}


      <UnmanagedForm.Number placeholder="Quantity" onChangeOutput={setQuantity} input={quantity} />


      <UnmanagedForm.Number placeholder="Difficulty Adjustment Cost" onChangeOutput={setDifficultyAdjustmentCost} input={difficultyAdjustmentCost} />

      <div className="flex justify-end">

        <button className="btn btn-neutral btn-soft" onClick={() => handleAdd()}>Add</button>
      </div>

    </div>
  )
}

export default EditModeStepAuxiliariesAdd
