
const classes = {
    bg: {
        default: 'bg-neutral-100/50',
    },
    base: 'flex flex-col gap-y-4 p-6 rounded-lg',
    span: {
        1: 'col-span-1',
        2: 'col-span-2',
    },
}

interface RootProps {
    children: React.ReactNode,
    bg?: keyof typeof classes.bg,
    span?: keyof typeof classes.span,
}


const Root = ({
    children,
    bg = 'default',
    span = 1
}: RootProps) => {

    return (
        <div className={`${classes.base} ${classes.bg[bg]} ${classes.span[span]}`}>
            {children}
        </div>
    )
}

export default Root
