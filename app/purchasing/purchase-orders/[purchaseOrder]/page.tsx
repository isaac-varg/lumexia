import React from "react";
import { flattenOrderItems } from "./_functions/flattenOrderItems";
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions";
import { getPOItems } from "./_functions/getPOItems";
import { getPurchaseOrder } from "./_functions/getPurchaseOrder";
import Header from "./_components/header/Header";
import NotesPanel from "./_components/notes/NotesPanel";
import Totals from "./_components/Totals";
import Correspondant from "./_components/correspondant/Correspondant";
import ActivityPanelCard from "./_components/activity/ActivityPanel";
import { getAllItems } from "./_functions/getAllItems";
import { getOrderNotes } from "./_functions/getOrderNotes";
import { getActivity } from "./_functions/getActivity";
import { appActions } from "@/actions/app";
import { getUser } from "@/actions/users/getUser";
import AccountingPanel from "./_components/accounting/AccountingPanel";
import { getPoWithAccountingDetails } from "@/app/accounting/pos/_actions/getPoWithAccountingDetails";
import { getAccountingFilesByPo } from "@/app/accounting/pos/_actions/getAccountingFilesByPo";
import { getAccountingFileTags } from "@/app/accounting/pos/_actions/getAccountingFileTags";
import { accountingActions } from "@/actions/accounting";
import { getAllPoAccountingStatuses } from "@/app/accounting/pos/_actions/getAllAccountingStatuses";
import { getAllAccountingNoteTypes } from "@/app/accounting/pos/_actions/getAllAccountingNoteTypes";
import TabSelector from "./_components/shared/TabSelector";
import TabsContainer from "./_components/shared/TabsContainer";
import StateSetter from "./_components/state/StateSetter";

type PurchaseOrderDetailsProps = {
  searchParams: {
    id: string;
  };
};

const PurchaseOrderDetails = async ({ searchParams }: PurchaseOrderDetailsProps) => {

  const purchaseOrder = await getPurchaseOrder(searchParams.id)

  const [
    orderItems,
  ] = await Promise.all([
    await getPOItems(purchaseOrder.id)
  ])


  const notes = await getOrderNotes(purchaseOrder.id)
  const activity = await getActivity(purchaseOrder.id)
  const user = await getUser();
  // for accounting
  const poWithAccounting = await getPoWithAccountingDetails(searchParams.id)
  const files = await getAccountingFilesByPo(searchParams.id)
  const fileTypes = await getAccountingFileTags();
  const allPaymentMethods = await accountingActions.paymentMethods.getAll();
  const allAccountingStatuses = await getAllPoAccountingStatuses();
  const allAccountingNoteTypes = await getAllAccountingNoteTypes();


  return (
    <div className="flex flex-col gap-y-6">

      <StateSetter
        purchaseOrder={purchaseOrder}
        orderItems={orderItems}
      />

      <Header />


      <TabSelector />
      <TabsContainer />


      {/*     
 <Header
        purchaseOrder={purchaseOrder}
        poStatuses={poStatuses}
        orderItems={flattenedOrderItems}
        company={company}
      />


      <div className="grid grid-cols-2 gap-4">
        <NotesPanel
          notes={notes}
          poId={purchaseOrder.id}
        />
        <Totals purchaseOrderItems={orderItems} />

        <Correspondant purchaseOrder={purchaseOrder} />
        <ActivityPanelCard activity={activity} />


        <AccountingPanel accounting={poWithAccounting} files={files} fileTypes={fileTypes} allMethods={allPaymentMethods} allAccountingNoteTypes={allAccountingNoteTypes} allAccountingStatuses={allAccountingStatuses} />
      </div>

*/}








    </div>

  );
};

export default PurchaseOrderDetails;
