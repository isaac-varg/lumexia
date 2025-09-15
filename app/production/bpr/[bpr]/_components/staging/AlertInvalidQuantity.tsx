"use client"
import Alert from '@/components/Alert'
import useDialog from '@/hooks/useDialog'
import { useTranslation } from '@/hooks/useTranslation'
import React from 'react'
import { translations } from '../../_configs/translations'

const AlertInvalidQuantity = () => {
  const { resetDialogContext } = useDialog()
  const { t } = useTranslation()

  return (
    <Alert.Root identifier={'quantityInvalid'}>
      <Alert.Content
        title={t(translations, 'invalidQuantityTitle')}
        actionLabel={t(translations, 'invalidQuantityButton')}
        actionColor='error'
        action={() => resetDialogContext()}

      >
        {t(translations, 'invalidQuantityContent')}
      </Alert.Content>

    </Alert.Root>
  )
}

export default AlertInvalidQuantity
