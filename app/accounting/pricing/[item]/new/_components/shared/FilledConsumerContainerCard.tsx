import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    onSelect: Dispatch<SetStateAction<FilledConsumerContainer | null>>
    filledConsumerContainer: FilledConsumerContainer
    selectedConsumerContainerId: string

}

const FilledConsumerContainerCard = ({ onSelect, filledConsumerContainer, selectedConsumerContainerId }: Props) => {

    const isSelected = filledConsumerContainer.id === selectedConsumerContainerId;

    const handleClick = () => {
        onSelect(filledConsumerContainer)
    }

    return (
        <div
            className={`${isSelected ? 'bg-emerald-300' : 'bg-slate-200'} w-full hover:bg-slate-300 hover:text-slate-800 hover:cursor-pointer text-slate-900 p-4 rounded-lg flex items-center justify-center`}
            onClick={handleClick}
        >
            <div className='font-poppins font-semibold text-lg'>{filledConsumerContainer.consumerContainer.containerItem.name}</div>
        </div>

    )
}

export default FilledConsumerContainerCard
