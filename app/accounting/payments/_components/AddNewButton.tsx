'use client'
import { useRouter } from "next/navigation"

const AddNewButton = () => {
    const router = useRouter()
    return (
        <div
            className="w-96 h-56 m-auto rounded-xl flex flex-col items-center justify-center text-white bg-gradient-to-r from-purple-200 to-purple-300 shadow-2xl transition-transform transform hover:scale-110 overflow-hidden"
            onClick={() => router.push('/accounting/payments/methods/create')}
        >
                <p className="font-poppins text-3xl font-semibold ">Add</p>
        </div>

    )
}

export default AddNewButton
