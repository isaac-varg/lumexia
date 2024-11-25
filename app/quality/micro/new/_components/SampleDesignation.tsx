import React, { useEffect } from 'react'
import { IBprForSSF } from '../_functions/getBprs'
import Text from '@/components/Text'
import Form from '@/components/Form'
import { useForm } from 'react-hook-form'
import { generateMicroSubmissionForm } from '@/utils/pdf/generators/microSubmissionForm/generateMicroSubmissionForm'

export interface IMicroFormInputs {
    drums: number;
    pails: number;
    gallons: number;
    tank: number;
}

const SampleDesignation = ({ selectedBpr }: { selectedBpr: IBprForSSF | null }) => {

    const form = useForm<IMicroFormInputs>();

    const handleSubmit = async (data: IMicroFormInputs) => {

        if (!selectedBpr) {return}
        generateMicroSubmissionForm(selectedBpr, data)
    }


    return (
        <div className='flex flex-col gap-y-6'>

            <Text.SectionTitle>{`Samples for ${selectedBpr?.producedItemName} <${selectedBpr?.bprReferenceCode}>`}</Text.SectionTitle>

            <Form.Root form={form} onSubmit={handleSubmit}>

                <div className=' flex flex-col gap-y-4 max-w-[500px]'>
                    <Form.Number
                        form={form}
                        required
                        fieldName='drums'
                        label='Drums'
                        orientation='horizontal'
                    />

                    <Form.Number
                        form={form}
                        required
                        fieldName='pails'
                        label='Pails'
                        orientation='horizontal'

                    />

                    <Form.Number
                        form={form}
                        required
                        fieldName='gallons'
                        label='Gallons'
                        orientation='horizontal'

                    />

                    <Form.Number
                        form={form}
                        required
                        fieldName='tank'
                        label='Tank'
                        orientation='horizontal'

                    />

                </div>
                <Form.ActionRow form={form} />

            </Form.Root>

        </div>
    )
}

export default SampleDesignation
