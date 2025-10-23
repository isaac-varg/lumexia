import Card from "@/components/Card"
import SearcherUnmanaged from "@/components/Search/SearcherUnmanaged"
import { usePurchasingSelection } from "@/store/purchasingSlice"
import { Dispatch, SetStateAction, useState } from "react"
import { PurchasableItem } from "../../_functions/getAllItems"
import { handleItemAdd } from "../../_functions/handleItemAdd"
import { useRouter } from "next/navigation"
import { useHotkeys } from "react-hotkeys-hook"

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

  useHotkeys(
    'enter',
    (event) => {
      event.preventDefault()
      handleAdd(results[0]);

    },
    { enableOnFormTags: true, preventDefault: true }
  )


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
          {results.map((r, i) => {
            return (
              <div
                key={r.id}
                className="bg-accent/20 rounded-xl py-1 px-4 font-poppins text-lg text-base-content hover:bg-accent/40 hover:cursor-pointer"
                onClick={() => handleAdd(r)}
              >
                <div className="flex justify-between items-center">
                  {`${r.name} ${r.aliases.length !== 0 ? `(${r.aliasesAll})` : ''}`}

                  {i === 0 && (<kbd className="kbd kbd-md">enter</kbd>
                  )}
                </div>
              </div>
            )
          })}

        </div>

      </Card.Root>

    </div>
  )
}

export default AddItem
