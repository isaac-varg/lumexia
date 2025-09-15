'use client'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import StatusTag from './StatusTag'
import ActionButtons from './ActionButtons'
import { usePurchasingSelection } from '@/store/purchasingSlice'

const Header = () => {

  const { purchaseOrder } = usePurchasingSelection()


  if (!purchaseOrder) {
    return <Skeleton />
  }

  return (
    <div>
      <span className="flex flex-row justify-between">
        <div className="flex flex-row items-center justify-start gap-x-4 mt-4 mb-4">
          <PageTitle title={`PO #${purchaseOrder.referenceCode} - ${purchaseOrder.supplier.name}`} />

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
