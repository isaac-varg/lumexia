import Card from "@/components/Card";
import { SupplierContact } from "@prisma/client";
import React from "react";
import ContactsAddNewForm from "./ContactsAddNewForm";
import ContactsTitle from "./ContactsTitle";
import ContactCard from "./ContactCard";

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
