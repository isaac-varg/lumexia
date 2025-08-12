'use client'
import { Equipment } from '@/actions/facility/equipment/getAllEquipment'
import { CompoundingVessel } from '@/actions/production/compoundingVessels/getAllCompoundinVessels'
import Card from '@/components/Card'
import useDialog from '@/hooks/useDialog'
import React, { useState } from 'react'
import NewEquipmentVesselForm from './NewCompoundingVesselForm'

type Props = {
  vessels: CompoundingVessel[]
  equipment: Equipment[]
}

const CompoundingVessels = ({ vessels, equipment }: Props) => {
  const { showDialog } = useDialog()
  const [selectedVessel, setSelectedVessel] = useState<CompoundingVessel>();
  return (
    <Card.Root>

      <NewEquipmentVesselForm selectedVessel={selectedVessel} compoundingVessels={equipment} />

      <div className='flex justify-between items-center'>
        <Card.Title>Compounding Vessels</Card.Title>
        <button className='btn btn-neutral' onClick={() => showDialog('addCompoundingVessel')}>Add Vessel</button>
      </div>


      {vessels.length === 0 && <p className='font-poppins text-xl'>No compounding vessels found.</p>}

      {vessels.map((vessel) => {
        return (
          <div key={vessel.id} className='flex flex-col gap-y-4 bg-lilac-100 p-8 rounded-xl hover:cursor-pointer hover:bg-lilac-200' onClick={() => {
            setSelectedVessel(vessel)
            showDialog("addCompoundingVessel")
          }}>

            <div className='flex flex-col gap-y-1'>
              <h2 className='font-poppins text-xl font-semibold'>{vessel.equipment.name}</h2>
              <h2 className='font-poppins text-lg font-medium bg-lilac-900 text-white px-4 py-1 rounded-xl w-fit'>{vessel.equipment.identifier}</h2>

            </div>

            <div className='flex gap-x-2 font-poppins font-medium text-lg'>
              <p>{vessel.capacityMinimum} - {vessel.capacityMaximum} lb Capacity </p>

              <p>{vessel.operationalCost} $/hour</p>



            </div>

          </div>
        )
      })}


    </Card.Root>
  )
}

export default CompoundingVessels
