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
		<>
			<ContactsAddNewForm supplierId={supplierId} />
			<Card.Root>
				<ContactsTitle />


				{contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)}
			</Card.Root>
		</>
	);
};

export default ContactsPanel;
