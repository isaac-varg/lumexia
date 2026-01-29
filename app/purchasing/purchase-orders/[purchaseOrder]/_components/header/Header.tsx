'use client'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import StatusTag from './StatusTag'
import ActionButtons from './ActionButtons'
import { usePurchasingSelection } from '@/store/purchasingSlice'
import { useRouter } from 'next/navigation'

const Header = () => {

  const { purchaseOrder } = usePurchasingSelection()
  const router = useRouter()


  if (!purchaseOrder) {
    return <Skeleton />
  }

  const handleSupplierClick = () => {
    router.push(`/purchasing/suppliers/${encodeURIComponent(purchaseOrder.supplier.name)}?id=${purchaseOrder.supplier.id}`);
  };

  return (
    <div>
      <span className="flex flex-row justify-between">
        <div className="flex flex-row items-center justify-start gap-x-4 mt-4 mb-4">
          <PageTitle>
            {`PO #${purchaseOrder.referenceCode} - `}
            <span
              onClick={handleSupplierClick}
              className="text-accent hover:text-accent/70 cursor-pointer transition-colors"
            >
              {purchaseOrder.supplier.name}
            </span>
          </PageTitle>

          <StatusTag purchaseOrder={purchaseOrder} />
        </div>


        <ActionButtons />
      </span>
    </div>
  )
}

const Skeleton = () => {
  return (
    <div>
      <span className="flex flex-row justify-between">
        <div className="flex flex-row items-center justify-start gap-x-4 mt-4 mb-4">
          <div className="skeleton h-8 w-72" />
          <div className="skeleton h-6 w-24" />
        </div>

        <div className="flex flex-row items-center justify-start gap-x-8">
          <div className="flex gap-x-4">
            <div className="skeleton h-10 w-24"></div>
            <div className="skeleton h-10 w-24"></div>
          </div>
          <div className="skeleton h-8 w-px"></div>
          <div className="flex gap-x-4">
            <div className="skeleton h-10 w-24"></div>
            <div className="skeleton h-10 w-24"></div>
          </div>
        </div>
      </span>
    </div>
  )
}

export default Header
