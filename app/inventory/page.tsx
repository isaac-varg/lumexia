import aliasTypeActions from '@/actions/inventory/aliasTypes';
import inventoryTypeActions from '@/actions/inventory/inventoryTypeActions';
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import InventoryTypes from './_components/InventoryTypes';
import ProcurementTypes from './_components/ProcurementTypes';
import ItemTypes from './_components/ItemTypes';
import { getAllItemTypes } from '@/actions/inventory/itemTypes/getAll';
import AliasTypes from './_components/AliasTypes';
import FileTypes from './_components/FileTypes';
import { getItemFileTypes } from './items/[name]/_actions/files/getItemFilesTypes';

const InventoryDashboardPage = async () => {
  const inventoryTypesData = await inventoryTypeActions.getAll();
  const itemTypesData = await getAllItemTypes();
  const aliasTypesData = await aliasTypeActions.getAll();
  const fileTypesData = await getItemFileTypes();

  const [inventoryTypes, itemTypes, aliasTypes, fileTypes] = await Promise.all([inventoryTypesData, itemTypesData, aliasTypesData, fileTypesData]);


  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-row justify-between'>
        <PageTitle title='Inventory Configuration' />

        <p className='font-poppins text-xl text-base-content'>hello</p>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <InventoryTypes inventoryTypes={inventoryTypes} />
        <ProcurementTypes />
        <AliasTypes aliasTypes={aliasTypes} />

        <ItemTypes itemTypes={itemTypes} />

        <FileTypes fileTypes={fileTypes} />
      </div>
    </div>
  )
}

export default InventoryDashboardPage 
