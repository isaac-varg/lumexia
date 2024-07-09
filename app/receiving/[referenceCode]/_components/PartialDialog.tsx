import lotActions from "@/actions/inventory/lotActions";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import { ContainerType } from "@/types/containerType";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
import { generateLotNumber } from "@/utils/lot/generateLotNumber";
import { useForm } from "react-hook-form";
import { createContainer } from "../_functions/createContainer";
import { revalidatePage } from "@/actions/app/revalidatePage";
import useDialog from "@/hooks/useDialog";
import { updatePOItem } from "../_functions/updatePOItem";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { splitPOItem } from "../_functions/splitPOItem";

type PartialDialogProps  = {
	item: ExPurchaseOrderItem;
	containerTypes: ContainerType[];
};

interface Inputs {
	quantity: number;
	containerTypeId: string;
	containerCapacity: number;
}

const PartialDialog = ({ item, containerTypes }: PartialDialogProps) => {
	const form = useForm<Inputs>({defaultValues: {quantity: item.quantity}});
	const { resetDialogContext } = useDialog();
	const handleSubmit = async (data: Inputs) => {
		const lotNumber = generateLotNumber(item.item.referenceCode);

		const createData: any = {
			lotNumber,
			initialQuantity: data.quantity,
			itemId: item.item.id,
			uomId: item.uom.id,
		};

		const lot = await lotActions.createNew(createData);

		await createContainer(lot.id, data.containerTypeId, data.containerCapacity);
		await splitPOItem(item, data.quantity);	
		await createActivityLog(
			"receivePOItem",
			"purchaseOrder",
			item.purchaseOrderId,
			{
				context: `${item.item.name} was partially received: Received <${data.quantity} ${item.uom.abbreviation}>`,
				purchaseOrderItemId: item.id,
				quantityReceived: data.quantity,
				quantityOrdered: item.quantity,
				containerCapacity: data.containerCapacity,
				containerTypeId: data.containerTypeId,
			},
		);

		revalidatePage("/receiving/[referenceCode]");
		resetDialogContext();
	};
	return (
		<Dialog.Root identifier={`partialDialog${item.id}`}>
			<Dialog.Title>Partially Receive {item.item.name} </Dialog.Title>

			<Form.Root form={form} onSubmit={handleSubmit}>
				<Form.Number
					form={form}
					required
					fieldName={"quantity"}
					label={`Quantity (${item.uom.abbreviation})`}
				/>

				<Form.Select
					form={form}
					fieldName="containerTypeId"
					label="Container Type"
					options={containerTypes.map((ct) => ({
						value: ct.id,
						label: ct.name,
					}))}
				/>

				<Form.Number
					form={form}
					required
					fieldName="containerCapacity"
					label="Container Capacity (lbs)"
				/>

				<Form.ActionRow form={form} />
			</Form.Root>
		</Dialog.Root>
	);
};

export default PartialDialog;
