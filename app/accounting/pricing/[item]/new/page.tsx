import { inventoryActions } from "@/actions/inventory"
import StateSetter from "./_components/state/StateSetter"
import { procurementTypes } from "@/configs/staticRecords/procurementTypes"
import { accountingActions } from "@/actions/accounting"
import Purchased from "./_components/purchased/Purchased"
import PageTitle from "@/components/Text/PageTitle"

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
  ] = await Promise.all([
    isPurchased
      ? accountingActions.pricing.item.getItemPricingData(item.id)
      : Promise.resolve(null),
    isPurchased
      ? await accountingActions.pricing.item.getLastItemPrice(item.id)
      : Promise.resolve(null),
    isPurchased
      ? await accountingActions.finishedProducts.getByPurchasedItem(item.id)
      : Promise.resolve(null),


  ]); return (
    <div className="flex flex-col gap-6">
      <PageTitle>{`Pricing Determination - ${item.name}`}</PageTitle>

      <StateSetter
        item={item}
        purchasedItemPricingData={purchasedItemPricingData}
        purchasedItemLastPrice={purchasedItemLastPrice}
        finishedProducts={finishedProducts}
      />

      {isPurchased && <Purchased />}
      {!isPurchased && <div>produced</div>}

    </div>
  )
}

export default NewPricingExaminationPage
