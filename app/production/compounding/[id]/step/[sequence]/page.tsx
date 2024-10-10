import React from 'react'
import Title from '../../_components/Title';
import bprBatchStepActions from '@/actions/production/bprBatchSteps';
import { getBpr } from '../../_functions/getBpr';
import { ExBprBatchStep } from '@/types/bprBatchStep';
import stepEquipmentActions from '@/actions/production/stepEquipment';
import { GiCauldron } from "react-icons/gi";
import Card from '@/components/Card';
import { StepEquipment } from '@/types/stepEquipment';
import billOfMaterialActions from '@/actions/production/billOfMaterials';
import { BillOfMaterials, ExBillOfMaterials } from '@/types/billOfMaterials';
import { MdOilBarrel } from 'react-icons/md';
import { TbAlertHexagon, TbClipboardCheck, TbClipboardList } from 'react-icons/tb';
import stepInstructionActions from '@/actions/production/stepInstructions';
import { StepInstruction } from '@/types/stepInstruction';
import stepAddendumActions from '@/actions/production/stepAddendums';
import { StepAddendum } from '@/types/stepAddendum';
import AddendumCard from './_components/AddendumCard';
import bprStepActionableActions from '@/actions/production/bprStepActionables';
import ActionableCard from './_components/ActionableCard';
import { ExBprStepActionable } from '@/types/bprStepActionable';
import { getActionables } from './_function/getActionables';

type StepPageProps = {
    searchParams: {
        id: string;
    };
};

const StepPage = async ({ searchParams }: StepPageProps) => {

    const { id } = searchParams;
    const step: ExBprBatchStep = await bprBatchStepActions.getOne(id, undefined, ["bpr", "batchStep"])
    const bpr = await getBpr(step.bpr.id)
    const equipment = await stepEquipmentActions.getAll({ stepId: step.batchStepId }, ["equipment"])
    const bom = await billOfMaterialActions.getAll({ stepId: step.batchStepId }, ["item"])
    const instructions = await stepInstructionActions.getAll({ stepId: step.batchStepId })
    const addendums = await stepAddendumActions.getAll({ stepId: step.batchStepId }, ["addendumType"])
    const actionables = await getActionables(step.id) 


    if (!bpr) return


    return (
        <div className='flex flex-col gap-y-4'>
            <Title bpr={bpr as any} />

            <div className='flex flex-col gap-y-4'>
                <h1 className='font-poppins font-bold text-neutral-800 text-4xl flex justify-center'>Step &gt; {step.batchStep.label}</h1>

                <div className='grid grid-cols-2 gap-6'>
                    <Card.Root>
                        <Card.Title><span className='flex gap-x-2 items-center'><GiCauldron /> <p>Equipment</p></span></Card.Title>
                        {equipment.map((eq: StepEquipment) => {
                            return <div className='flex flex-col p-6 bg-bone-200 rounded-lg shadow-lg'>
                                <p className='font-inter text-lg text-neutral-900 font-semibold'>{eq.equipment.name}</p>
                            </div>
                        })}
                    </Card.Root>

                    <Card.Root>
                        <Card.Title><span className='flex gap-x-2 items-center'><MdOilBarrel /> <p>Equipment</p></span></Card.Title>
                        {bom.map((item: ExBillOfMaterials) => {
                            return <div className='flex flex-col p-6 bg-bone-200 rounded-lg shadow-lg'>
                                <span className='flex gap-x-3 items-center font-inter text-lg text-neutral-900 font-semibold'><div className='flex items-center justify-center rounded-full text-swirl-100 w-8 h-8 bg-swirl-900 p-2'>{item.identifier}</div> <p>{item.item.name}</p></span>
                            </div>
                        })}
                    </Card.Root>

                    <Card.Root>
                        <Card.Title><span className='flex gap-x-2 items-center'><TbClipboardList /> <p>Instructions</p></span></Card.Title>
                        {instructions.map((instr: StepInstruction) => {
                            return <div className='flex flex-col p-6 bg-bone-200 rounded-lg shadow-lg'>
                                <p className='font-inter text-lg text-neutral-900 font-semibold'>{instr.instructionContent}</p>
                            </div>
                        })}
                    </Card.Root>

                    <Card.Root>
                        <Card.Title><span className='flex gap-x-2 items-center'><TbAlertHexagon /> <p>Addendums</p></span></Card.Title>
                        {addendums.map((addendum: StepAddendum) => {
                            return <AddendumCard addendum={addendum} />
                        })}
                    </Card.Root>

                    <div className='col-span-2'>
                    <Card.Root>
                        <Card.Title><span className='flex gap-x-2 items-center'><TbClipboardCheck /> <p>Actionables</p></span></Card.Title>

                            {actionables.map((actionable) => <ActionableCard actionable={actionable} />)}

                    </Card.Root>
                    </div>

                </div>


            </div>
        </div>

    )
}

export default StepPage
