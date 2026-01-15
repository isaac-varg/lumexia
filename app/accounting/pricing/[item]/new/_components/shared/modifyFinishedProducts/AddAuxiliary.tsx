import { PackagingItem } from "@/actions/accounting/consumerContainers/getPackagingItems"
import { Search } from "@/components/Search"
import { InterimAuxiliaryDetails, usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { getRandomIntBetween } from "@/utils/general/getRandomIntBetween"

const AddAuxiliary = () => {

  const { packagingItems } = usePricingSharedSelection()
  const { setAuxiliaryMode, setInterimFinishedProductDatum } = usePricingSharedActions()

  const handleAdd = (item: PackagingItem) => {

    const random = getRandomIntBetween(0, 50);
    const interimId = `new${random}`

    const payload: InterimAuxiliaryDetails = {
      isNew: true,
      id: interimId,
      quantity: 0,
      name: item.name,
      difficultyAdjustmentCost: 0,
      isDirty: false,
      itemId: item.id,
    }

    setInterimFinishedProductDatum(interimId, payload);
    setAuxiliaryMode('view')
  }


  return (
    <div className="flex flex-col gap-6 w-full">

      <div className="flex justify-start" >

        <button onClick={() => {
          setAuxiliaryMode('view')
        }} className="btn btn-warning btn-outline">Cancel</button>
      </div>
      <Search.SearchWithResults
        title={false}
        data={packagingItems}
        keys={['name', 'referenceCode', "mergedAliases"]}
        returnObject={true}
        onClick={(item) => handleAdd(item)}
        display="list"
        resultItem='elevated'
      />



    </div>
  )
}

export default AddAuxiliary
