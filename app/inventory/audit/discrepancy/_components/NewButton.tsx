'use client'
import useDialog from "@/hooks/useDialog"

const NewButton = () => {

    const { showDialog } = useDialog()


    return (

        <div>
            <button
                className="btn"
                onClick={() => showDialog('newDiscrepancyAuditDialog')}
            >
                New Audit
            </button>
        </div>

    )
}




export default NewButton
