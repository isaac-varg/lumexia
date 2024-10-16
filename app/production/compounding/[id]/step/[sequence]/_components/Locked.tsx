import React from 'react'
import { TbLock } from 'react-icons/tb'

const Locked = ({ isLocked }: { isLocked: boolean }) => {

    if (isLocked === false) { return null }
    return (
        <div className='flex flex-col gap-y-4 items-center justify-center text-4xl font-semibold bg-amber-500 px-8 py-4 rounded-lg'>
            <div className='flex items-center justify-between gap-x-6'>
                <p className='uppercase text-stone-900'>step is locked</p>
                <span className='text-4xl text-stone-900'><TbLock /></span>
            </div>

            <div className='font-inter text-3xl text-stone-800 font-normal'>The previous step has actionables that have not yet been verified. Please get Production QA to verify. </div>
        </div>
    )
}

export default Locked
