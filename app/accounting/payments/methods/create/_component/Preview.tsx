import CreditCard from "@/components/UI/CreditCard"
import { PaymentMethodColors, PaymentMethodData, PaymentMethodType } from "./PaymentMethodWizard"
import BankCheck from "@/components/UI/BankCheck"
import BankTransfer from "@/components/UI/BankTransfer"

const Preview = ({ data, type, colors }: { data: PaymentMethodData, type: PaymentMethodType, colors: PaymentMethodColors }) => {



    return (
        <div className="flex flex-col justify-center items-center">

            {type === 'bankTransfer' && (
                <BankTransfer
                    methodName={data.methodName}
                    bgColorA={colors.bgColorA}
                    bgColorB={colors.bgColorB}
                    circleColorA={colors.circleColorA || ''}
                    circleColorB={colors.circleColorB || ''}

                />
            )}

            {(type === 'check') && (
                <BankCheck
                    methodName={data.methodName} nameOnAccount={data.associatedName} endingIn={data.accountEndingIn || ''}
                    bgColorA={colors.bgColorA}
                    bgColorB={colors.bgColorB}
                    circleColorA={colors.circleColorA || ''}
                    circleColorB={colors.circleColorB || ''}
                />
            )}


            {(type === 'visa' || type === 'mastercard' || type === 'amex') && (
                <CreditCard
                    cardName={data.methodName}
                    nameOnCard={data.associatedName}
                    endingIn={data.accountEndingIn || ''}
                    expiry={data.expiry || ''}
                    type={type}
                    bgColorA={colors.bgColorA}
                    bgColorB={colors.bgColorB}
                    circleColorA={colors.circleColorA || ''}
                    circleColorB={colors.circleColorB || ''}
                />
            )}
        </div>
    )
}

export default Preview
