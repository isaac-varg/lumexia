"use client";
import { PurchaseOrderNote } from "@/types/purchaseOrderNote";
import React from "react";
import AddNoteDialog from "./AddNoteDialog";
import SectionTitle from "@/components/Text/SectionTitle";
import ActionButton from "@/components/ActionButton";
import useDialog from "@/hooks/useDialog";
import { DateTime } from "luxon";
import Motions from "@/components/Motions";

type NotesTableProps = {
  notes: PurchaseOrderNote[];
  poId: string;
};

const NotesTable = ({ notes, poId }: NotesTableProps) => {
  const { showDialog } = useDialog();



  return (
    <div className="col-span-2">
      <AddNoteDialog poId={poId} />
        <Motions.NewDialog dialogIdentifier="createNoteDialog" ctrlPlusKey="n"/>


      <div className="flex flex-col ">
        <span className="flex justify-between items-center mb-6">
          <SectionTitle>Notes</SectionTitle>
          <ActionButton onClick={() => showDialog("createNoteDialog")}>
            Add Note
          </ActionButton>
        </span>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 ">Date</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => {
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    
                    <td className="px-6 py-4">
                      {DateTime.fromJSDate(note.createdAt).toFormat("DD @ t")}
                    </td>
                    <td className="px-6 py-4">{note.user.name}</td>
                    <td className="px-6 py-4">{note.content}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotesTable;
