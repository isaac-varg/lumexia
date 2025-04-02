'use client'

import { useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"

const CreateEditMBPR = () => {

    const router = useRouter()

    return (
        <button
            className='btn flex gap-x-2 items-center text-neutral-800'
            onClick={() => router.push('/production/mbpr/wizard')}
        >

            <span className='text-2xl'><TbPlus /></span>
            <p className='text-xl font-poppins font-semibold'>Create or Modify MBPR</p>
        </button>

    )
}

export default CreateEditMBPR
