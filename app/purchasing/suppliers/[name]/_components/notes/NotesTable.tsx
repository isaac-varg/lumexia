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
import NoteEditForm from "./NoteEditForm";

const NotesTable = ({
	data,
	supplier,
}: {
	data: SupplierNote[];
	supplier: Supplier;
}) => {
	const { showDialog } = useDialog();

	const handleNoteDelete = (note: SupplierNote) => {
		supplierNoteActions.deleteOne({ id: note.id });
		revalidatePage("/purchasing/suppliers/[name]");
		createActivityLog("deleteSupplierNote", "supplier", supplier.id, {
			context: `Note with following content was deleted: ${note.content}`,
		});
	};

	const handleRowClick = (note: SupplierNote) => {
		showDialog(`updateNote${note.id}`);
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

				<div>
					{data.map((note) => {
						return (
							<div
								onClick={() => handleRowClick(note)}
								key={note.id}
								className=" ml-4 rounded-lg flex flex-row items-center gap-x-2 hover:bg-cararra-100 hover:cursor-pointer py-1 px-2"
							>
								<NoteEditForm supplier={supplier} note={note} />

								<div className="h-2 w-2 rounded-full bg-cararra-900" />
								<p className="font-inter">{note.content} </p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default NotesTable;
