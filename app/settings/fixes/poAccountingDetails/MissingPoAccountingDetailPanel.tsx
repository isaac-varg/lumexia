'use client'
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { Item, PurchaseOrder } from "@prisma/client"
import { useState } from "react"
import { fixPos } from "./fixPos"

const MissingPoAccountingDetailsPanel = ({
    missing
}: {
    missing: PurchaseOrder[]
}) => {


    const [isLoading, setIsLoading] = useState(false);


    const handleFix = async () => {
        try {
            setIsLoading(true);
            await fixPos(missing);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Panels.Root>
            <Text.SectionTitle size="small">Missing PO Accounting Details</Text.SectionTitle>
            <Text.Normal>These are Purchase Orders that were create prior to the accounting facets of Lumexia were created and are therefore missing PO Accounting Detail entries. This creates a dummy entry so that now the entry exists, however, this default state for the accounting details is used. Newly created POs have this created automatically.</Text.Normal>


            <div className="flex flex-col gap-y-1 items-center justify-center">
                <p className="text-center text-2xl text-rose-400 font-semibold font-poppins">{missing.length}</p>

                <p className="text-center text-2xl text-rose-400 font-semibold font-poppins">POs Missing Accounting Details</p>

            </div>

            {isLoading && (
                <button className="btn">
                    <span className="loading loading-spinner"></span>
                    loading
                </button>
            )}

            {!isLoading && (
                <button className="btn" onClick={() => handleFix()}>Fix POs</button>
            )}
        </Panels.Root>
    )
}

export default MissingPoAccountingDetailsPanel 
