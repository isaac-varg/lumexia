"use client"

import Card from '@/components/Card'
import {  ExBprBom } from '@/types/bprBom'
import React from 'react'
import EntryCard from './EntryCard'

import Confetti from '@/components/Confetti/Confetti'

const AwaitingVerificationPanel = ({ bomItems }: { bomItems: ExBprBom[] }) => {
  const hasVerifiables = bomItems.length !== 0
  
  if (!hasVerifiables) return <Confetti remarksCount={4} />

  console.log(bomItems)

  return (
    <Card.Root>

      <Card.Title>Awaiting Verification</Card.Title>
      <div className='grid grid-cols-3 gap-4'>
      {bomItems.map((item) => <EntryCard bomItem={item} />)}
      </div>
    </Card.Root>
  )
}

export default AwaitingVerificationPanel

