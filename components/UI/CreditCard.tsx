import { DateTime } from "luxon"
import amex from "./assets/amex.png"
import mastercard from "./assets/mastercard.png"
import visa from "./assets/visa.png"

export type CreditCardTypes = 'mastercard' | 'visa' | 'amex';

type CreditCardProps = {
    cardName: string // think Gold Card
    nameOnCard: string // think First Last Name
    endingIn: string
    expiry: string 
    type: CreditCardTypes
    bgColorA: string
    bgColorB: string
    circleColorA?: string
    circleColorB?: string
}

const CreditCard = ({
    cardName,
    nameOnCard,
    endingIn,
    expiry,
    type,
    bgColorA,
    bgColorB,
    circleColorA,
    circleColorB,
}: CreditCardProps) => {

    let cardTypeImage = visa;

    switch (type) {
        case 'visa':
            cardTypeImage = visa;
            break;
        case 'mastercard':
            cardTypeImage = mastercard;
            break;
        case 'amex':
            cardTypeImage = amex;
            break;
        default:
            cardTypeImage = visa;
            console.error('Card Type not found')
            break;
    }


    const expiryDate = DateTime.fromJSDate(new Date(expiry)).toFormat('MM/y')

    return (
        <div
            className="w-96 h-56 m-auto rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110 overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(to right, ${bgColorA}, ${bgColorB})`,
            }}
        >

            <div className="absolute top-2 right-2 z-10">
                <img className="w-14 h-14" src={cardTypeImage.src} alt="Card logo" />
            </div>


            <div
                className="absolute w-48 h-48 rounded-full -top-12 -right-20"
                style={{
                    backgroundColor: circleColorA,
                    opacity: 0.25,
                }}
            ></div>
            <div
                className="absolute w-48 h-48 rounded-full -bottom-12 -right-12"
                style={{
                    backgroundColor: circleColorB,
                    opacity: 0.25,
                }}

            ></div>

            <div className="w-full px-8 absolute top-8 z-10">

                <div className="flex flex-col gap-y-4">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold tracking-widest">
                            {cardName}
                        </p>
                    </div>

                    <div className="flex flex-col gap-y-1">

                        <div className="flex justify-between">
                            <div >
                                <p className="font-light">
                                    Name on Card
                                </p>
                                <p className="font-medium tracking-widest">
                                    {nameOnCard}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className=" pr-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-light text-xs">
                                    Last Four
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {endingIn}
                                </p>
                            </div>
                            <div className="">
                                <p className="font-light text-xs">
                                    Expiry
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    {expiryDate}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreditCard
