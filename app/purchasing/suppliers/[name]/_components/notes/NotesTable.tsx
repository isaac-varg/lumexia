"use client";
import Table from "@/components/Table";
import { SupplierNote } from "@/types/SupplierNote";
import { DateTime } from "luxon";
import React from "react";
import NotesForm from "./NotesForm";
import useDialog from "@/hooks/useDialog";
import ActionButton from "@/components/ActionButton";
import { Supplier } from "@/types/supplier";
import SectionTitle from "@/components/Text/SectionTitle";
import Card from "@/components/Card";
import { TbPlus, TbX } from "react-icons/tb";
import supplierNoteActions from "@/actions/purchasing/supplierNoteActions";
import { revalidatePage } from "@/actions/app/revalidatePage";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

const NotesTable = ({
	data,
	supplier,
}: {
	data: SupplierNote[];
	supplier: Supplier;
}) => {
	const { showDialog } = useDialog();
	const headers = ["Created At", "Content", ""];

	const handleNoteDelete = (note: SupplierNote) => {
		supplierNoteActions.deleteOne({id: note.id} );
		revalidatePage("/purchasing/suppliers/[name]");
		createActivityLog("deleteSupplierNote", "supplier", supplier.id, {context: `Note with following content was deleted: ${note.content}`});
	};

	const notes = data.map((note) => {
		return [
			DateTime.fromJSDate(note.createdAt).toFormat("DD @t"),
			note.content,
			<ActionButton key={note.id} onClick={() => handleNoteDelete(note)} color="alert" ><TbX /></ActionButton>,
		];
	});

	const handleRowClick = () => {
		console.log("clicked");
	};

	return (
		<>
			<NotesForm supplier={supplier} />

			<div className="flex flex-col gap-y-4">
				<span className="flex justify-between">
					<Card.Title size="small">Notes</Card.Title>

					<ActionButton onClick={() => showDialog("createNote")}>
						<TbPlus />
					</ActionButton>
				</span>

				<Table.Root
					headers={headers}
					data={notes}
					onRowClick={handleRowClick}
				/>
			</div>
		</>
	);
};

export default NotesTable;
