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
        <div className="flex gap-x-4 items-center text-base-content" onClick={handleClick}>
            <span className="text-2xl"><BiSearchAlt /></span>
            <span className="text-md font-medium font-poppins">CTRL + K</span>
        </div>
    )
}

export default SearchbarContent

