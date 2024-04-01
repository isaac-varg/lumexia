import NavigationButton from '@/components/NavigationButton'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import { RiSettingsLine } from "react-icons/ri";

const InventoryDashboardPage = () => {
  return (
    <div className='flex flex-row justify-between'>
      <PageTitle title='Inventory' />
      <NavigationButton label={'Edit'} path='/inventory/edit'  icon={<RiSettingsLine />}/>
    </div>
  )
}

export default InventoryDashboardPage 