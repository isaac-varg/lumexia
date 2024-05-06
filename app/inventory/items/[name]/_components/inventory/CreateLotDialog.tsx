import { revalidatePage } from "@/actions/app/revalidatePage";
import lotActions from "@/actions/inventory/lotActions";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { ContainerType } from "@/types/containerType";
import { Item } from "@/types/item";
import { generateLotNumber } from "@/utils/lot/generateLotNumber";
import React from "react";
import { useForm } from "react-hook-form";
import { createContainer } from "../../_functions/createContainer";

interface Inputs {
  lotNumber: string;
  initialQuantity: number;
  amountOfContainers: number;
  containerTypeId: string;
  containerCapacity: number;
}

const CreateLotDialog = ({
  item,
  containerTypes,
}: {
  item: Item;
  containerTypes: ContainerType[];
}) => {
  const form = useForm<Inputs>();
  const { resetDialogContext } = useDialog();

  const handleSubmit = async (data: Inputs) => {
    const createData: any = {
      lotNumber: data.lotNumber,
      initialQuantity: data.initialQuantity,
      itemId: item.id,
      uomId: "68171f7f-3ac0-4a3a-b197-18742ebf6b5b", // TODO get uomId from db rather than seed
    };

    const newLot = await lotActions.createNew(createData);

    for (let index = 0; index <= data.amountOfContainers; index++) {
      createContainer(newLot.id, data.containerTypeId, data.containerCapacity);
      index++;
    }

    resetDialogContext();
    revalidatePage("inventory/items/[name]");
  };

  return (
    <Dialog.Root identifier="createLot">
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Text
          form={form}
          fieldName="lotNumber"
          label="Lot Number"
          required={true}
        />
        <p className="font-inter text-md ">
          Suggested Lot: {generateLotNumber(item.referenceCode)}
        </p>
        <Form.Number
          form={form}
          fieldName="initialQuantity"
          label="Initial Quantity"
          required={true}
        />
        <Form.Number
          form={form}
          fieldName="amountOfContainers"
          label="Amount of Containers"
          required={true}
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
          fieldName="containerCapacity"
          label="Container Capacity"
          required={true}
        />
        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  );
};

export default CreateLotDialog;
