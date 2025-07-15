'use client'
import { PaymentMethod } from "@/actions/accounting/paymentMethods/getAll"
import AddNewButton from "./AddNewButton"
import PaymentMethodDisplay from "@/components/UI/PaymentMethodDisplay"

const MethodsDisplay = ({ methods }: { methods: PaymentMethod[] }) => {

    return (
        <div className="grid grid-cols-4 gap-8">

            <AddNewButton />


            {methods.map(method => <PaymentMethodDisplay key={method.id} method={method} />)}

        </div>
    )
}

export default MethodsDisplay
