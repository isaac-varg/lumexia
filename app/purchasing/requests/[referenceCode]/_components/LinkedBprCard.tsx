import React from 'react'
import { LinkedBatchEntryType  } from '../_functions/getLinkedBatches'

const LinkedBprCard = ({ bpr } : {bpr :  LinkedBatchEntryType }) => {
  return (
    <div className='card bg-indigo-200'>
        <div className='card-body'>
            <div className='card-title'>BPR# {bpr.bpr.referenceCode} - {bpr.bpr.mbpr.producesItem.name} </div>
        </div>
    </div>
  )
}

export default LinkedBprCard
