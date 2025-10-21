import Card from "@/components/Card"
import SearcherUnmanaged from "@/components/Search/SearcherUnmanaged"
import { usePurchasingSelection } from "@/store/purchasingSlice"
import { Dispatch, SetStateAction, useState } from "react"
import { PurchasableItem } from "../../_functions/getAllItems"
import { handleItemAdd } from "../../_functions/handleItemAdd"
import { useRouter } from "next/navigation"

const AddItem = ({ setIsAddMode }: { setIsAddMode: Dispatch<SetStateAction<boolean>> }) => {
  const { purchasableItems, purchaseOrder, } = usePurchasingSelection()
  const [input, setInput] = useState("");
  const [results, setResults] = useState<PurchasableItem[]>([]);
  const router = useRouter()
  const handleAdd = async (item: PurchasableItem) => {
    if (!purchaseOrder) return;

    await handleItemAdd(purchaseOrder.id, item, purchaseOrder.statusId)
    setIsAddMode(false)
    router.refresh()


  }


  return (
    <div>
      <Card.Root>
        <SearcherUnmanaged
          data={purchasableItems}
          keys={['name', 'aliasesAll', 'referenceCode']}
          input={input}
          setInput={setInput}
          onQueryComplete={setResults}
        />


        <div className="grid grid-cols-1 gap-1 overflow-auto max-h-[500px]">
          {results.map(r => {
            return (
              <div
                className="bg-accent/20 rounded-xl py-1 px-4 font-poppins text-lg text-base-content hover:bg-accent/40 hover:cursor-pointer"
                onClick={() => handleAdd(r)}
              >
                {`${r.name} ${r.aliases.length !== 0 ? `(${r.aliasesAll})` : ''}`}
              </div>
            )
          })}

        </div>

      </Card.Root>

    </div>
  )
}

export default AddItem
