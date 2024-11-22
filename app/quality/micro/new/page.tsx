import React from 'react'
import MicroWizard from './_components/MicroWizard'
import { getBprs } from './_functions/getBprs'
import PageTitle from '@/components/Text/PageTitle'

const NewMicroSubmissionPage = async () => {

    const bprs = await getBprs();

    return (
        <div className='flex flex-col gap-y-6'>
            <PageTitle>New SSF Micro Submission</PageTitle>
            <MicroWizard bprs={bprs} />
        </div>
    )
}

export default NewMicroSubmissionPage
