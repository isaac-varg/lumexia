import Card from '@/components/Card'
import Text from '@/components/Text'
import React from 'react'

const BasicsPanel = () => {

    return (
        <Card.Root>

            <Card.Title>Basics</Card.Title>


            <div className='flex justify-between gap-x-4'>
                <div className='flex flex-col gap-y-2 w-2/3'>

                    <Text.LabelDataPair
                        label='Last Purchase Price'
                        tooltip='The price per unit obtained from the last purchase order.'
                        data={2}
                    />

                </div>
                <div className=' rounded-xl flex w-1/3 flex-col gap-y-2 padding-2 bg-sky-800 items-center justify-center'>
                    <h1 className='font-poppins font-bold text-6xl text-white'>{0}</h1>
                    <h2 className='font-poppins font-semibold text-lg text-neutral-300'>{0}</h2>
                </div>


            </div>


        </Card.Root>
    )
}

export default BasicsPanel
