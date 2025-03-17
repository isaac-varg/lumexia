'use client'

import useDialog from "@/hooks/useDialog"
import { TbPlus } from "react-icons/tb"

const BeginPricingExaminationButton = () => {

    const { showDialog } = useDialog()

    return (
        <button
            className='btn btn-accent'
            onClick={() => showDialog('beginPricingExamDialog')}
        >
            <span className='text-2xl'><TbPlus /></span>
            <p className='text-xl font-poppins font-semibold'>Begin Pricing Examination</p>
        </button>

    )
}

export default BeginPricingExaminationButton
