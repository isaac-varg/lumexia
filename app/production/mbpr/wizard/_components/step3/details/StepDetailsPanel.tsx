import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import React from 'react'
import Heading from './Heading'
import MaterialCard from './MaterialCard'
import Text from '@/components/Text'
import { TbPlus } from 'react-icons/tb'

const StepDetailsPanel = () => {

    const { selectedStep } = useMbprWizardSelection()
    const { setFormPanelMode, setIsNewForFormPanel } = useMbprWizardActions()

    if (!selectedStep) {
        return (
            <div className='flex flex-col gap-y-6 col-span-1'>
                <h1 className='font-poppins text-lg font-semibold'>
                    {'Selected Step'}
                </h1>

                <Text.Normal>A Step Has Not Been Selected</Text.Normal>

            </div>

        )
    }

    const handleNewMaterial = () => {
        setIsNewForFormPanel(true)
        setFormPanelMode('material')
    }

    return (
        <div className='flex flex-col gap-y-6 col-span-2'>
            <h1 className='font-poppins text-lg font-semibold'>
                {selectedStep ? `Step ${selectedStep.sequence} - ${selectedStep.label} ` : 'Selected Step'}
            </h1>

            <div className='bg-[#EDEDE9] h-full rounded-xl p-6'>

                <Heading>Materials</Heading>

                <div className='grid grid-cols-2 gap-2'>
                    <div onClick={handleNewMaterial} className='flex  items-center gap-x-4 bg-white opacity-85 hover:cursor-pointer hover:bg-lilac-200 rounded-xl p-6'>
                        <span className='text-xl'><TbPlus /></span>
                        <Text.Normal>Add Material</Text.Normal>
                    </div>
                    {selectedStep?.BillOfMaterial.map((material) => <MaterialCard material={material} />)}
                </div>



            </div>

        </div>
    )
}

export default StepDetailsPanel
