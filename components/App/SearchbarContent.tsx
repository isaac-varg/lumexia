'use client'

import { useCommandPalletActions } from '@/store/commandPalletSlice'
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'


const SearchbarContent = () => {

    const { togglePallet } = useCommandPalletActions()

    const handleClick = () => {
        togglePallet()
    }
    return (
        <div className="flex gap-x-4 items-center text-neutral-400" onClick={handleClick}>
            <span className="text-2xl"><BiSearchAlt /></span>
            <span className="text-md font-medium font-poppins">CTRL + K</span>
            <input
                type="text"
                placeholder="Search..."
                className="font-poppins font-medium text-md bg-transparent outline-none"
            />
        </div>
    )
}

export default SearchbarContent

