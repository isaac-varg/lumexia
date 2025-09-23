'use client'

import { inventoryActions } from "@/actions/inventory"
import { useQcExaminationActions } from "@/store/qcExaminationSlice"
import { useEffect } from "react"

const StateSetter = ({ lotId }: { lotId: string | null }) => {

    const { setLot, setStep } = useQcExaminationActions()

    useEffect(() => {

        const handleScan = async (id: string | null) => {

            if (!id) return;

            const lot = await inventoryActions.lots.getOne(id);

            if (lot) {
                setLot(lot);
                setStep(1);

            }
        }


        handleScan(lotId)

    }, [lotId, setLot, setStep])

    return false
}

export default StateSetter
