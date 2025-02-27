import LabelDataPair from '@/components/Text/LabelDataPair'
import React from 'react'

type Data = {
    lot: string | null
    quantity: number | null
    validity: Record<string, boolean>
}

const ReviewStep = ({ data }: { data: Data }) => {


    return (
        <div>
            {data.validity.lot && (<div className='flex flex-col gap-y-2'>

                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>)}

        </div>
    )
}

export default ReviewStep
