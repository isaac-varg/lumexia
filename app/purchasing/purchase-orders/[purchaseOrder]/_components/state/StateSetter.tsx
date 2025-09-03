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
import { PurchaseOrderActivity } from "@/actions/purchasing/purchaseOrders/getActivity"

type StateSetterProps = {
  purchaseOrder: PurchaseOrderDetails,
  poWithAccounting: PoWithAccounting | null,
  orderItems: POItem[],
  files: AccountingFile[],
  internalNotes: PoInternalNote[],
  publicNotes: PoPublicNote[],
  poSupplierNotes: PoSupplierNote[],
  activity: PurchaseOrderActivity,
}

const StateSetter = ({
  purchaseOrder: serverPurchaseOrder,
  poWithAccounting,
  orderItems,
  files,
  internalNotes,
  publicNotes,
  poSupplierNotes,
  activity,
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
    setActivity,
  } = usePurchasingActions();


  useEffect(() => {
    setPurchaseOrder(serverPurchaseOrder);

    if (purchasableItems.length === 0) {
      getPurchasableItems();
      getOptions();
    }

  }, [serverPurchaseOrder, getOptions, getPurchasableItems, purchasableItems.length, setPurchaseOrder])

  useEffect(() => {

    setOrderItems(orderItems);
    setPoWithAccounting(poWithAccounting);
    setFiles(files);
    setInternalNotes(internalNotes);
    setPublicNotes(publicNotes);
    setPoSupplierNotes(poSupplierNotes);
    setActivity(activity);
  }, [purchaseOrder, activity, files, internalNotes, orderItems, poSupplierNotes, poWithAccounting, publicNotes, setActivity, setFiles, setInternalNotes, setOrderItems, setPoSupplierNotes, setPoWithAccounting, setPublicNotes])





  return false
}

export default StateSetter
