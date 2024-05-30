import supplierActions from '@/actions/purchasing/supplierActions';
import supplierNoteActions from '@/actions/purchasing/supplierNoteActions';
import PageTitle from '@/components/Text/PageTitle';
import React from 'react'
import NotesTable from './components/NotesTable';
import PaymentMethodsPanel from './components/PaymentMethodsPanel';

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

      <NotesTable data={notes} supplier={supplier}/>
      
      <PaymentMethodsPanel supplierId={supplier.id}/> 
    </div>
  )
}

export default SupplierDetails