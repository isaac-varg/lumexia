'use client'

import { useEffect } from "react"
import { PurchaseOrderDetails } from "../../_functions/getPurchaseOrder"
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice"
import { POItem } from "../../_functions/getPOItems"
import { PoWithAccounting } from "@/app/accounting/pos/_actions/getPoWithAccountingDetails"
import { AccountingFile } from "@/app/accounting/pos/_actions/getAccountingFilesByPo"

type StateSetterProps = {
  purchaseOrder: PurchaseOrderDetails,
  poWithAccounting: PoWithAccounting | null,
  orderItems: POItem[],
  files: AccountingFile[],
}

const StateSetter = ({
  purchaseOrder: serverPurchaseOrder,
  poWithAccounting,
  orderItems,
  files,
}: StateSetterProps) => {

  const {
    purchasableItems,
    purchaseOrder,
  } = usePurchasingSelection();
  const {
    getPurchasableItems,
    getOptions,
    setOrderItems,
    setPoWithAccounting,
    setPurchaseOrder,
    setFiles,
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
    setPoWithAccounting(poWithAccounting);
    setFiles(files);
  }, [purchaseOrder])





  return false
}

export default StateSetter
