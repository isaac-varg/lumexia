import { InterimAuxiliaryDetails, InterimFinishedProductDetails, usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { TbDeviceFloppy } from "react-icons/tb"
import { updateFinishedProductData } from "../../../_actions/updateFinishedProductData"
import { accountingActions } from "@/actions/accounting"
import { useRouter } from "next/navigation"

const SaveButton = () => {

  const { interimFinishedProductData, selectedFinishedProduct } = usePricingSharedSelection()
  const { setFinishedProductsMode, clearInterimFinishedProductData } = usePricingSharedActions()
  const router = useRouter()

  if (!selectedFinishedProduct) return;


  const keysToExclude = ['finishedProductData'];
  const auxes = Array.from(interimFinishedProductData)
    .filter(([key]) => !keysToExclude.includes(key))
    .map(([key, value]) => (value)) as InterimAuxiliaryDetails[]


  const handleSave = async () => {

    await handleFinishedProduct();
    await handleAuxiliaryCreation();
    await handleAuxiliaryUpdate();

    clearInterimFinishedProductData();
    setFinishedProductsMode('normal');

    router.refresh()

  }

  const handleAuxiliaryCreation = async () => {

    const newAuxes = auxes.filter(a => a.isNew);

    const response = await Promise.all(newAuxes.map(async (aux) => {
      return await accountingActions.finishedProducts.auxiliaries.create({
        apartOfFinishedProductId: selectedFinishedProduct.id,
        auxiliaryItemId: aux.itemId,
        quantity: aux.quantity,
        difficultyAdjustmentCost: aux.difficultyAdjustmentCost,
      });
    }));
    return response;
  }

  const handleAuxiliaryUpdate = async () => {
    // handle dirty auxes here
    const updatedAuxes = auxes.filter(a => (a.isDirty));

    const response = await Promise.all(updatedAuxes.map(async (aux) => {
      if (aux.isNew) {
        return;
      }
      return await accountingActions.finishedProducts.auxiliaries.update(aux.id, {
        quantity: aux.quantity,
        difficultyAdjustmentCost: aux.difficultyAdjustmentCost,
      })
    }))

    return response;
  }

  const handleFinishedProduct = async () => {

    if (interimFinishedProductData.has('finishedProductData')) {
      const fp = interimFinishedProductData.get('finishedProductData') as InterimFinishedProductDetails;

      const finishedProductUpdate = await updateFinishedProductData(fp.id, {
        name: fp.name,
        declaredQuantity: fp.declaredQuantity,
        fillQuantity: fp.fillQuantity,
        difficultyAdjustmentCost: fp.difficultyAdjustmentCost,
        freeShippingCost: fp.freeShippingCost
      })

      return finishedProductUpdate;
    }
    return;
  }
  return (
    <button
      className="btn btn-success flex gap-2 items-center"
      onClick={handleSave}
    >

      <TbDeviceFloppy className="size-6" />
      Save
    </button>

  )
}

export default SaveButton
