
const classes = {
    bg: {
        default: 'bg-neutral-100',
    },
    base: 'flex flex-col gap-y-4 p-6 rounded-lg'
}

interface RootProps {
    children: React.ReactNode,
    bg?: keyof typeof classes.bg,
}


const Root = ({
    children,
    bg = 'default'
}: RootProps) => {

    return (
        <div className={`${classes.base} ${classes.bg[bg]}`}>
            {children}
        </div>
    )
}

export default Root
