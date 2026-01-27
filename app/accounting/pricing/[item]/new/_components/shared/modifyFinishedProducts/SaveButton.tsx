import { InterimAuxiliaryDetails, InterimFinishedProductDetails, usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { TbDeviceFloppy } from "react-icons/tb"
import { updateFinishedProductData } from "../../../_actions/updateFinishedProductData"
import { accountingActions } from "@/actions/accounting"
import { useRouter } from "next/navigation"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement"

const SaveButton = () => {

  const { interimFinishedProductData, selectedFinishedProduct, item } = usePricingSharedSelection()
  const { setFinishedProductsMode, clearInterimFinishedProductData } = usePricingSharedActions()
  const router = useRouter()

  const keysToExclude = ['finishedProductData'];
  const auxes = Array.from(interimFinishedProductData)
    .filter(([key]) => !keysToExclude.includes(key))
    .map(([key, value]) => (value)) as InterimAuxiliaryDetails[]


  const handleSave = async () => {

    const finishedProduct = await handleFinishedProduct();
    const finishedProductId = finishedProduct?.id ?? selectedFinishedProduct?.id;

    if (finishedProductId) {
      await handleAuxiliaryCreation(finishedProductId);
      await handleAuxiliaryUpdate();
    }

    clearInterimFinishedProductData();
    setFinishedProductsMode('normal');

    router.refresh()

  }

  const handleAuxiliaryCreation = async (finishedProductId: string) => {

    const newAuxes = auxes.filter(a => a.isNew);

    const response = await Promise.all(newAuxes.map(async (aux) => {
      return await accountingActions.finishedProducts.auxiliaries.create({
        apartOfFinishedProductId: finishedProductId,
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

      if (!item) throw new Error("No item.");

      if (fp.isNew) {
        const newFinishedProduct = await accountingActions.finishedProducts.create({
          name: fp.name,
          fillQuantity: fp.fillQuantity,
          declaredQuantity: fp.declaredQuantity,
          difficultyAdjustmentCost: fp.difficultyAdjustmentCost,
          freeShippingCost: fp.freeShippingCost,
          filledWithItemId: item.id,
          fillUomId: uom.pounds,
          recordStatusId: recordStatuses.active,
          finishedProductTotalCost: 0,
          auxiliariesTotalCost: 0,
          productFillCost: 0,
          consumerPrice: 0,
          markup: 0,
          profit: 0,
          profitPercentage: 0,
        });
        return newFinishedProduct;
      }

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
