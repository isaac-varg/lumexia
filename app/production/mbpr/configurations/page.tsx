import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import EquipmentTable from './_components/EquipmentTable'
import { facilityActions } from '@/actions/facility'
import CompoundingVessels from './_components/CompoundingVessels'
import { productionActions } from '@/actions/production'

const ConfigurationsPage = async () => {

    const equipment = await facilityActions.equipment.getAll();
    const equipmentTypes = await facilityActions.equipmentTypes.getAll();
    const compoundingVessels = await productionActions.compoundingVessels.getAll();
    return (
        <div>
            <PageTitle>MBPR Configurations</PageTitle>
            <PageBreadcrumbs />


            <div className='grid grid-cols-2 gap-6'>
                <EquipmentTable equipment={equipment} equipmentTypes={equipmentTypes} />

                <CompoundingVessels vessels={compoundingVessels} equipment={equipment} />

            </div>

        </div>
    )
}

export default ConfigurationsPage
