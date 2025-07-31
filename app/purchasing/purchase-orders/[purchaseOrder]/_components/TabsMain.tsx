'use client'
import TabsPanel from "@/components/Tabs"
import NotesPanel from "./notes/NotesPanel"
import Totals from "./Totals"
import Correspondant from "./correspondant/Correspondant"
import ActivityPanelCard from "./activity/ActivityPanel"
import AccountingPanel from "./accounting/AccountingPanel"
import ItemTable from "./ItemTable"

// prop drilling at its finest
// TODO fix this mess
type TabsMainProps = {
    notes: any
    purchaseOrder: any
    orderItems: any
    activity: any
    poWithAccounting: any
    files: any
    fileTypes: any
    allMethods: any
    allAccountingNoteTypes: any
    allAccountingStatuses: any
    supplierNotes: any
    user: any
    items: any

}

const TabsMain = ({
    notes,
    purchaseOrder,
    orderItems,
    activity,
    poWithAccounting,
    files,
    fileTypes,
    allMethods,
    allAccountingStatuses,
    allAccountingNoteTypes,
    supplierNotes,
    user,
    items,

}: TabsMainProps) => {

    const tabs = [
        { identifier: 'main', label: "Main" },
        { identifier: 'accounting', label: "Accounting" }
    ]
    return (
        <div>
            <TabsPanel.Root panelStateName="purchaseOrder">
                <TabsPanel.List tabTriggers={tabs} panelStateName={'purchaseOrder'} />

                <TabsPanel.Content identifier="main">

                    <div className="flex flex-col gap-y-6">
                        <ItemTable
                            user={user}
                            purchaseOrder={purchaseOrder}
                            orderItems={orderItems}
                            items={items}

                        />



                        <div className="grid grid-cols-2 gap-4">


                            <NotesPanel
                                notes={notes}
                                poId={purchaseOrder.id}
                            />
                            <Totals purchaseOrderItems={orderItems} />

                            <Correspondant purchaseOrder={purchaseOrder} supplierNotes={supplierNotes} />
                            <ActivityPanelCard activity={activity} />
                        </div>
                    </div>


                </TabsPanel.Content>

                <TabsPanel.Content identifier="accounting">
                    <AccountingPanel accounting={poWithAccounting} files={files} fileTypes={fileTypes} allMethods={allMethods} allAccountingNoteTypes={allAccountingNoteTypes} allAccountingStatuses={allAccountingStatuses} />

                </TabsPanel.Content>




            </TabsPanel.Root>
        </div>
    )
}

export default TabsMain
