import React from 'react'
import { getAwaitingVerificationBprs } from './_function/getAwaitingVerificationBprs'
import BprCard from './_components/BprCard';
import PageTitle from '@/components/Text/PageTitle';
import Confetti from '@/components/Confetti/Confetti';
import { getStepsWithQuality } from './_function/getStepsWithQuality';

const QualityPage = async () => {

    const bprs = await getAwaitingVerificationBprs();
    const secondaryBprs = await getAwaitingVerificationBprs(true);

    const hasVerifiables = bprs.length !== 0;
    const hasSecondaries = secondaryBprs.length !== 0;


    // for compounding
    const compoundingVerification = await getStepsWithQuality()
    const hasCompundingVerifiables = compoundingVerification.length !== 0;


    return (
        <div className='flex flex-col gap-y-4'>

            {(!hasVerifiables && !hasSecondaries && !hasCompundingVerifiables) && <Confetti />}

            {(hasVerifiables || hasSecondaries || hasCompundingVerifiables) && (
                <div className='flex flex-col gap-y-4'>
                    <PageTitle>Awaiting Primary Verification</PageTitle>

                    {!hasVerifiables && <div className='w-1/3 flex flex-col bg-neutral-100 rounded-lg p-4 gap-y-4 hover:cursor-pointer hover:bg-neutral-200 font-poppins text-lg font-medium'>You&apos;re all done here!</div>}


                    {hasVerifiables && (
                        <div className='grid grid-cols-3 gap-4'>
                            {bprs.map((bpr) => <BprCard key={bpr.id} bpr={bpr as any} isSecondary={false} />)}
                        </div>
                    )}

                    <PageTitle>Awaiting Secondary Verification</PageTitle>
                    {!hasSecondaries && <div className='w-1/3 flex flex-col bg-neutral-100 rounded-lg p-4 gap-y-4 hover:cursor-pointer hover:bg-neutral-200 font-poppins text-lg font-medium'>You&apos;re all done here!</div>}
                    {hasSecondaries && (
                        <div className='grid grid-cols-3 gap-4'>
                            {secondaryBprs.map((bpr) => <BprCard key={bpr.id} bpr={bpr as any} isSecondary={true} />)}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default QualityPage;

