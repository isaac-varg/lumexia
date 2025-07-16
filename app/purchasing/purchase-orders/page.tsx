import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import React from "react";
import { flattenPurchaseOrders } from "./_functions/flattenPurchaseOrders";
import PurchaseOrderTable from "./_components/PurchaseOrderTable";
import NewPurchaseOrderDialog from "./_components/NewPurchaseOrderDialog";
import { getPurchaseOrdersForDashboard } from "./_functions/getPurchaseOrders";

const PurchasingPage = async () => {
    
    const purchaseOrders = await getPurchaseOrdersForDashboard();

    return (
        <div>
            <PurchaseOrderTable purchaseOrders={purchaseOrders} />

            <NewPurchaseOrderDialog />
        </div>
    );
};

export default PurchasingPage;
