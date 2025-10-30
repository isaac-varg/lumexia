import lotOriginActions from "@/actions/inventory/lotOriginActions";
import { PurchaseOrder } from "@/types/purchaseOrder";
import React from "react";
import PrintLabelsButton from "./PrintLabelsButton";

const PrintLabels = async ({ purchaseOrder }: { purchaseOrder: PurchaseOrder }) => {
	const lotOrigins = await lotOriginActions.getPurchasingLotOrigins(purchaseOrder.id);

  return <div>
		<PrintLabelsButton lotOrigins={lotOrigins as any} />
	</div>;
};

export default PrintLabels;
