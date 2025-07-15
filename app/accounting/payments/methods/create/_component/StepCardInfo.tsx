import { Dispatch, SetStateAction, useEffect } from "react"
import { PaymentMethodData } from "./PaymentMethodWizard"
import { useForm } from "react-hook-form"
import Form from "@/components/Form"

const StepCardInfo = ({ setData, nextStep, step }: { setData: Dispatch<SetStateAction<PaymentMethodData>>, nextStep: () => void, step: number }) => {

    const form = useForm<PaymentMethodData>()

    const handleSubmit = (data: PaymentMethodData) => {
        setData(data);
        nextStep()
    }


    const { watch } = form;

    useEffect(() => {
        const subscription = watch((value) => {
            setData(prevData => ({ ...prevData, ...value }));
        });

        return () => subscription.unsubscribe();
    }, [watch, setData]);

    if (step !== 1) return false

    return (
        <Form.Root form={form} onSubmit={handleSubmit}>

            <Form.Text form={form} fieldName="methodName" label="Method Name" required />
            <Form.Text form={form} fieldName="identifier" label="Identifier" required />
            <Form.Number form={form} fieldName="limit" label="Limit" required />
            <Form.Text form={form} fieldName="expiry" label="Expiry" required={false} />
            <Form.Text form={form} fieldName="accountEndingIn" label="Account Ending In" required={false} />
            <Form.Text form={form} fieldName="associatedName" label="Associated Name" required />

            <div className="flex justify-end gap-x-4">

                <button className="btn " onClick={() => console.info('there is no going back hehe')} >Back</button>
                <button className="btn btn-success" type="submit">Next Step</button>

            </div>

        </Form.Root>
    )
}

export default StepCardInfo
