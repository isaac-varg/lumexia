import Alert from '@/components/Alert'
import useDialog from '@/hooks/useDialog'
import { PurchasedValidation } from '../../_functions/validatePurchasedCommit'

const ValidationErrorAlert = ({ validation, onProceed }: { validation: PurchasedValidation | undefined, onProceed: () => void }) => {

    if (!validation) return false;

    const { resetDialogContext } = useDialog()
    

    const handleContinue = async () => {
        if (!validation.checks.examinedConsumerContainerCountsMatch || !validation.checks.allInterimViewed) return;
        onProceed()
        resetDialogContext()
    }

    return (
        <div>
            <Alert.Root identifier='purchasedValidationErrors' >
                <Alert.Content
                    title='Proceed with Validation Failures '
                    actionLabel='Proceed'
                    actionColor='cararra'
                    cancelAction={resetDialogContext}
                    action={handleContinue}
                >

                    <div className='flex flex-col gap-2'>
                        <p>
                            There were one or more validation errors during the commit:
                        </p>

                        <ul>
                            {Object.entries(validation.checks).map(([v, isValid]) => {
                                if (isValid) return false;

                                return <li key={v}>{v}</li>;
                            })}
                        </ul>

                        <p>Proceed anyway?</p>
                    </div>
                </Alert.Content>
            </Alert.Root>
        </div>
    )
}

export default ValidationErrorAlert
