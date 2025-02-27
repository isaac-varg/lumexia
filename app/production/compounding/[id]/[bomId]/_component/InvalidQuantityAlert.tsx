"use client"
import Alert from '@/components/Alert'
import React from 'react'

const InvalidQuantityLotAlert = ({ lot, setIsViewMode }: { lot: string | null, setIsViewMode: any }) => {
  return (
    <Alert.Root identifier={`lotQuantityInvalid${lot}`}>
      <Alert.Content
        title='Not Enough'
        actionLabel='Try Again'
        actionColor='alert'
        action={() => setIsViewMode(true)}

      >
        The quantity scanned exceeds the On Hand inventory quantity for this lot. 
      </Alert.Content>

    </Alert.Root>
  )
}

export default InvalidQuantityLotAlert
