import bprActions from '@/actions/production/bprActions';
import React from 'react'
import { getBpr } from './_functions/getBpr';
import Title from './_components/Title';

type CompoundingPageProps = {
  searchParams: {
    id: string;
  };
};


const CompoundingPage = async  ({searchParams} : CompoundingPageProps) => {
  const bpr = await getBpr(searchParams.id) 
 
  return (
    <div>
    <Title bpr={bpr as any} />
    </div>
  )
}

export default CompoundingPage
