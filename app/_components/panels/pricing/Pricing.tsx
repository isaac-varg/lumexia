'use client'
import { usePricingQueue } from "@/hooks/appQuery/usePricingQueue"
import Panel from "../Panel";
import PricingOption from "./PricingOption";

const Pricing = () => {

    const { data: exams, isLoading } = usePricingQueue()


    const isComplete = exams?.length === 0;


    if (!exams) {
        return (
            <Panel title="New Requests">
                <div className="grid grid-cols-1 gap-1">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                </div>
            </Panel>
        )
    }


    return (
        <Panel title="Reviewable Pricing" titlePath="/accounting/pricing">

            {isComplete && <p className="font-poppins text-lg font-medium text-neutral-800">All done 👍🏽👍🏽🫰🏽🫰🏽</p>}

            {!isComplete && <div className="grid grid-cols-1 gap-1 max-h-[250px] overflow-auto">
                {exams.map((exam) => {
                    return (
                        <PricingOption key={exam.id} exam={exam} />
                    )
                })}
            </div>}
        </Panel>

    )
}

export default Pricing
