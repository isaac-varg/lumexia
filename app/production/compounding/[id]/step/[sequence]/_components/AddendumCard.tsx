import { StepAddendum } from '@/types/stepAddendum';
import React from 'react';
import { TbAlertTriangle } from 'react-icons/tb';

// Define the possible addendum types
type AddendumType = 'warning'; // Add other types here if needed

const AddendumCard = ({ addendum }: { addendum: StepAddendum }) => {
    const typeName = addendum.addendumType.name.toLowerCase() as AddendumType;

    const addendumTypeConfigs: Record<'bg' | 'icon', Record<AddendumType, string | JSX.Element>> = {
        bg: {
            warning: 'bg-rose-200',
        },
        icon: {
            warning: <span className='text-rose-900 text-2xl'><TbAlertTriangle /></span>,
        }
    };

    return (
        <div className={`flex flex-col gap-y-4 p-6 rounded-lg ${addendumTypeConfigs.bg[typeName]}`}>
            <span className='flex flex-row gap-x-4 items-center font-inter font-semibold text-lg'>{addendumTypeConfigs.icon[typeName]} <h1>{typeName.toUpperCase()}</h1></span>

            <p className='font-inter text-lg font-normal'>{addendum.content}</p>

        </div>
    );
};

export default AddendumCard;

