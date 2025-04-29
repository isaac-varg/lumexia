import useDialog from '@/hooks/useDialog'
import React from 'react'
import { TbPlus } from 'react-icons/tb'

const AddFinishedProductButton = () => {

    const { showDialog } = useDialog()

    const handleClick = () => {
        showDialog('newconsumercontainerdialog')
    }
    return (
        <div
            className='bg-neutral-100 w-full hover:bg-neutral-200 hover:text-neutral-500 hover:cursor-pointer text-neutral-400 p-4 rounded-lg flex items-center justify-center'
            onClick={handleClick}
        >

            <span className='text-2xl'><TbPlus /></span>
            <div className='font-poppins font-semibold text-lg'>Add Finished Product</div>
        </div>


    )
}

export default AddFinishedProductButton
