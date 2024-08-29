import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import AddBprButton from './_components/createNewBpr/AddBprButton'
import { getBprs } from './_functions/getBprs'

const PlanningPage = async () => {
  const bprs = await getBprs();

  return (
    <div>
      <PageTitle>Planning</PageTitle>

      <AddBprButton />
    </div>
  )
}

export default PlanningPage
