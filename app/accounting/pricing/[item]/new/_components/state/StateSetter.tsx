'use client'
import { PackagingItem } from "@/actions/accounting/consumerContainers/getPackagingItems";
import { FinishedProductFromProduced } from "@/actions/accounting/finishedProducts/getByProducedItem";
import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem";
import { ItemPricingData } from "@/actions/accounting/pricing/getItemPricingData";
import { LastItemPrice } from "@/actions/accounting/pricing/getLastItemPrice";
import { Item } from "@/actions/inventory/items/getOne";
import { procurementTypes } from "@/configs/staticRecords/procurementTypes";
import { usePricingPurchasedActions } from "@/store/pricingPurchasedSlice";
import { usePricingSharedActions, } from "@/store/pricingSharedSlice";
import { useEffect } from "react";

type Props = {
  item: Item
  purchasedItemPricingData: ItemPricingData | null
  purchasedItemLastPrice: LastItemPrice | null
  finishedProducts: FinishedProductFromPurchased[] | FinishedProductFromProduced[] | null
  totalCostPerLb: number
  packagingItems: PackagingItem[]
}

const StateSetter = ({
  item,
  purchasedItemPricingData,
  purchasedItemLastPrice,
  finishedProducts,
  totalCostPerLb,
  packagingItems,
}: Props) => {

  const isPurchased = item.procurementTypeId === procurementTypes.purchased;

  const {
    setItem,
    setIsProduced,
    setFinishedProducts,
    setTotalCostPerLb,
    setProcessedFinishedProduct,
    setPackagingItems,
  } = usePricingSharedActions()


  const {
    setPricingData,
    setLastPrice,
  } = usePricingPurchasedActions()


  // shared stuff
  useEffect(() => {
    setItem(item);
    setFinishedProducts(finishedProducts);
    setTotalCostPerLb(totalCostPerLb);
    setPackagingItems(packagingItems);


    // set processed finished products to initial state
    if (finishedProducts && finishedProducts.length !== 0) {
      finishedProducts.forEach(fp => {
        setProcessedFinishedProduct(fp.id, false)
      })
    }

    // determine if isProduced
    const isProduced = item && item.procurementTypeId === procurementTypes.produced;
    setIsProduced(isProduced);



  }, [
    item, setItem,
    finishedProducts, setFinishedProducts,
  ])


  // purchased slice
  useEffect(() => {

    if (!isPurchased) return;

    setPricingData(purchasedItemPricingData);
    setLastPrice(purchasedItemLastPrice);


  }, [
    item,
    purchasedItemPricingData, setPricingData,
    purchasedItemLastPrice, setLastPrice,
  ])

  return false;

}

export default StateSetter
