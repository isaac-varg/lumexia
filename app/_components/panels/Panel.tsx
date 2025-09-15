'use client'
import Card from "@/components/Card"
import { useRouter } from "next/navigation"

type Props = {
  children: React.ReactNode,
  title: string
  titlePath?: string
  span?: 1 | 2 | 3
}

const classes = {
  span: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
  }
}
const Panel = ({ children, title, span = 1, titlePath = '/' }: Props) => {

  const router = useRouter()
  const handlePanelTitleClick = () => {
    router.push(titlePath)
  }

  return (
    <div className={`${classes.span[span]}`}>
      <Card.Root bg="base" shadow="base">
        <div onClick={() => handlePanelTitleClick()} className="hover:cursor-pointer hover:text-lilac-500">
          <Card.Title>{title}</Card.Title>
        </div>
        <div>
          {children}
        </div>
      </Card.Root>
    </div>
  )
}

export default Panel
