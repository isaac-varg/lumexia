type BankCheckProps = {
    methodName: string // think Gold Card
    nameOnAccount: string // think First Last Name
    endingIn: string
    bgColorA: string
    bgColorB: string
    circleColorA?: string
    circleColorB?: string
}


const BankCheck = ({ methodName, nameOnAccount, endingIn, bgColorB, bgColorA, circleColorB, circleColorA }: BankCheckProps) => {
    return (
        <div
            className="w-full max-w-xl h-64 rounded-xl shadow-lg p-8 font-sans border border-gray-200 relative overflow-hidden transform transition-transform hover:scale-105 flex flex-col justify-between"
            style={{
                backgroundImage: `linear-gradient(to right, ${bgColorA}, ${bgColorB})`,
            }}

        >

            <div
                className="absolute w-64 h-64 rounded-full -top-16 -left-20"
                style={{
                    backgroundColor: circleColorA,
                    opacity: 0.15,
                }}
            ></div>
            <div
                className="absolute w-72 h-72 rounded-full  -bottom-24 -right-12"
                style={{
                    backgroundColor: circleColorB,
                    opacity: 0.15,
                }}

            ></div>

            {/* Card Header */}
            <div className="relative z-10 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-700">{methodName}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-100">
                    <path d="M3 21h18" />
                    <path d="M5 21V5l7-4 7 4v16" />
                    <path d="M12 21v-7" />
                    <path d="M9 14h6" />
                </svg>
            </div>

            {/* Account Details */}
            <div className="relative z-10 text-left">
                <p className="text-sm text-gray-500 mb-1">Account Holder</p>
                <p className="text-xl font-medium tracking-wide text-gray-700">{nameOnAccount}</p>
            </div>

            {/* Account Numbers */}
            <div className="relative z-10 flex justify-between items-end">
                <div>
                    <p className="text-sm text-gray-500 mb-1">Account</p>
                    <p className="font-mono text-lg tracking-wider text-gray-700">Account Ending In •••• {endingIn}</p>
                </div>
                {/*<div>
                    <p className="text-sm text-gray-500 mb-1 text-right">Routing</p>
                    <p className="font-mono text-base text-gray-600">{routingNumber}</p>
                </div>*/}
            </div>
            <div className="absolute z-10  pb-2 text-center -bottom-1 inset-x-0 ">
                <p className="font-mono text-sm text-gray-700 tracking-widest">
                    <span className="mr-4">⑆{endingIn}⑆</span>
                    <span className="mr-4">⑈{endingIn}⑈</span>
                    <span>{1234}</span>
                </p>
            </div>

        </div>
    )
}

export default BankCheck
