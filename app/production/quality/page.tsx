import React from 'react'
import { getAwaitingVerificationBprs } from './_function/getAwaitingVerificationBprs'
import BprCard from './_components/BprCard';
import PageTitle from '@/components/Text/PageTitle';
import Confetti from '@/components/Confetti/Confetti';

const QualityPage = async () => {

  const bprs = await getAwaitingVerificationBprs();
  
  const hasVerifiables = bprs.length !== 0;

  return (
    <div className='flex flex-col gap-y-4'>
      <PageTitle>Awaiting Verification</PageTitle>

      {!hasVerifiables && <Confetti />}
      <div className='grid grid-cols-3 gap-4'>
        {bprs.map((bpr) => <BprCard key={bpr.id} bpr={bpr as any} />)}
      </div>
    </div>
  )
}

export default QualityPage
