import { SupplierContactNote } from "@/types/supplierContactNote";
import React from "react";
import EditNote from "./EditNote";
import useDialog from "@/hooks/useDialog";

const ContactNote = ({ note, supplierId }: { note: SupplierContactNote , supplierId: string}) => {
  const { showDialog } = useDialog();
  const handleEditNote = (event: any) => {
    event.stopPropagation();
    showDialog(`addContactNote${note.id}`);
  };

  return (
    <>
      <EditNote note={note} supplierId={supplierId} />
      <div
        onClick={(event) => handleEditNote(event)}
        className=" ml-4 rounded-lg flex flex-row items-center gap-x-2 hover:bg-cararra-100 hover:cursor-pointer py-1 px-2"
      >
        <div className="h-2 w-2 rounded-full bg-cararra-900" />
        <p className="font-inter">{note.content} </p>
      </div>
    </>
  );
};

export default ContactNote;
