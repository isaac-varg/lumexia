import Text from '@/components/Text';
import React from 'react'
import { TbPlus } from 'react-icons/tb';


const NewButton = ({ onClick, label }: { onClick: () => void, label: string }) => {
    return (
        <div onClick={onClick} className='flex  items-center gap-x-4 bg-white opacity-85 hover:cursor-pointer hover:bg-lilac-200 rounded-xl p-6'>
            <span className='text-xl'><TbPlus /></span>
            <Text.Normal>{label}</Text.Normal>
        </div>


    )
}

export default NewButton
