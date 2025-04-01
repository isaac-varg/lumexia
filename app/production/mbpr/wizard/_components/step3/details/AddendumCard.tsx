import { Addendum } from '@/actions/production/mbpr/addendums/getAllByMbpr'
import { Instructions } from '@/actions/production/mbpr/instructions/getAllByMbpr'
import { Step } from '@/actions/production/mbpr/steps/getAllByMbpr'
import Text from '@/components/Text'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'


const AddendumCard = ({ addendum }: { addendum: Addendum }) => {

    const { setFormPanelMode, setIsNewForFormPanel, setSelectedAddendum } = useMbprWizardActions()
    const handleSelection = () => {
        setIsNewForFormPanel(false);
        setFormPanelMode('addendum');
        setSelectedAddendum(addendum)
    }
    return (
        <div onClick={handleSelection} className='flex flex-col gap-y-2 bg-white opacity-85 hover:cursor-pointer hover:bg-lilac-200 rounded-xl p-6'>

            <div className='w-fit flex font-poppins font-semibold'
                style={{ backgroundColor: addendum.addendumType.bgColor, color: addendum.addendumType.textColor }}
            >{addendum.addendumType.name}
            </div>

            <Text.Normal>{addendum.content}</Text.Normal>

        </div>
    )
}

export default AddendumCard 
