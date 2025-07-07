'use client'
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { Item } from "@prisma/client"
import { useState } from "react"
import { fixItems } from "./fixItems"

const MissingPricingDataPanel = ({
    missing
}: {
    missing: Item[]
}) => {


    const [isLoading, setIsLoading] = useState(false);


    const handleFix = async () => {
        try {
            setIsLoading(true);
            await fixItems(missing);

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Panels.Root>
            <Text.SectionTitle size="small">Missing Pricing Data</Text.SectionTitle>
            <Text.Normal>These are items that are missing pricing data. This results in some errors when trying to conduct pricing. Use the button below to create empty pricing data entry for the errorneous items.</Text.Normal>


            <div className="flex flex-col gap-y-1 items-center justify-center">
                <p className="text-center text-2xl text-rose-400 font-semibold font-poppins">{missing.length}</p>

                <p className="text-center text-2xl text-rose-400 font-semibold font-poppins">Items Missing Data</p>

            </div>

            {isLoading && (
                <button className="btn">
                    <span className="loading loading-spinner"></span>
                    loading
                </button>
            )}

            {!isLoading && (
                <button className="btn" onClick={() => handleFix()}>Fix Items</button>
            )}
        </Panels.Root>
    )
}

export default MissingPricingDataPanel
