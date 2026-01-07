'use client'
import { useState } from "react"
import AlterModeButton, { AlterMode } from "./AlterModeButton"



const PriceAltering = () => {

  const [alterMode, setAlterMode] = useState<AlterMode>("consumerPrice")



  return (
    <div className="flex flex-col gap-4">
      <div className='flex flex-col gap-4'>
        <h1 className='font-poppins text-xl font-semibold'>
          Alter By
        </h1>

        <div className='grid grid-cols-2 gap-2'>
          <AlterModeButton alterModeId='consumerPrice' currentMode={alterMode} label='Consumer Price' onSelect={setAlterMode} />
          <AlterModeButton alterModeId='markup' currentMode={alterMode} label='Markup Percentage' onSelect={setAlterMode} />
          <AlterModeButton alterModeId='profit' currentMode={alterMode} label='Profit' onSelect={setAlterMode} />
          <AlterModeButton alterModeId='profitPercentage' currentMode={alterMode} label='Profit Margin' onSelect={setAlterMode} />
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h1 className='font-poppins text-xl font-semibold'>
          Value
        </h1>

        <input
          type='number'
          //       value={getValueByAlterMode()}
          //      onChange={updatePricingCalculations}
          className='bg-lilac-300 w-full h-full flex items-center justify-center font-poppins text-2xl font-medium text-center rounded-xl'
          step={alterMode === 'consumerPrice' || alterMode === 'profit' ? '0.01' : '0.1'}
        />
      </div>
    </div>
  )
}

export default PriceAltering
