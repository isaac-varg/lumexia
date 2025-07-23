'use client'
import useDialog from "@/hooks/useDialog"

const NewButton = () => {

    const { showDialog } = useDialog()


    return (

        <button
            className="btn"
            onClick={() => showDialog('newDiscrepancyAuditDialog')}
        >
            New Audit
        </button>

    )
}




export default NewButton
