import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import SectionTitle from "@/components/Text/SectionTitle"

const InfoPanel = () => {
    return (
        <Panels.Root>

            <SectionTitle size="small">Info</SectionTitle>

            <div className="flex flex-col gap-y-2">

                <Text.Normal>This page is for requesting items that are not yet in Lumexia.</Text.Normal>

                <Text.Normal>Include as much information as you can so the item can be accurately sourced.</Text.Normal>

                <Text.Normal>When you are done, use the <span className="italic">Commit</span> button in the actions panel.</Text.Normal>
            </div>


        </Panels.Root>

    )
}

export default InfoPanel
