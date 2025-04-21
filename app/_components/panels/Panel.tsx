'use client'
import Card from "@/components/Card"

type Props = {
    children: React.ReactNode,
    title: string
    span?: 1 | 2 | 3
}

const classes = {
    span: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
    }
}
const Panel = ({ children, title, span = 1 }: Props) => {
    return (
        <div className={`${classes.span[span]}`}>
            <Card.Root>
                <Card.Title>{title}</Card.Title>
                <div>
                    {children}
                </div>
            </Card.Root>
        </div>
    )
}

export default Panel
