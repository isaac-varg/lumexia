'use client'
import React from 'react'
import { Command } from './CommandType'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRouter } from 'next/navigation'
import { useCommandPalletActions } from '@/store/commandPalletSlice'

// i am sure this is a really expensive component. 
// perhaps I should change this up

const CommandButton = ({ command, index }: { command: Command, index: number }) => {
    const isFirst = index === 0
    const router = useRouter()
    const { togglePallet } = useCommandPalletActions()


    const handleSelect = () => {

        if (command.path) {
            router.push(command.path);
            togglePallet()

            return;
        }

        console.log('no path set')
    }

    useHotkeys(
        'space',
        (event) => {
            if (isFirst) {
                event.preventDefault()
                handleSelect()

            }
        },
        { enableOnFormTags: true, preventDefault: true }
    )

    useHotkeys(
        command.shortcut || '',
        (event) => {
            event.preventDefault()
            handleSelect()
        },
        { enableOnFormTags: true, preventDefault: true },
        [command.shortcut]
    )


    return (
        <div
            className={`flex justify-between items-center px-2 py-3 rounded-lg  hover:bg-lilac-200 hover:cursor-pointer ${isFirst ? 'bg-lilac-200' : 'bg-white'}`}
            onClick={handleSelect}
        >
            <div className='flex gap-x-2 items-center'>
                <span className='text-lg text-slate-800'>{command.icon}</span>
                <h2 className='font-poppins text-base text-slate-800 '>{command.label}</h2>
            </div>

            <kbd className="kbd kbd-sm">{(isFirst && !command.shortcut) ? 'space' : command.shortcut}</kbd>

        </div>
    )
}

export default CommandButton
