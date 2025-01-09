import Dialog from '@/components/Dialog'
import useDialog from '@/hooks/useDialog'
import React, { Dispatch, SetStateAction } from 'react'


type RequestFormProps = {
    setMode: Dispatch<SetStateAction<"default" | "request">>,
    allocationDialogIdentifier: string
}

const RequestForm = ({
    setMode,
    allocationDialogIdentifier,
}: RequestFormProps
) => {

    const { showDialog } = useDialog()


    const handleCancel = () => {
        showDialog(allocationDialogIdentifier)
        setMode("default")

    }
    return (
        <Dialog.Root identifier='newrequest'>
            <Dialog.Title>Hey</Dialog.Title>
                <button className="btn" onClick={handleCancel}>back</button>
        </Dialog.Root>
    )
}

export default RequestForm
