import React from "react";
import { flattenOrderItems } from "./_functions/flattenOrderItems";
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions";
import { getPOItems } from "./_functions/getPOItems";
import { getPurchaseOrder } from "./_functions/getPurchaseOrder";
import Header from "./_components/header/Header";
import { flattenItems } from "./_functions/flattenItems";
import { getAllItems } from "./_functions/getAllItems";
import { getOrderNotes } from "./_functions/getOrderNotes";
import { getActivity } from "./_functions/getActivity";
import { appActions } from "@/actions/app";
import { getUser } from "@/actions/users/getUser";
import { getPoWithAccountingDetails } from "@/app/accounting/pos/_actions/getPoWithAccountingDetails";
import { getAccountingFilesByPo } from "@/app/accounting/pos/_actions/getAccountingFilesByPo";
import { getAccountingFileTags } from "@/app/accounting/pos/_actions/getAccountingFileTags";
import { accountingActions } from "@/actions/accounting";
import { getAllPoAccountingStatuses } from "@/app/accounting/pos/_actions/getAllAccountingStatuses";
import { getAllAccountingNoteTypes } from "@/app/accounting/pos/_actions/getAllAccountingNoteTypes";
import TabsMain from "./_components/TabsMain";
import supplierNoteActions from "@/actions/purchasing/supplierNoteActions";

type PurchaseOrderDetailsProps = {
    searchParams: {
        id: string;
    };
};

const PurchaseOrderDetails = async ({ searchParams }: PurchaseOrderDetailsProps) => {


    const purchaseOrder = await getPurchaseOrder(searchParams.id)
    const orderItems = await getPOItems(purchaseOrder.id)
    const items = await getAllItems();
    const poStatuses = await purchaseOrderStatusActions.getAll();
    const notes = await getOrderNotes(purchaseOrder.id)
    const activity = await getActivity(purchaseOrder.id)
    const company = await appActions.configs.getByGroup('company');
    const user = await getUser();
    // for accounting
    const poWithAccounting = await getPoWithAccountingDetails(searchParams.id)
    const files = await getAccountingFilesByPo(searchParams.id)
    const fileTypes = await getAccountingFileTags();
    const allPaymentMethods = await accountingActions.paymentMethods.getAll();
    const allAccountingStatuses = await getAllPoAccountingStatuses();
    const allAccountingNoteTypes = await getAllAccountingNoteTypes();
    const supplierNotes = await supplierNoteActions.getAll({ supplierId: purchaseOrder.supplierId });



    const flattenedOrderItems = flattenOrderItems(orderItems)


    return (
        <div className="flex flex-col gap-y-6">
            <Header
                purchaseOrder={purchaseOrder}
                poStatuses={poStatuses}
                orderItems={flattenedOrderItems}
                company={company}
            />


            <TabsMain
                notes={notes}
                purchaseOrder={purchaseOrder}
                orderItems={orderItems}
                activity={activity}
                poWithAccounting={poWithAccounting}
                files={files}
                fileTypes={fileTypes}
                allMethods={allPaymentMethods}
                allAccountingNoteTypes={allAccountingNoteTypes}
                allAccountingStatuses={allAccountingStatuses}
                supplierNotes={supplierNotes}
                user={user}
                items={flattenedOrderItems}
            />


        </div >

    );
};

export default PurchaseOrderDetails;
