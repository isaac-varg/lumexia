import supplierActions from '@/actions/purchasing/supplierActions';
import supplierNoteActions from '@/actions/purchasing/supplierNoteActions';
import PageTitle from '@/components/Text/PageTitle';
import React from 'react'
import NotesTable from './_components/NotesTable';
import PaymentMethodsPanel from './_components/PaymentMethodsPanel';

type SupplierDetailsProps = {
    params: {
        name: string;
      };
      searchParams: {
        id: string;
      };
}

const SupplierDetails = async ({params, searchParams} : SupplierDetailsProps) => {

  const supplier = await supplierActions.getOne(searchParams.id);
  const notes = await supplierNoteActions.getAll({supplierId: supplier.id});




  return (
    <div>
      <PageTitle>{supplier.name} </PageTitle>
    <div className="flex flex-col gap-y-4">
      <NotesTable data={notes} supplier={supplier}/>
      
      <PaymentMethodsPanel supplierId={supplier.id}/> 
      </div>
    </div>
  )
}

export default SupplierDetails
