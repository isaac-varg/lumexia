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
import { flattenItems } from "./_functions/flattenItems";
import { getAllItems } from "./_functions/getAllItems";
import { getOrderNotes } from "./_functions/getOrderNotes";
import { getActivity } from "./_functions/getActivity";
import ViewMode from "./_components/viewMode/ViewMode";
import { appActions } from "@/actions/app";

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

    const flattenedOrderItems = flattenOrderItems(orderItems)


    return (
        <div className="flex flex-col gap-y-6">
            <Header
                purchaseOrder={purchaseOrder}
                poStatuses={poStatuses}
                orderItems={flattenedOrderItems}
                company={company}
            />

            <ViewMode
                purchaseOrder={purchaseOrder}
                orderItems={flattenedOrderItems}
                items={flattenItems(items)}

            />

           


            <div className="grid grid-cols-2 gap-4">
                <NotesPanel
                    notes={notes}
                    poId={purchaseOrder.id}
                />
                <Totals purchaseOrderItems={orderItems} />

                <ActivityPanelCard activity={activity} />
                <Correspondant purchaseOrder={purchaseOrder} />
            </div>









        </div>

    );
};

export default PurchaseOrderDetails;
