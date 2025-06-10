"use client";

import { revalidatePage } from "@/actions/app/revalidatePage";
import supplierContactActions from "@/actions/purchasing/supplierContactActions";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { SupplierContact } from "@/types/supplierContact";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import React from "react";
import { useForm } from "react-hook-form";

interface Inputs {
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    type?: string;
}

const ContactsAddNewForm = ({ supplierId }: { supplierId: string }) => {
    const form = useForm<Inputs>();
    const { resetDialogContext } = useDialog()
    const handleSubmit = async (data: Inputs) => {

        const createData = {
            supplierId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            type: data.type,
        }

        const contactResponse = await supplierContactActions.createNew(createData);
        resetDialogContext();
        createActivityLog("addSupplierContact", "supplier", supplierId, { context: `Contact ${data.firstName} ${data.lastName} was added.`, contactId: contactResponse.id })
        revalidatePage("/purchasing/suppliers/[name]");
    };

    return (
        <Dialog.Root identifier={`addNewContact`}>
            <Form.Root form={form} onSubmit={handleSubmit}>
                <Form.Text
                    form={form}
                    label="Name"
                    fieldName="firstName"
                    required
                />
                <Form.Text
                    form={form}
                    label="Last Name"
                    fieldName="lastName"
                    required={false}
                />
                <Form.Text form={form} label="Email" fieldName="email" required={false} />

                <Form.Text form={form} label="Phone" fieldName="phone" required={false} />
                <Form.Text form={form} label="Type" fieldName="type" required={false} />
                <Form.ActionRow form={form} />
            </Form.Root>
        </Dialog.Root>
    );
};

export default ContactsAddNewForm;
