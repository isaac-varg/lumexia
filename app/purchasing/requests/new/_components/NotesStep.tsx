import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import NoteForm from './NoteForm';
import { RequestNoteType, getNoteTypes } from '../../[referenceCode]/_functions/getNoteTypes';
import CreateNoteTypeForm from './NewNoteTypeForm';
import { InterimNote } from './MainPanel';

type NotesStepProps = {
    nextStep: () => void;
    currentStep: number
    setNotes: Dispatch<SetStateAction<InterimNote[]>>
    notes: InterimNote[]
}



const NotesStep = ({ nextStep, currentStep, setNotes, notes }: NotesStepProps) => {
    const [mode, setMode] = useState<'addNoteType' | 'default' | 'show'>('default');

    const isCurrent = currentStep === 2

    const [types, setTypes] = useState<RequestNoteType[] | null>()

    useEffect(() => {
        const getter = async () => {
            const types = await getNoteTypes();
            setTypes(types)
        }

        getter()
    }, [isCurrent, mode])

    if (!types) {
        return <div className='skeleton' />
    }

    if (currentStep !== 2) { return null }

    return (
        <div className='flex flex-col gap-y-8'>
            <div className="flex justify-start items-center">
            </div>


            {mode === 'default' && <NoteForm types={types} setNotes={setNotes} setMode={setMode} />}

            {mode === 'addNoteType' && <CreateNoteTypeForm setMode={setMode} />}

            {mode === 'show' && (<div className='flex flex-col gap-y-6'>

                <div className='flex'>
                    <button className='btn' onClick={() => setMode('default')} >Add Note</button>
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

            {mode === 'show' && <div className='flex justify-end'>
                <button className='btn btn-accent ' onClick={() => nextStep()}>Continue</button>
            </div>}

        </div >
    )
}

export default NotesStep
