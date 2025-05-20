'use client'

import Alert from "@/components/Alert";
import { usePricingProducedSelection } from "@/store/pricingProducedSlice"
import { useRouter } from "next/navigation";
import { PricingError } from "../_functions/throwPricingError";

const PricingErrorAlert = () => {

    const { producedPricingSummations } = usePricingProducedSelection();
    const router = useRouter()
    const isError = producedPricingSummations?.isError || false


    if (!isError) return false


    const error = producedPricingSummations as PricingError



    return (
        <Alert.Root identifier="pricingError">

            <Alert.Content
                title="Pricing Error"
                action={() => router.back()}
                actionLabel="Acknowledge"
                actionColor="alert"
            >
                <p className="font-poppins text-lg">
                    There was error while gathering the summations:
                </p>

                <p className="font-poppins text-lg">
                    {error.message}.{error.data || ''}
                </p>
            </Alert.Content>


        </Alert.Root>
    )
}

export default PricingErrorAlert
