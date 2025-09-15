import React from 'react'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import { useItemSelection } from '@/store/itemSlice'
import Card from '@/components/Card'

const UsageTable = () => {

  const { usage } = useItemSelection()

  if (!usage) return false;


  const sorted = usage?.usage.sort((a, b) => b.quantity - a.quantity);

  return (
    <Card.Root >
      <Card.Title>Used In</Card.Title>

      <h1 className='font-semibold text-xl text-base-content'>Total: {toFracitonalDigits.weight(usage.totalUsage)} lbs</h1>

      <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Produced Item</th>
              <th>Batch Size</th>
              <th>Concentration</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => {

              return (
                <tr key={item.producedItem}>
                  <th>{item.producedItem}</th>
                  <td>{toFracitonalDigits.weight(item.batchSize)}</td>
                  <td>{toFracitonalDigits.weight(item.concentration)}</td>
                  <td>{toFracitonalDigits.weight(item.quantity)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card.Root>

  )
}

export default UsageTable
