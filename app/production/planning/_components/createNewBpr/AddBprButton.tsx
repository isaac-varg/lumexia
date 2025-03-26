"use client"

import BprForm from "./BprForm"
import useDialog from "@/hooks/useDialog"
import { TbPlus } from "react-icons/tb"

const AddBprButton = () => {

    const { showDialog } = useDialog()
    return (
        <>
            <BprForm />


            <button onClick={() => showDialog('newBprForm')} className="btn flex gap-x-2">
                <TbPlus />
                Request Batch
            </button>
        </>
    )
}

export default AddBprButton
