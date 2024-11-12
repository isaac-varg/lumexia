import React from 'react'
import { BomUsage } from '../../_functions/getBomUsage'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'

const UsageTable = ({
    usage
}: {
    usage: BomUsage
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="table text-lg font-poppins">

                <thead>
                    <tr>
                        <th>Produced Item</th>
                        <th>MBPRP</th>
                        <th>Concentration</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {usage.usage.map((item) => {

                        return (
                            <tr key={item.producedItem}>
                                <th>{item.producedItem}</th>
                                <td>{item.mbprLabel}</td>
                                <td>{item.concentration}</td>
                                <td>{toFracitonalDigits.weight(item.quantity)}</td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr className='font-semibold text-xl'>
                        <th />
                        <th />
                        <th />
                        <th >{usage.totalUsage}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default UsageTable
