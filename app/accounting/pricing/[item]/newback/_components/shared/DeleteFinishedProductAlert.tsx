import { accountingActions } from '@/actions/accounting'
import Alert from '@/components/Alert'
import useDialog from '@/hooks/useDialog'
import { usePricingProducedActions } from '@/store/pricingProducedSlice'
import React from 'react'

const DeleteFinishedProductAlert = ({ selectedFinishedProductId, produced = false }: { selectedFinishedProductId: string, produced?: boolean }) => {


    const { resetDialogContext } = useDialog()
    //const { removeFinishedProduct } = usePricingProducedActions()

    const handleDelete = async () => {

//        if (produced) {
//            removeFinishedProduct(selectedFinishedProductId);
//        }
//

        await accountingActions.finishedProducts.delete(selectedFinishedProductId)
        location.reload()

    }


    return (
        <div>
            <Alert.Root identifier='deleteFilledConsumerContainer' >
                <Alert.Content
                    title='Confirm Deletion'
                    actionLabel='Confirm'
                    actionColor='error'
                    cancelAction={resetDialogContext}
                    action={handleDelete}
                >

                    This will delete the finished product for this item. Are you sure?
                </Alert.Content>
            </Alert.Root>
        </div>
    )
}

export default DeleteFinishedProductAlert 
