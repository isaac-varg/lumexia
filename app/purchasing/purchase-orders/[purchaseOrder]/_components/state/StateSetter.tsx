'use client'

import { useEffect } from "react"
import { PurchaseOrderDetails } from "../../_functions/getPurchaseOrder"
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice"
import { POItem } from "../../_functions/getPOItems"

type StateSetterProps = {
  purchaseOrder: PurchaseOrderDetails,
  orderItems: POItem[],
}

const StateSetter = ({
  purchaseOrder: serverPurchaseOrder,
  orderItems,
}: StateSetterProps) => {

  const {
    purchasableItems,
    purchaseOrder,
  } = usePurchasingSelection();
  const {
    getPurchasableItems,
    getOptions,
    setOrderItems,
    setPurchaseOrder,
  } = usePurchasingActions();


  useEffect(() => {
    setPurchaseOrder(serverPurchaseOrder);

    if (purchasableItems.length === 0) {
      getPurchasableItems();
      getOptions();
    }

  }, [serverPurchaseOrder])

  useEffect(() => {

    setOrderItems(orderItems);
  }, [purchaseOrder])





  return false
}

export default StateSetter
