'use client'
import React from 'react'
import { Command } from './CommandType'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRouter } from 'next/navigation'
import { useCommandPalletActions } from '@/store/commandPalletSlice'


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

    useHotkeys('ctrl+', (e) => {
        e.preventDefault
        e.stopPropagation
        if (isFirst) {
            handleSelect()
        }
    }, { enableOnFormTags: ['input', 'INPUT'] })


    return (
        <div
            className={`flex justify-between items-center px-2 py-3 rounded-lg  hover:bg-lilac-200 hover:cursor-pointer ${isFirst ? 'bg-lilac-200' : 'bg-white'}`}
            onClick={handleSelect}
        >
            <div className='flex gap-x-2 items-center'>
                <span className='text-lg text-slate-800'>{command.icon}</span>
                <h2 className='font-poppins text-base text-slate-800 '>{command.label}</h2>
            </div>

            <kbd className="kbd kbd-sm">{command.shortcut}</kbd>

        </div>
    )
}

export default CommandButton
