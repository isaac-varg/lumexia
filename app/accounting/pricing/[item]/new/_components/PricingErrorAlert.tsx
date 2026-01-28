"use client"

import Alert from "@/components/Alert"
import useDialog from "@/hooks/useDialog"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const PricingErrorAlert = ({ error }: { error: string }) => {
  const { showDialog } = useDialog()
  const router = useRouter()

  useEffect(() => {
    if (error) {
      showDialog('pricingErrorAlert')
    }
  }, [error, showDialog])

  return (
    <Alert.Root identifier="pricingErrorAlert">
      <Alert.Content
        title="Pricing Error"
        action={() => router.back()}
        actionLabel="Go Back"
        actionColor="error"
      >
        {error}
      </Alert.Content>
    </Alert.Root>
  )
}

export default PricingErrorAlert
