import React from 'react'
import MicroWizard from './_components/MicroWizard'
import { getBprs } from './_functions/getBprs'
import PageTitle from '@/components/Text/PageTitle'
import { appActions } from '@/actions/app'

const NewMicroSubmissionPage = async () => {

    const bprs = await getBprs();
    const microFormData = await appActions.configs.getByGroup('microForm');

    return (
        <div className='flex flex-col gap-y-6'>
            <PageTitle>New SSF Micro Submission</PageTitle>

            <MicroWizard bprs={bprs} microFormData={microFormData}/>

        </div>
    )
}

export default NewMicroSubmissionPage
