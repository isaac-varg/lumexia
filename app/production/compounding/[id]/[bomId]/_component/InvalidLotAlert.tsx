"use client"
import Alert from '@/components/Alert'
import React from 'react'

const InvalidLotAlert = ({ lot, setIsViewMode }: { lot: string | null, setIsViewMode: any }) => {
  return (
    <Alert.Root identifier={`lotInvalid${lot}`}>
      <Alert.Content
        title='Invalid Item'
        actionLabel='Try Again'
        actionColor='error'
        action={() => setIsViewMode(true)}

      >
      A lot for a different item than what is requied by the bill of materials was scanned.
      </Alert.Content>

    </Alert.Root>
  )
}

export default InvalidLotAlert
