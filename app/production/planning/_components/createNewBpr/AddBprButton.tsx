"use client"

import ActionButton from "@/components/ActionButton"
import BprForm from "./BprForm"
import useDialog from "@/hooks/useDialog"
import { TbPlus } from "react-icons/tb"

const AddBprButton = () => {

    const { showDialog } = useDialog()
    return (
        <>
            <BprForm />


            <ActionButton onClick={() => showDialog('newBprForm')}><TbPlus /></ActionButton>
        </>
    )
}

export default AddBprButton
