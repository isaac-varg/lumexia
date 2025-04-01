import { Instructions } from '@/actions/production/mbpr/instructions/getAllByMbpr'
import { Step } from '@/actions/production/mbpr/steps/getAllByMbpr'
import Text from '@/components/Text'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'


const InstructionCard = ({ instruction }: { instruction: Instructions }) => {

    const { setFormPanelMode,setIsNewForFormPanel, setSelectedInstruction } = useMbprWizardActions()
    const handleSelection = () => {
        setIsNewForFormPanel(false);
        setFormPanelMode('instructions');
        setSelectedInstruction(instruction);
    }
    return (
        <div onClick={handleSelection} className='flex flex-col gap-y-2 bg-white opacity-85 hover:cursor-pointer hover:bg-lilac-200 rounded-xl p-6'>

            <Text.Normal>{instruction.instructionContent}</Text.Normal>

        </div>
    )
}

export default InstructionCard 
