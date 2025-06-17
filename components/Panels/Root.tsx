
const classes = {
    bg: {
        default: 'bg-neutral-100/70 ',
    },
    base: 'flex flex-col  p-6 rounded-lg',
    gap: {
        default: 'gap-y-4',
        noGap: ''
    },
    span: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
    },
}

interface RootProps {
    children: React.ReactNode,
    bg?: keyof typeof classes.bg,
    span?: keyof typeof classes.span,
    gap?: keyof typeof classes.gap
}


const Root = ({
    children,
    bg = 'default',
    span = 1,
    gap = 'default',
}: RootProps) => {

    return (
        <div className={`${classes.base} ${classes.bg[bg]} ${classes.span[span]} ${classes.gap[gap]}`}>
            {children}
        </div>
    )
}

export default Root
