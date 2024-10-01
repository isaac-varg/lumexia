"use client"
import ActionPanel from '@/components/ActionPanel'
import { staticRecords } from '@/configs/staticRecords'
import { ExBprStaging } from '@/types/bprStaging'
import React from 'react'
import { verifyBomItem } from '../_functions/verifyBomItem'
import { ExBprBom } from '@/types/bprBom'
import { useRouter } from 'next/navigation'
import useProduction from '@/hooks/useProduction'

const ActionsArea = ({ stagings, bomItem }: { stagings: ExBprStaging[], bomItem: ExBprBom }) => {

  const router = useRouter();
  const { isSecondaryVerificationMode } = useProduction()

  const { verified, secondaryVerification } = staticRecords.production.bprBomStatuses;
  const allVerifiedComparison = isSecondaryVerificationMode ? secondaryVerification : verified;

  const allVerified = stagings.every((staging) => staging.bprStagingStatusId === allVerifiedComparison)
  // todo make check to see if required and staged amount are equal


  const handleComplete = async () => {
    await verifyBomItem(bomItem, isSecondaryVerificationMode)
    router.back()

  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      <ActionPanel >Add Note</ActionPanel>
      {allVerified && <ActionPanel onClick={() => handleComplete()} >Complete</ActionPanel>}

    </div>
  )
}

export default ActionsArea
