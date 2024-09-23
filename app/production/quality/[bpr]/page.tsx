import React from 'react'
import Title from './_components/Title';
import prisma from '@/lib/prisma';

type BprQualityProps = {
  searchParams: {
    id: string;
  };
}

const BprQualityPage =  async ({ searchParams} : BprQualityProps) => {
  const { id } = searchParams
  const bpr = await prisma.batchProductionRecord.findUnique({
    where: {
      id,
    },
    include: {
      mbpr: {
        include: {
          producesItem: true
        }
      },
      status: true,
      batchSize: true,
    }
  }) 

  return (
    <div>
     <Title bpr={bpr as any} />

     
    </div>
  )
}

export default BprQualityPage
