import React from "react";
import ScanPanel from "./_components/ScanPanel";
import PageTitle from "@/components/Text/PageTitle";

const ScanPage  = () => {
	return (
		<div>
			<PageTitle>Inventory Audit</PageTitle>
			<ScanPanel />
		</div>
	);
};

export default ScanPage;
