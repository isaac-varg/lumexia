"use client"
import Alert from '@/components/Alert'
import useDialog from '@/hooks/useDialog'
import { useTranslation } from '@/hooks/useTranslation'
import React from 'react'
import { translations } from '../../_configs/translations'

const AlertInvalidLot = () => {
  const { resetDialogContext } = useDialog()
  const { t } = useTranslation()

  return (
    <Alert.Root identifier={'lotInvalid'}>
      <Alert.Content
        title={t(translations, 'invalidLotTitle')}
        actionLabel={t(translations, 'invalidLotButton')}
        actionColor='error'
        action={() => resetDialogContext()}

      >
        {t(translations, 'invalidLotContent')}
      </Alert.Content>

    </Alert.Root>
  )
}

export default AlertInvalidLot
