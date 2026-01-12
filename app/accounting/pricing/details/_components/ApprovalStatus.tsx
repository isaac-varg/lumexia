import { SinglePricingExaminationCombined } from '@/actions/accounting/examinations/getOne'
import Card from '@/components/Card'
import React from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'

const ApprovalStatus = ({ exam }: { exam: SinglePricingExaminationCombined }) => {

  //    const isReleased = exam.approved && !exam.rejected

  const isReleased = true;
  return (
    <Card.Root>
      <Card.Title>Status</Card.Title>

      <div className="grid grid-cols-1 gap-4">

        <div className={`flex flex-col p-8 gap-y-4 rounded-xl justify-center items-center ${isReleased ? 'bg-green-500' : 'bg-rose-500'}`}>
          <span className='text-4xl'>{isReleased ? <FaRegThumbsUp /> : <FaRegThumbsDown />}</span>
          <h1 className='text-2xl font-poppins font-semibold'>
            {isReleased ? 'Approved' : 'Rejected'}
          </h1>
        </div>

      </div>
    </Card.Root>

  )
}

export default ApprovalStatus
