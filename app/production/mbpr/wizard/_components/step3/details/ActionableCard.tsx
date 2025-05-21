import { Actionable } from '@/actions/production/mbpr/actionables/getAllByMbpr'
import { Addendum } from '@/actions/production/mbpr/addendums/getAllByMbpr'
import Text from '@/components/Text'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import React from 'react'


const ActionableCard = ({ actionable }: { actionable: Actionable }) => {

    const { setFormPanelMode, setIsNewForFormPanel, setSelectedActionable } = useMbprWizardActions()
    const handleSelection = () => {
        setIsNewForFormPanel(false);
        setFormPanelMode('actionables');
        setSelectedActionable(actionable)
    }
    return (
        <div onClick={handleSelection} className='flex flex-col gap-y-2 bg-white opacity-85 hover:cursor-pointer hover:bg-lilac-200 rounded-xl p-6'>

            <div className='w-fit flex font-poppins font-semibold text-sm px-2 py-1 rounded-xl'
                style={{ backgroundColor: actionable.actionableType.bgColor, color: actionable.actionableType.textColor }}
            >{actionable.actionableType.name}
            </div>

            <Text.Normal>Required: {actionable.required ? 'True' : 'False'}</Text.Normal>
            <Text.Normal>Verification: {actionable.verificationRequired ? 'True' : 'False'}</Text.Normal>
            <Text.Normal>Secondary Verification: {actionable.secondaryVerificationRequired ? 'True' : 'False'}</Text.Normal>

        </div>
    )
}

export default ActionableCard 
