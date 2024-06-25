import React from "react";
import PageTitle from "@/components/Text/PageTitle";
import lotActions from "@/actions/inventory/lotActions";
import AuditPanel from "./_components/AuditPanel";
import Layout from "@/components/Layout";
import BackButton from "./_components/BackButton";

type AuditPageProps = {
	params: {
		lotId: string;
	};
};

const AuditPage = async ({ params }: AuditPageProps) => {
	const lot = await lotActions.getOne(params.lotId);
	const allLots = (await lotActions.getByItem(lot.itemId)) as any;

	return (
		<div className="flex flex-col gap-y-8">
			<Layout.Row justify="between">
			<PageTitle>Inventory Audit</PageTitle>
				<BackButton />
						</Layout.Row>
			<AuditPanel allLots={allLots} />
		</div>
	);
};

export default AuditPage;
