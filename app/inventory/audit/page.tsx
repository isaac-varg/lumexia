import React from "react";
import ScanPanel from "./_components/ScanPanel";
import PageTitle from "@/components/Text/PageTitle";
import RequestsPanel from "./_components/RequestsPanel";
import { inventoryActions } from "@/actions/inventory";

const ScanPage  = async () => {


    const requests = await inventoryActions.auditReqests.getAll();
	return (
		<div>
			<PageTitle>Inventory Audit</PageTitle>

            <div className="flex flex-col gap-y-6">
			<ScanPanel />

            <RequestsPanel requests={requests} />

            </div>
		</div>
	);
};

export default ScanPage;
