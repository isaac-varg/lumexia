import { accountingActions } from "@/actions/accounting"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import Card from "@/components/Card"
import PageTitle from "@/components/Text/PageTitle"
import { Item } from "@/types/item"
import InitialStateSetter from "./InitialStateSetter"
import Basics from "./Basics"
import ConsumerContainers from "./ConsumerContainers"
import ActionsPanel from "./ActionsPanel"
import { PricingExaminationNoteType } from "@/actions/accounting/examinations/notes/getAllNoteTypes"
import NotesPanel from "../shared/NotesPanel"
import { v4 as uuidv4 } from 'uuid';

const PurchasedMain = async ({ item, noteTypes }: { item: Item, noteTypes: PricingExaminationNoteType[] }) => {

    const pricingData = await accountingActions.pricing.item.getItemPricingData(item.id)
    const lastPrice = await accountingActions.pricing.item.getLastItemPrice(item.id)
    const consumerContainers = await accountingActions.filledConsumerContainers.getAllByFillItem(item.id)
    const examinationId = uuidv4();


    return (
        <div className='flex flex-col gap-y-4'>
            <InitialStateSetter lastPrice={lastPrice} pricingData={pricingData} consumerContainers={consumerContainers} />
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />
            <div className="grid grid-cols-2 gap-4">
                <Basics />
                <ActionsPanel consumerContainers={consumerContainers} examinationId={examinationId} examinedItemId={item.id} pricingData={pricingData} />

                <ConsumerContainers fillItemId={item.id} />

                <NotesPanel noteTypes={noteTypes} examinationId={examinationId} itemId={item.id} />
            </div>
        </div>
    )
}

export default PurchasedMain
