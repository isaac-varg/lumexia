"use client"
import ActionButton from '@/components/ActionButton'
import Layout from '@/components/Layout'

import SectionTitle from '@/components/Text/SectionTitle'
import useDialog from '@/hooks/useDialog'
import React from 'react'

const PaymentMethodPanelTitle = () => {
  const { showDialog } = useDialog()


  return (
     <Layout.Row>
      <SectionTitle>Payment Methods</SectionTitle>
        <ActionButton onClick={() => showDialog('addPaymentMethod')}>Add</ActionButton>
    </Layout.Row>
 )
}

export default PaymentMethodPanelTitle