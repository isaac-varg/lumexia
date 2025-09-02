'use client'

import { useEffect } from "react"
import { PurchaseOrderDetails } from "../../_functions/getPurchaseOrder"
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice"
import { POItem } from "../../_functions/getPOItems"
import { PoWithAccounting } from "@/app/accounting/pos/_actions/getPoWithAccountingDetails"
import { AccountingFile } from "@/app/accounting/pos/_actions/getAccountingFilesByPo"
import { PoInternalNote } from "@/actions/purchasing/purchaseOrders/notes/interal/getAll"
import { PoPublicNote } from "@/actions/purchasing/purchaseOrders/notes/public/getAll"
import { PoSupplierNote } from "@/actions/purchasing/purchaseOrders/notes/supplier/getAll"

type StateSetterProps = {
  purchaseOrder: PurchaseOrderDetails,
  poWithAccounting: PoWithAccounting | null,
  orderItems: POItem[],
  files: AccountingFile[],
  internalNotes: PoInternalNote[],
  publicNotes: PoPublicNote[],
  poSupplierNotes: PoSupplierNote[],
}

const StateSetter = ({
  purchaseOrder: serverPurchaseOrder,
  poWithAccounting,
  orderItems,
  files,
  internalNotes,
  publicNotes,
  poSupplierNotes,
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
    setInternalNotes,
    setPublicNotes,
    setPoSupplierNotes,
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
    setInternalNotes(internalNotes);
    setPublicNotes(publicNotes);
    setPoSupplierNotes(poSupplierNotes);
  }, [purchaseOrder])





  return false
}

export default StateSetter
