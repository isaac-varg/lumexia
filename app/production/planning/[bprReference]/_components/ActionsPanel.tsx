"use client"
import ActionPanel from '@/components/ActionPanel'
import Layout from '@/components/Layout'
import { staticRecords } from '@/configs/staticRecords'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'
import { updateCompletedBprCascade } from '../_functions/updateCompletedBprCascade'
import { useRouter } from 'next/navigation'
import { revalidatePage } from '@/actions/app/revalidatePage'

const ActionsPanel = ({
    bpr,
}: {
    bpr: BatchProductionRecord,
}) => {

    const router = useRouter()
    const handleComplete = async () => {
        await updateCompletedBprCascade(bpr.id)
        revalidatePage("/production/planning")
        router.back()
    }

    if (bpr.bprStatusId !== staticRecords.production.bprStatuses.completed) {
        return null
    }

    return (
        <Layout.Grid>
            <ActionPanel onClick={() => handleComplete()}>Complete</ActionPanel>
        </Layout.Grid>
    )
}

export default ActionsPanel
