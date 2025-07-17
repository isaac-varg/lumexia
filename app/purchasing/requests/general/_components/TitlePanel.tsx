import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import SectionTitle from "@/components/Text/SectionTitle"
import { Dispatch, SetStateAction } from "react"

const TitlePanel = ({ onChange, value }: { onChange: Dispatch<SetStateAction<string>>, value: string }) => {
    return (
        <Panels.Root span={2}>
            <SectionTitle size="small">Item Title</SectionTitle>

            <Text.Normal>What is the name of the item?</Text.Normal>

            <input type="text" onChange={(e) => onChange(e.target.value)} value={value} className="focus:outline-none font-poppins bg-lilac-100 px-6 py-4 rounded-xl" />

        </Panels.Root>
    )
}

export default TitlePanel
