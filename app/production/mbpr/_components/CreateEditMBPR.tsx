'use client'

import { useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"

const CreateEditMBPR = () => {

  const router = useRouter()

  return (
    <button
      className='btn btn-secondary'
      onClick={() => router.push('/production/mbpr/wizard')}
    >

      <span className='text-2xl'><TbPlus /></span>
      Create or Modify MBPR
    </button>

  )
}

export default CreateEditMBPR
