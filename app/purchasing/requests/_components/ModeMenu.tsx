import React, { Dispatch, SetStateAction } from 'react'


type RequestModes = "table" | "calendar"

type ModeMenuProps = {
    setMode: Dispatch<SetStateAction<"table" | "calendar">>
    mode: RequestModes
}

const ModeMenu = ({ setMode, mode }: ModeMenuProps) => {

    const ModeMenuButton = ({ value, label }: { value: RequestModes, label: string }) => {
        const isActive = mode === value;

        return (
            <button className={`btn ${isActive ? 'bg-green-200' : ''}`}  onClick={() => setMode(value)} >{label}</button>
        )
    }

    return (
        <div className='flex flex-row justify-start gap-4'>
            <ModeMenuButton value='table' label="Table" />
            <ModeMenuButton value='calendar' label='Calendar' />
        </div>
    )
}



export default ModeMenu
