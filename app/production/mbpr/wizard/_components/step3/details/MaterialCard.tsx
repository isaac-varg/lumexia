import { Step } from '@/actions/production/mbpr/steps/getAllByMbpr'
import Text from '@/components/Text'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import React from 'react'

type StepMaterial = Step["BillOfMaterial"][number]

const MaterialCard = ({ material }: { material: StepMaterial }) => {

    const { setIsMaterialFormEdited, setMaterialFormSelectedBomItem, setSelectedMaterial, setIsNewForFormPanel, setFormPanelMode } = useMbprWizardActions()
    const handleSelection = () => {
        setMaterialFormSelectedBomItem(null)
        setIsMaterialFormEdited(false);
        setSelectedMaterial(material)
        setIsNewForFormPanel(false)
        setFormPanelMode('material')
    }
    return (
        <div onClick={handleSelection} className='flex flex-col gap-y-2 bg-white opacity-85 hover:cursor-pointer hover:bg-lilac-200 rounded-xl p-6'>

            <div className='flex justify-between'>
                <h1 className='font-poppins font-semibold text-base'>
                    #{material.identifier}
                </h1>
                <h2 className='font-poppins font-medium text-base'>{toFracitonalDigits.weight(material.concentration)} % w/w</h2>
            </div>
            <Text.Normal>{material.item.name}</Text.Normal>

        </div>
    )
}

export default MaterialCard
