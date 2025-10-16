import React from 'react'
import { getRequests } from './_functions/getRequests'
import RequestTabs from './_components/RequestTabs'
import { getAllGeneralRequests } from './general/_actions/getAllGeneralRequests'
import Header from './_components/shared/Header'
import StateSetter from './_components/shared/StateSetter'

const RequestsPage = async () => {

  const requests = await getRequests()
  const generalRequests = await getAllGeneralRequests(false);


  return (
    <div className='flex flex-col gap-y-6'>

      <Header />

      <StateSetter
        requests={requests}
        generalRequests={generalRequests}
      />




    </div>
  )
}

export default RequestsPage
