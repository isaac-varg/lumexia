type BankTransferProps = {
    methodName: string
    bgColorA: string
    bgColorB: string
    circleColorA?: string
    circleColorB?: string
}
const BankTransfer = ({ methodName, bgColorA, bgColorB, circleColorA, circleColorB }: BankTransferProps) => {
    return (
        <div className="w-full max-w-sm  rounded-xl shadow-md p-6 font-sans border border-gray-200 relative overflow-hidden transform transition-transform hover:scale-105 flex flex-col items-center justify-center text-center h-56"
            style={{
                backgroundImage: `linear-gradient(to right, ${bgColorA}, ${bgColorB})`,
            }}

        >

            <div className="absolute w-48 h-48 rounded-full  -top-12 -left-16"
                style={{
                    backgroundColor: circleColorA,
                    opacity: 0.15,
                }}

            ></div>
            <div className="absolute w-56 h-56 rounded-full -bottom-20 -right-10"
                style={{
                    backgroundColor: circleColorB,
                    opacity: 0.15,
                }}

            ></div>

            <div className="relative z-10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M3 21h18" />
                    <path d="M5 21V5l7-4 7 4v16" />
                    <path d="m15 14-3-3-3 3" />
                    <path d="M12 11v6" />
                </svg>
            </div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-800">{methodName}</h2>
                <h2 className="text-2xl font-bold text-gray-800">Bank Transfer</h2>
            </div>
        </div>
    )
}

export default BankTransfer
