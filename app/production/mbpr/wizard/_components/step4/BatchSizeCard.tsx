import { BatchSize } from '@/actions/production/mbpr/batchSizes/getAllByMbpr'
import { staticRecords } from '@/configs/staticRecords'
import { useMbprWizardActions } from '@/store/mbprWizardSlice'
import React from 'react'

const bgColor = {
    active: 'bg-lime-200',
    inactive: 'bg-white'
}

const BatchSizeCard = ({ batchSize }: { batchSize: BatchSize }) => {

    const { setIsNewForFormPanel, setSelectedBatchSize } = useMbprWizardActions()
    const isActive = batchSize.recordStatusId === staticRecords.app.recordStatuses.active;

    const handleSelection = () => {
        setIsNewForFormPanel(false)
        setSelectedBatchSize(batchSize)

    }

    return (
        <div onClick={handleSelection} className={`flex flex-col gap-y-2 ${isActive ? bgColor.active : bgColor.inactive} opacity-85 hover:cursor-pointer hover:bg-lilac-200 rounded-xl p-6`}>

            <div className='flex justify-center text-center'>
                {isActive && <div className='bg-emerald-800 text-white  font-poppins font-semibold px-4 py-1 w-fit rounded-xl'>Active Batch Size</div>}
            </div>

            <div className='flex justify-between'>

                <div className='flex flex-col gap-y-2'>
                    <h1 className='font-poppins font-semibold text-base'>
                        {batchSize.quantity} {batchSize.uom.abbreviation}
                    </h1>


                    <h1 className='font-poppins font-medium text-base'>
                        {batchSize.batchSizeCompoundingVessels[0]?.tankTime || 'No tank time recorded'}
                    </h1>
                </div>

                <div className='flex flex-col gap-y-2'>
                    <h2 className='font-poppins font-medium text-base'>{batchSize.batchSizeCompoundingVessels[0]?.compoundingVessel.equipment.name || ''}</h2>

                    <h1 className='font-poppins font-medium text-base'>

                        {batchSize.batchSizeCompoundingVessels[0]?.compoundingVessel.capacityMinimum || 0} to ${batchSize.batchSizeCompoundingVessels[0]?.compoundingVessel.capacityMaximum || 0} lb capacity
                    </h1>
                </div>
            </div>

        </div>

    )
}

export default BatchSizeCard
