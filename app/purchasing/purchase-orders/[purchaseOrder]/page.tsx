import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import PageTitle from "@/components/Text/PageTitle";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { DateTime } from "luxon";
import React from "react";
import { LuCalendarPlus } from "react-icons/lu";
import ItemTable from "./_components/ItemTable";
import { flattenOrderItems } from "./_functions/flattenOrderItems";
import itemActions from "@/actions/inventory/items";
import { flattenItems } from "./_functions/flattenItems";
import Correspondant from "./_components/Correspondant";
import TagLabel from "@/components/Text/TagLabel";
import Totals from "./_components/Totals";
import NotesTable from "./_components/NotesTable";
import purchaseOrderNoteActions from "@/actions/purchasing/purchaseOrderNoteActions";
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions";
import NextStatusButton from "./_components/NextStatusButton";
import PrintButton from "./_components/PrintButton";
import StatusTag from "./_components/StatusTag";
import { ActivityPanel } from "@/components/Panels/Activity";
import activityLogActions from "@/actions/auxiliary/activityLogActions";
import SectionTitle from "@/components/Text/SectionTitle";
import PreviousStatusButton from "./_components/PreviousStatusButton";
import GoToReceivingButton from "./_components/GoToReceivingButton";
import Separator from "@/components/Separator/Separator";

type PurchaseOrderDetailsProps = {
	params: {
		purchaseOrder: string;
	};
	searchParams: {
		id: string;
	};
};

const PurchaseOrderDetails = async ({
	params,
	searchParams,
}: PurchaseOrderDetailsProps) => {
	const purchaseOrder: PurchaseOrder = await purchaseOrderActions.getOne(
		searchParams.id,
		undefined,
		["supplier", "user", "status"],
	);

	const orderItems = await purchaseOrderItemActions.getAll(
		{
			purchaseOrderId: purchaseOrder.id,
		},
		["item", "uom", "purchaseOrderStatus"],
	);

	const items = await itemActions.getAllWithIncludes(["aliases"]);

	const notes = await purchaseOrderNoteActions.getAll(
		{
			purchaseOrderId: purchaseOrder.id,
		},
		["user"],
	);

	const poStatuses = await purchaseOrderStatusActions.getAll();

	const activity = await activityLogActions.getAll(
		{ entityType: "purchaseOrder", entityId: purchaseOrder.id },
		["user"],
		[{ createdAt: "desc" }],
	);

	return (
		<div className="flex flex-col gap-y-6">
			<div>
				<span className="flex flex-row justify-between">
					<div className="flex flex-row items-center justify-start gap-x-4 mt-4 mb-4">
						<PageTitle title={`PO #${purchaseOrder.referenceCode}`} />

						<StatusTag purchaseOrder={purchaseOrder} />
					</div>

					<div className="flex flex-row items-center justify-start gap-x-8">
						<div className="flex gap-x-4">
							<PreviousStatusButton
								poStatuses={poStatuses}
								currentStatusSequence={purchaseOrder.status.sequence}
								purchaseOrderId={purchaseOrder.id}
							/>
							<NextStatusButton
								poStatuses={poStatuses}
								currentStatusSequence={purchaseOrder.status.sequence}
								purchaseOrderId={purchaseOrder.id}
							/>
						</div>
						<Separator />
						<div className="flex gap-x-4">
							<GoToReceivingButton purchaseOrder={purchaseOrder} />
							<PrintButton
								purchaseOrder={purchaseOrder}
								orderItems={orderItems}
							/>
						</div>
					</div>
				</span>
				{/*       <span className="flex fle11x-row gap-x-2 items-center text-sm text-neutral-500 font-poppins">
          <LuCalendarPlus />
          <p>
            {DateTime.fromJSDate(purchaseOrder.createdAt).toFormat("DD @ t")}
          </p>
        </span> */}
			</div>

			<div className="grid grid-cols-3 gap-x-4 ">
				<Correspondant purchaseOrder={purchaseOrder} />

				<div className="col-span-2">
					<ItemTable
						purchaseOrder={purchaseOrder}
						orderItems={flattenOrderItems(orderItems)}
						items={flattenItems(items)}
					/>

					<span className="grid grid-cols-3 gap-x-4 mt-12 mb-12">
						<NotesTable notes={notes} poId={purchaseOrder.id} />
						<Totals purchaseOrderItems={orderItems} />
					</span>

					<div className="flex flex-col gap-y-4">
						<SectionTitle>Activity Log</SectionTitle>
					</div>
				</div>
			</div>
			<ActivityPanel activities={activity} />

		</div>
	);
};

export default PurchaseOrderDetails;
