'use client'

import { Panels } from "@/components/Panels";
import { CreditCardTypes } from "@/components/UI/CreditCard";
import { Wizard } from "@/components/Wizard"
import { useEffect, useState } from "react"
import StepType from "./StepType";
import { PaymentMethod } from "@/actions/accounting/paymentMethods/getAll";
import StepCardInfo from "./StepCardInfo";
import { exit } from "process";
import StepColors from "./StepColors";
import Preview from "./Preview";
import { type } from "os";
import Submission from "./Submission";

export type PaymentMethodType = CreditCardTypes | 'bankTransfer' | 'check'
export type PaymentMethodData = {
    identifier: string
    limit: number
    expiry?: string,
    accountEndingIn: string | null
    associatedName: string
    methodName: string
};
export type PaymentMethodColors = {
    bgColorA: string
    bgColorB: string
    circleColorA?: string | null
    circleColorB?: string | null
}

const PaymentMethodWizard = ({ existingMethod }: { existingMethod: PaymentMethod | null | undefined }) => {

    const [step, setStep] = useState(0);
    const [selectedType, setSelecteType] = useState<PaymentMethodType>('visa');
    const [data, setData] = useState<PaymentMethodData>({
        identifier: '',
        limit: 0,
        expiry: '',
        accountEndingIn: '',
        associatedName: '',
        methodName: '',
    });
    const [colors, setColors] = useState<PaymentMethodColors>({
        bgColorA: '#333333',
        bgColorB: '#ffffff',
        circleColorA: '#ff32ff',
        circleColorB: '#ff3200'
    })

    const nextStep = () => {
        setStep((prev) => prev + 1);
    }

    useEffect(() => {
        if (existingMethod) {
            setSelecteType(existingMethod.paymentType as PaymentMethodType)
            setData({
                identifier: existingMethod.identifier,
                limit: existingMethod.limit,
                expiry: existingMethod.expiry || '',
                accountEndingIn: existingMethod.accountEndingIn,
                associatedName: existingMethod.associatedName,
                methodName: existingMethod.methodName,
            });
            setColors({
                bgColorB: existingMethod.bgColorB,
                bgColorA: existingMethod.bgColorA,
                circleColorA: existingMethod.circleColorA,
                circleColorB: existingMethod.circleColorB
            })
        };

    }, [existingMethod])

    return (
        <div className="flex flex-col gap-y-6">
            <Wizard.Steps>
                <Wizard.StepLabel label="Type" indicator="1" step={0} currentStep={step} />
                <Wizard.StepLabel label="Info" indicator="2" step={1} currentStep={step} />
                <Wizard.StepLabel label="Colors" indicator="3" step={2} currentStep={step} />



            </Wizard.Steps>

            <Preview colors={colors} data={data} type={selectedType} />

            <Panels.Root >
                <StepType selectedType={selectedType} setSelectedType={setSelecteType} nextStep={nextStep} step={step} />
                <StepCardInfo data={data} setData={setData} nextStep={nextStep} step={step} />
                <StepColors setColors={setColors} nextStep={nextStep} step={step} colors={colors} />
                <Submission step={step} existingMethod={existingMethod} data={data} type={selectedType} colors={colors} />

            </Panels.Root>
        </div>
    )
}

export default PaymentMethodWizard
