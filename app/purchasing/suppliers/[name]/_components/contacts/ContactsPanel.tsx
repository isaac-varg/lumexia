import Card from "@/components/Card";
import React from "react";
import ContactsAddNewForm from "./ContactsAddNewForm";
import ContactsTitle from "./ContactsTitle";
import ContactCard from "./ContactCard";
import { SupplierContact } from "@/types/supplierContact";

const ContactsPanel = ({
    contacts,
    supplierId,
}: {
    contacts: SupplierContact[];
    supplierId: string;
}) => {
    return (
        <Card.Root>

            <ContactsAddNewForm supplierId={supplierId} />

            <ContactsTitle />
            <div className="flex gap-4 overflow-x-auto">

                {contacts.map((contact) => (

                    <div key={contact.id} className="min-w-[400px]">
                        <ContactCard contact={contact} supplierId={supplierId} />
                    </div>
                ))}
            </div>
        </Card.Root>
    );
};

export default ContactsPanel;
