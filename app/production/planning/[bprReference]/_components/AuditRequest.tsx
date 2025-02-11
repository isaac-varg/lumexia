import React, { Dispatch, SetStateAction, useState } from 'react'

type AuditRequestProps = {
    setMode: Dispatch<SetStateAction<"default" | "request" | "audit">>
}

type InterimNote = {
    requestNoteTypeId: string
    requestNoteType: {
        bgColor: string
        textColor: string
    }
    content: string
}

const AuditRequest = ({ setMode }: AuditRequestProps) => {

    const [reqMode, setReqMode] = useState<'view' | 'add'>('view')
    const [notes, setNotes] = useState<InterimNote[]>([])

    return (
        <div>

                {reqMode === 'view' && (<div className='flex flex-col gap-y-6'>

                <div className='flex'>
                    <button className='btn' onClick={() => setReqMode('add')} >Add Note</button>
                </div>
                <h1 className='font-poppins text-xl text-neutral-700'>Notes</h1>

                <ul className='flex flex-col gap-y-4 '>
                    {notes.map((n) => {
                        const uuid = Math.random()
                        return (
                            <li
                                key={uuid}
                                className='font-poppins flex items-center justify-start text-xl gap-x-2 bg-lilac-300 rounded-xl px-2 py-2'
                            >
                                {n.content}
                            </li>
                        )
                    })}
                </ul>
            </div>
            )
            }


        </div>
    )
}

export default AuditRequest
