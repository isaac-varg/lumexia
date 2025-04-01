import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import React from 'react'
import Heading from './Heading'
import MaterialCard from './MaterialCard'
import Text from '@/components/Text'
import NewButton from './NewButton'
import InstructionCard from './InstructionCard'

const StepDetailsPanel = () => {

    const { selectedStep, selectedMbprBomItems, selectedMbprInstructions, selectedMbprAddendums } = useMbprWizardSelection()
    const {
        setSelectedInstruction,
        setSelectedMaterial,
        setIsMaterialFormEdited,
        setMaterialFormSelectedBomItem,
        setFormPanelMode,
        setIsNewForFormPanel,
        setSelectedAddendum,
    } = useMbprWizardActions()

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
        setIsMaterialFormEdited(false)
        setSelectedMaterial(null)
        setMaterialFormSelectedBomItem(null)
        setIsNewForFormPanel(true)
        setFormPanelMode('material')
    }

    const handleNewInstruction = () => {
        setSelectedInstruction(null)
        setIsNewForFormPanel(true);
        setFormPanelMode("instructions")
    }
    
const handleNewAddendum = () => {
        setSelectedAddendum(null);
        setIsNewForFormPanel(true);
        setFormPanelMode("addendum")
    }




    return (
        <div className='flex flex-col gap-y-6 col-span-2'>
            <h1 className='font-poppins text-lg font-semibold'>
                {selectedStep ? `Step ${selectedStep.sequence} - ${selectedStep.label} ` : 'Selected Step'}
            </h1>

            <div className='bg-[#EDEDE9] h-full rounded-xl p-6 flex flex-col gap-y-6'>

                <div>
                    <Heading>Materials</Heading>

                    <div className='grid grid-cols-2 gap-2'>
                        <NewButton onClick={handleNewMaterial} label='Add Material' />

                        {selectedMbprBomItems.filter((bi) => bi.stepId === selectedStep.id).map((material) => <MaterialCard key={material.id} material={material} />)}
                    </div>
                </div>


                <div>
                    <Heading>Work Instructions</Heading>

                    <div className='grid grid-cols-1 gap-2'>

                        <NewButton onClick={handleNewInstruction} label='Add Instruction' />

                        {selectedMbprInstructions.filter((i) => i.stepId === selectedStep.id).map((instruction) => <InstructionCard key={instruction.id} instruction={instruction} />)}
                    </div>

                </div>


                <div>
                    <Heading>Addendums</Heading>

                    <div className='grid grid-cols-1 gap-2'>

                        <NewButton onClick={handleNewAddendum} label='Add Addendum' />

                        {selectedMbprAddendums.filter((a) => a.stepId === selectedStep.id).map((addendum) => <InstructionCard key={addendum.id} instruction={addendum} />)}
                    </div>

                </div>





            </div>

        </div>
    )
}

export default StepDetailsPanel
