"use client"

import { Panels } from '@/components/Panels'
import Text from '@/components/Text'
import { ExBprBom } from '@/types/bprBom'
import MaterialSufficiencyLine from './MaterialSufficiencyLine'


export interface MaterialsBom extends ExBprBom {
    totalQuantityOnHand: number,
    totalQuantityAvailable: number,
}

const MaterialSufficiency = ({ materials }: { materials: MaterialsBom[] }) => {

    console.log('mats', materials)

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
