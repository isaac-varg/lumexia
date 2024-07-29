"use client";
import { revalidatePage } from "@/actions/app/revalidatePage";
import supplierContactActions from "@/actions/purchasing/supplierContactActions";
import ActionButton from "@/components/ActionButton";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import useDialog from "@/hooks/useDialog";
import { SupplierContact } from "@/types/supplierContact";
import { SupplierContactNote } from "@/types/supplierContactNote";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import React from "react";
import { useForm } from "react-hook-form";
import { TbDeviceFloppy, TbTrashX } from "react-icons/tb";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
}

const EditContactForm = ({ contact }: { contact: SupplierContact }) => {
  const form = useForm<Inputs>({ defaultValues: { ...contact } });
  const { resetDialogContext } = useDialog();
  const handleSubmit = async (data: Inputs) => {
    const createData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      type: data.type,
    };

    const contactResponse = await supplierContactActions.update(
      { id: contact.id },
      createData,
    );

    await createActivityLog(
      "addSupplierContact",
      "supplier",
      contact.supplierId,
      {
        context: `Contact ${data.firstName} ${data.lastName} was added.`,
        contactId: contactResponse.id,
      },
    );
    resetDialogContext();
    revalidatePage("/purchasing/suppliers/[name]");
  };

  const handleDelete = async () => {
    await supplierContactActions.deleteOne({ id: contact.id });

    await createActivityLog(
      "removeSupplierContact",
      "supplier",
      contact.supplierId,
      {
        context: `Contact ${contact.firstName} ${contact.lastName} was removed.`,
      },
    );
    resetDialogContext();
    revalidatePage("/purchasing/suppliers/[name]");
  };

  return (
    <Dialog.Root identifier={`editContact${contact.id}`}>
      <Layout.Row justify="end">
        <ActionButton color="alert" onClick={() => handleDelete()}>
          <TbTrashX className="text-xl" />
        </ActionButton>
      </Layout.Row>
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Text
          form={form}
          label="First Name"
          fieldName="firstName"
          required
        />
        <Form.Text
          form={form}
          label="Last Name"
          fieldName="lastName"
          required
        />

        <Form.Text form={form} label="Email" fieldName="email" required />

        <Form.Text form={form} label="Phone" fieldName="phone" required />
        <Form.Text form={form} label="Type" fieldName="type" required />
        <div className="flex justify-end">
          <ActionButton buttonType="submit">
            <TbDeviceFloppy className="text-xl" />
          </ActionButton>
        </div>
      </Form.Root>
    </Dialog.Root>
  );
};

export default EditContactForm;
