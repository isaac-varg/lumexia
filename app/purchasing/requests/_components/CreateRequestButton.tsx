"use client"

import { useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"

const CreateRequestButton = () => {

    const router = useRouter()

    return (
        <button
            className="btn"
            onClick={() => router.push('/purchasing/requests/new')}
        >
            <div className="flex items-center justify-start">
                <span className="text-2xl"> <TbPlus /></span>
                <p>Add Request</p>
            </div>

        </button>
    )
}

export default CreateRequestButton
