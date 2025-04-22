import Image from "next/image"
import Panel from "../Panel"
import otter from './otter.webp'

const Welcome = () => {
    return (
        <Panel title="Dashboard Update">
            <div className="flex flex-col gap-y-4">
                <div className="flex justify-center items-center flex-col gap-y-4">
                    <Image className=" rounded-full w-40 h-40" src={otter} alt="Otter" />
                </div>
                <p className="font-poppins">The data here should update without refreshing. Configuration and alert badges coming soon.</p>
            </div>

        </Panel>
    )
}

export default Welcome
