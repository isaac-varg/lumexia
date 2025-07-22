'use client'
import { PaymentMethod } from "@/actions/accounting/paymentMethods/getAll"
import AddNewButton from "./AddNewButton"
import PaymentMethodDisplay from "@/components/UI/PaymentMethodDisplay"
import { useRouter } from "next/navigation"

const MethodsDisplay = ({ methods }: { methods: PaymentMethod[] }) => {

    const router = useRouter()
    const handleClick = (method: PaymentMethod) => {

        router.push(`/accounting/payments/methods/create?id=${method.id}`)
    }

    return (
        <div className="grid grid-cols-4 gap-8">

            <AddNewButton />


            {methods.map(method => <PaymentMethodDisplay key={method.id} method={method} onClick={handleClick} />)}

        </div>
    )
}

export default MethodsDisplay
