"use client"

import Card from '@/components/Card'
import { ExBprBom } from '@/types/bprBom'
import React from 'react'
import EntryCard from './EntryCard'

import Confetti from '@/components/Confetti/Confetti'
import useProduction from '@/hooks/useProduction'

const AwaitingVerificationPanel = ({ bomItems, bomNeedingSecondary }: { bomItems: ExBprBom[], bomNeedingSecondary: ExBprBom[] }) => {
  const hasVerifiables = bomItems.length !== 0
  const hasSecondaryVerifiables = bomNeedingSecondary.length !== 0;

  const { isSecondaryVerificationMode } = useProduction()


  if ((!isSecondaryVerificationMode && !hasVerifiables) || (isSecondaryVerificationMode && !hasSecondaryVerifiables)) return <Confetti remarksCount={4} />

  return (
    <Card.Root>

      <Card.Title>{isSecondaryVerificationMode ? 'Awaiting Secondary Verification' : 'Awaiting Primary Verification'}</Card.Title>
      {!isSecondaryVerificationMode &&
        <div className='grid grid-cols-3 gap-4'>
          {bomItems.map((item) => <EntryCard bomItem={item} />)}
        </div>
      }

      {isSecondaryVerificationMode &&
        <div className='grid grid-cols-3 gap-4'>
          {bomNeedingSecondary.map((item) => <EntryCard bomItem={item} />)}
        </div>
      }
    </Card.Root>

  )
}

export default AwaitingVerificationPanel

