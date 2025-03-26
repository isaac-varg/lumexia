import { useMbprWizardSelection } from '@/store/mbprWizardSlice'
import React from 'react'
import MaterialForm from './MaterialForm'

const FormPanel = () => {

    const { formPanelMode } = useMbprWizardSelection()

    return (
        <div className='flex flex-col gap-y-6 col-span-1'>
            <h1 className='font-poppins text-lg font-semibold'>
                Edit
            </h1>


            <div className='bg-[#EDEDE9] h-full rounded-xl p-6'>
            {formPanelMode === 'material' && <MaterialForm />}
            </div>
        </div>
    )
}

export default FormPanel
