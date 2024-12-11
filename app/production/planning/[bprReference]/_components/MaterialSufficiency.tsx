"use client"

import { Panels } from '@/components/Panels'
import Text from '@/components/Text'
import { BprBom, ExBprBom } from '@/types/bprBom'
import MaterialSufficiencyLine from './MaterialSufficiencyLine'
import { PurchaseOrderItem } from '@/types/purchaseOrderItem'


export interface MaterialsBom extends ExBprBom {
    totalQuantityOnHand: number,
    totalQuantityAllocated: number,
    totalQuantityAvailable: number,
    allocated: BprBom[]
    purchases: PurchaseOrderItem[]
}

const MaterialSufficiency = ({ materials }: { materials: MaterialsBom[] }) => {


    return (
        <Panels.Root>

            <Text.SectionTitle>Material Sufficiency</Text.SectionTitle>

            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Material Name</th>
                            <th>Required</th>
                            <th>Available </th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {materials.map((material: MaterialsBom) => <MaterialSufficiencyLine key={material.id} material={material} />)}
                    </tbody>
                </table>
            </div>
        </Panels.Root>
    )
}

export default MaterialSufficiency
