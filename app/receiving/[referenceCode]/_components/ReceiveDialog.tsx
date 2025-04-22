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
import lotOriginActions from "@/actions/inventory/lotOriginActions";
import { Lot } from "@/types/lot";
import { staticRecords } from "@/configs/staticRecords";
import { toInventoryUom } from "@/utils/uom/toInventoryUom";
import { updateConnectedRequests } from "../_functions/updateConnectedRequests";
import { accountingActions } from "@/actions/accounting";

type ReceiveDialogProps = {
    item: ExPurchaseOrderItem;
    containerTypes: ContainerType[];
};

interface Inputs {
    quantity: number;
    containerTypeId: string;
    containerCapacity: number;
}

const ReceiveDialog = ({ item, containerTypes }: ReceiveDialogProps) => {
    const form = useForm<Inputs>({ defaultValues: { quantity: item.quantity } });
    const { resetDialogContext } = useDialog();

    const handleSubmit = async (data: Inputs) => {
        const lotNumber = generateLotNumber(item.item.referenceCode);

        let quantity = data.quantity;
        if (item.uom.id !== staticRecords.inventory.uom.lb) {
            const convertedQuantity = await toInventoryUom(item.uom.id, data.quantity);
            quantity = convertedQuantity;
        }

        const createData: any = {
            lotNumber,
            initialQuantity: quantity,
            itemId: item.item.id,
            uomId: staticRecords.inventory.uom.lb,
        };

        const lot: Lot = await lotActions.createNew(createData);

        await createContainer(lot.id, data.containerTypeId, data.containerCapacity, item.uomId);
        await updatePOItem(item.id, {
            purchaseOrderStatusId: "db907b0f-4aac-42d7-9118-ee35e178d9b3",
        });
        await createActivityLog(
            "receivePOItem",
            "purchaseOrder",
            item.purchaseOrderId,
            {
                context: `${item.item.name} was fully received: Ordered <${item.quantity} ${item.uom.abbreviation}>; Received <${data.quantity} ${item.uom.abbreviation}>`,
                purchaseOrderItemId: item.id,
                quantityReceived: data.quantity,
                quantityOrdered: item.quantity,
                containerCapacity: data.containerCapacity,
                containerTypeId: data.containerTypeId,
                lotCreated: lot.id,
            },
        );

        // create lot origin entry
        const originCreateData = {
            lotId: lot.id,
            purchaseOrderId: item.purchaseOrderId,
            originType: 'purchaseOrderReceiving'
        }

        // add to pricing queue
        //
        await accountingActions.pricing.createQueue({
            itemId: item.item.id,
            isCompleted: false,
        })

        await lotOriginActions.createNew(originCreateData)
        await updateConnectedRequests(item.purchaseOrderId, item.item.id)

        revalidatePage("/receiving/[referenceCode]");
        resetDialogContext();
    };
    return (
        <Dialog.Root identifier={`receiveDialog${item.id}`}>
            <Dialog.Title>Receive {item.item.name} </Dialog.Title>

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
                    label={`Container Capacity ${item.uom.abbreviation}`}
                />

                <Form.ActionRow form={form} />
            </Form.Root>
        </Dialog.Root>
    );
};

export default ReceiveDialog;
