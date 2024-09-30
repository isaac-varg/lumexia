"use client"

import ActionButton from '@/components/ActionButton';
import { ExBprStaging } from '@/types/bprStaging';
import React, { useState } from 'react';
import { verifyBomItem } from '../_functions/verifyBomItem';

const StagedCard = ({ staging }: { staging: ExBprStaging }) => {

  const handleVerify = async () => {
    await verifyBomItem(staging)
  }

  const handleNote = () => {

  }

  return (
    <div className={`p-8 bg-zinc-100 rounded-lg flex flex-col gap-y-4 font-poppins font-medium text-xl `}>
      <span className=''>{staging.quantity} lb</span>
      <h1>Lot: {staging.lot.lotNumber}</h1>
      <span>Staged By {staging.pulledByUser.name}</span>

      <div className='flex gap-x-4'>
      <ActionButton onClick={() => handleVerify()}>Verify</ActionButton>
      <ActionButton onClick={() => handleNote()} color='cararra'>Note</ActionButton>
      </div>
    </div>
  );
};

export default StagedCard;

