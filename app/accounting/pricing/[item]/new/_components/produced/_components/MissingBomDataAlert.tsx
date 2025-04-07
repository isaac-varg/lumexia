import Alert from '@/components/Alert'
import useDialog from '@/hooks/useDialog'
import { usePricingProducedSelection } from '@/store/pricingProducedSlice'
import { useRouter } from 'next/navigation'
import React from 'react'

const MissingBomDataAlert = () => {

    const { bomObject } = usePricingProducedSelection()
    const router = useRouter()

    if (!bomObject) return;

    return (
        <Alert.Root identifier='missingBomData'>
            <Alert.Content
                title='Missing BOM Data'
                action={() => router.back()}
                actionLabel='Acknowledge'
                actionColor='alert'
            >
                <div className='flex flex-col gap-4'>
                    <p>The following bom items have been flagged for missing pricing data:</p>

                    <ul>
                        {bomObject.missingPricingData.map((b, index) => {
                            return (
                                <li key={index}>
                                    {b}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Alert.Content>

        </Alert.Root>
    )
}

export default MissingBomDataAlert
