import bprBatchStepActions from '@/actions/production/bprBatchSteps';
import bprStepActionableActions from '@/actions/production/bprStepActionables';
import Card from '@/components/Card';
import React from 'react'
import { GiCauldron } from 'react-icons/gi';
import { MdOilBarrel } from 'react-icons/md';
import { TbAlertHexagon, TbClipboardList } from 'react-icons/tb';
import { getActionables } from './_functions/getActionables';

type Props = {
    searchParams: {
        bprStepId: string;
    };
}

const StepQualityPage = async ({ searchParams }: Props) => {

    const { bprStepId } = searchParams
    const step = await bprBatchStepActions.getOne(bprStepId, undefined, ["batchStep"])
    const actionables = await getActionables(step.id) 
    
    console.log('asdffff ', actionables)


    return (
        <div className='flex flex-col gap-y-4'>
            <h1 className='font-poppins font-bold text-neutral-800 text-4xl flex justify-center'>Step &gt; {step.batchStep.label}</h1>

            <div className='grid grid-cols-2 gap-6'>


                <div className='col-span-2'>
                    <Card.Root>
                        <Card.Title><span className='flex gap-x-2 items-center'><TbClipboardCheck /> <p>Actionables</p></span></Card.Title>

                        {actionables.map((actionable) => <ActionableCard key={actionable.id} userRole={userRole[0]} actionable={actionable as any} />)}

                    </Card.Root>
                </div>) : <div className='col-span-2' />
                

                <Card.Root>
                    <Card.Title><span className='flex gap-x-2 items-center'><GiCauldron /> <p>Equipment</p></span></Card.Title>
                    {equipment.map((eq: StepEquipment) => {
                        return <div key={eq.id} className='flex flex-col p-6 bg-bone-200 rounded-lg shadow-lg'>
                            <p className='font-inter text-lg text-neutral-900 font-semibold'>{eq.equipment.name}</p>
                        </div>
                    })}
                </Card.Root>

                <Card.Root>
                    <Card.Title><span className='flex gap-x-2 items-center'><MdOilBarrel /> <p>Equipment</p></span></Card.Title>
                    {bom.map((item: ExBillOfMaterials) => {
                        return <div key={item.id} className='flex flex-col p-6 bg-bone-200 rounded-lg shadow-lg'>
                            <span className='flex gap-x-3 items-center font-inter text-lg text-neutral-900 font-semibold'><div className='flex items-center justify-center rounded-full text-swirl-100 w-8 h-8 bg-swirl-900 p-2'>{item.identifier}</div> <p>{item.item.name}</p></span>
                        </div>
                    })}
                </Card.Root>

                <Card.Root>
                    <Card.Title><span className='flex gap-x-2 items-center'><TbClipboardList /> <p>Instructions</p></span></Card.Title>
                    {instructions.map((instr: StepInstruction) => {
                        return <div key={instr.id} className='flex flex-col p-6 bg-bone-200 rounded-lg shadow-lg'>
                            <p className='font-inter text-lg text-neutral-900 font-semibold'>{instr.instructionContent}</p>
                        </div>
                    })}
                </Card.Root>

                <Card.Root>
                    <Card.Title><span className='flex gap-x-2 items-center'><TbAlertHexagon /> <p>Addendums</p></span></Card.Title>
                    {addendums.map((addendum: StepAddendum) => {
                        return <AddendumCard key={addendum.id} addendum={addendum} />
                    })}
                </Card.Root>



            </div>


        </div>

    )
}

export default StepQualityPage
