const Steps = ({ children }: { children: React.ReactNode }) => {
    return (
        <ul className="steps w-full ">
            {children}
        </ul>
    )
}

export default Steps
