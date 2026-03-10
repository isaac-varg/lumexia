import React, { useEffect, useState } from 'react'
import Heading from '../details/Heading';
import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice';
import { Prisma } from '@prisma/client';
import { productionActions } from '@/actions/production';
import { recordStatuses } from '@/configs/staticRecords/recordStatuses';

const InstructionForm = () => {

    const { isNewForFormPanel, selectedStep, selectedInstruction, } = useMbprWizardSelection()
    const { addInstruction, updateInstruction, removeInstruction, setFormPanelMode } = useMbprWizardActions()

    const [content, setContent] = useState<string>();

    const submitData = () => {

        if (isNewForFormPanel) {
            handleNew()
            return;
        }

        handleUpdate()
    }

    const handleNew = async () => {

        if (!selectedStep) return;

        const payload: Prisma.StepInstructionUncheckedCreateInput = {
            stepId: selectedStep?.id,
            instructionContent: content || '',
            recordStatusId: recordStatuses.active,
        }

        const response = await productionActions.mbprs.instructions.create(payload);

        addInstruction(response);

    }

    const handleUpdate = async () => {

        if (!selectedInstruction) return;

        const payload: Prisma.StepInstructionUncheckedUpdateInput = {
            instructionContent: content,
        }

        const response = await productionActions.mbprs.instructions.update(selectedInstruction.id, payload);

        updateInstruction(selectedInstruction.id, response.instructionContent)

    }

    const handleDelete = async () => {

        if (!selectedInstruction) return;

        await productionActions.mbprs.instructions.update(selectedInstruction.id, {
            recordStatusId: recordStatuses.archived,
        });

        removeInstruction(selectedInstruction.id);
        setFormPanelMode('default');

    }

    useEffect(() => {
        if (selectedInstruction) {
            if (!selectedInstruction) return;
            setContent(selectedInstruction.instructionContent)
        } else {
            setContent('');
        }
    }, [selectedInstruction])




    return (
        <div className='flex flex-col gap-y-6'>

            <div className='flex flex-col'>
                <Heading>Actions</Heading>
                <div className='flex flex-col gap-y-1'>
                    <button onClick={() => submitData()} className='btn btn-success'>Save</button>
                    {!isNewForFormPanel && <button onClick={handleDelete} className='btn btn-error'>Delete</button>}
                </div>
            </div>


            <div className='flex flex-col gap-y-4'>
                <Heading>Instruction Content</Heading>


                <textarea onChange={(e) => setContent(e.target.value)} value={content} className="textarea" placeholder="Instructions go here"></textarea>

            </div>
        </div>
    )
}

export default InstructionForm
