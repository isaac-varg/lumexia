import { accountingActions } from '@/actions/accounting'
import Alert from '@/components/Alert'
import useDialog from '@/hooks/useDialog'
import React from 'react'

const DeleteFilledConsumerContainerAlert = ({ selectedConsumerContainerId }: { selectedConsumerContainerId: string }) => {


    const { resetDialogContext } = useDialog()

    const handleDelete = async () => {

        await accountingActions.filledConsumerContainers.delete(selectedConsumerContainerId)
        location.reload()
    }
    return (
        <div>
            <Alert.Root identifier='deleteFilledConsumerContainer' >
                <Alert.Content
                    title='Confirm Deletion'
                    actionLabel='Confirm'
                    actionColor='cararra'
                    cancelAction={resetDialogContext}
                    action={handleDelete}
                >

                    This will delete the filled consumer container for this product. Are you sure?
                </Alert.Content>
            </Alert.Root>
        </div>
    )
}

export default DeleteFilledConsumerContainerAlert
