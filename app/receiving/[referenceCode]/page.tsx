import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import Layout from "@/components/Layout";
import React from "react";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
import PageTitle from "@/components/Text/PageTitle";
import LineItemPanels from "./_components/LineItemPanels";
import activityLogActions from "@/actions/auxiliary/activityLogActions";
import ActivityPanel from "./_components/ActivityPanel";
import CompleteReceivingButton from "./_components/CompleteReceivingButton";
import GoToPOButton from "./_components/GoToPOButton";
import PrintLabels from "./_components/PrintLabels";
import CompletedAlert from "./_components/CompletedAlert";

type ReceivingPOPageProps = {
    searchParams: {
        id: string;
    };
};

const ReceivingPOPage = async ({ searchParams }: ReceivingPOPageProps) => {
    const poId = searchParams.id;

    const purchaseOrder = await purchaseOrderActions.getOne(poId, undefined, [
        "supplier",
        "status",
    ]);
    const items: ExPurchaseOrderItem[] = await purchaseOrderItemActions.getAll(
        {
            purchaseOrderId: poId,
        },
        ["item", "uom", "purchaseOrderStatus"],
    );

    const activity = await activityLogActions.getAll(
        { entityType: "purchaseOrder", entityId: poId },
        ["user"],
        [{ createdAt: "desc" }],
    );

    const isAwaitingItems = items.some(
        (item) => item.purchaseOrderStatus.sequence === 3,
    );

    return (
        <div className="flex flex-col gap-y-6 mt-6">
            <CompletedAlert purchaseOrder={purchaseOrder} isAwaitingItems={isAwaitingItems} />
            <Layout.Row>
                <PageTitle>
                    #{purchaseOrder.referenceCode} - {purchaseOrder.supplier.name}
                </PageTitle>
                <div className="flex gap-x-4">
                    <PrintLabels purchaseOrder={purchaseOrder} />
                    <GoToPOButton purchaseOrder={purchaseOrder} />
                    <CompleteReceivingButton
                        isAwaitingItems={isAwaitingItems}
                        purchaseOrder={purchaseOrder}
                    />
                </div>
            </Layout.Row>
            <LineItemPanels items={items} />

            <ActivityPanel activities={activity} />
        </div>
    );
};

export default ReceivingPOPage;
