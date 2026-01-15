import { inventoryActions } from "@/actions/inventory"
import StateSetter from "./_components/state/StateSetter"
import { procurementTypes } from "@/configs/staticRecords/procurementTypes"
import { accountingActions } from "@/actions/accounting"
import PricingTabs from "./_components/shared/view/PricingTabs"
import Header from "./_components/shared/Header"
import { getTotalCostPerLbPurchased } from "./_calculations/getTotalCostPerLbPurchased"

type Props = {
  searchParams: {
    id: string
  }
}

const NewPricingExaminationPage = async ({ searchParams }: Props) => {

  // start
  const item = await inventoryActions.items.getOne(searchParams.id);

  // determine what type of pricing this is
  const isPurchased = item.procurementTypeId === procurementTypes.purchased;

  const [
    purchasedItemPricingData,
    purchasedItemLastPrice,
    finishedProducts,
    packagingItems,
  ] = await Promise.all([
    isPurchased
      ? await accountingActions.pricing.item.getItemPricingData(item.id)
      : Promise.resolve(null),
    isPurchased
      ? await accountingActions.pricing.item.getLastItemPrice(item.id)
      : Promise.resolve(null),
    isPurchased
      ? await accountingActions.finishedProducts.getByPurchasedItem(item.id)
      : Promise.resolve(null),
    await accountingActions.consumerContainers.getPackagingItems(),
  ]);

  const [
    totalCostPerLb,
  ] = await Promise.all([
    isPurchased
      ? await getTotalCostPerLbPurchased(purchasedItemLastPrice, purchasedItemPricingData)
      : Promise.resolve(0),
  ])

  return (
    <div className="flex flex-col gap-6">

      <Header />

      <StateSetter
        item={item}
        purchasedItemPricingData={purchasedItemPricingData}
        purchasedItemLastPrice={purchasedItemLastPrice}
        finishedProducts={finishedProducts}
        totalCostPerLb={totalCostPerLb}
        packagingItems={packagingItems}
      />

      <PricingTabs />


    </div>
  )
}

export default NewPricingExaminationPage
