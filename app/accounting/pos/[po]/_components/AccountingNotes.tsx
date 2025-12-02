'use client'

import { useState } from "react";
import { AccountingNote } from "../../_actions/getAllAccountingNotes";
import { PoAccountingNoteType } from "@prisma/client";
import { NoteTypeInputs } from "@/components/Notes/CreateNoteTypeForm";
import { NoteInputs } from "@/components/Notes/NotesAddMode";
import { useRouter } from "next/navigation";
import { getUserId } from "@/actions/users/getUserId";
import Card from "@/components/Card";
import NotesManager from "@/components/Notes/NotesManager";
import { createAccountingNoteType } from "../../_actions/createAccountingNoteType";
import { createAccountingNote } from "../../_actions/createAccountingNote";

const AccountingNotes = ({ notes, noteTypes, poId }: { notes: AccountingNote[], noteTypes: PoAccountingNoteType[], poId: string }) => {


  const router = useRouter()
  const handleNoteTypeAdd = async (data: NoteTypeInputs) => {
    await createAccountingNoteType(data);
    router.refresh()
  }

  const handleNoteAdd = async (data: NoteInputs) => {
    const userId = await getUserId()
    await createAccountingNote({
      ...data,
      purchaseOrderId: poId,
      userId,
    })
    router.refresh()
  }


  return (
    <Card.Root>
      <NotesManager<AccountingNote, PoAccountingNoteType>
        notes={notes}
        noteTypes={noteTypes}
        onNoteAdd={handleNoteAdd}
        onNoteTypeAdd={handleNoteTypeAdd}
      />
    </Card.Root>
  )
}

export default AccountingNotes
