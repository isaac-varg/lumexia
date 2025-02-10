'use client'
import TabsPanel from '@/components/Tabs'
import React from 'react'
import InventorySnapshotTab from './InventorySnapshotTab'
import { InventorySnapshot } from '../_functions/getInventorySnapshot'
import { SnapshotBpr } from '../_functions/getSnapshotBprs'
import { SnapshotPo } from '../_functions/getSnapshotPos'
import { ItemInventory } from '../_functions/getInventory'
import InventoryCurrentTab from './InventoryCurrentTab'
import { OtherRequest } from '../_functions/getOtherRequests'
import { RequestNote } from '../_functions/getRequestNotes'
import NotesPanel from './NotesPanel'
import { RequestNoteType } from '../_functions/getNoteTypes'
import RequestNotesTab from './RequestNotesTab'
import { Tab } from '@/components/Tabs/Trigger'

const InventoryTabs = ({
    snapshot,
    snapshotBprs,
    snapshotPos,
    inventory,
    otherRequests,
    noteTypes,
    notes,
}: {
    snapshot: InventorySnapshot
    snapshotBprs: SnapshotBpr[]
    snapshotPos: SnapshotPo[]
    inventory: ItemInventory
    otherRequests: OtherRequest[]
    notes: RequestNote[]
    noteTypes: RequestNoteType[]
}) => {

    const tabs: Tab[] = [
        {
            identifier: 'current',
            label: 'Current',
        },
        {
            identifier: 'notes',
            label: 'Notes',
            badge: notes.length,
            badgeColor: 'neutral'

        },
        {
            identifier: 'snapshot',
            label: 'Snapshot',
        }
    ]

    return (
        <div >

            <TabsPanel.Root panelStateName='requestInventory'>

                <TabsPanel.List tabTriggers={tabs} panelStateName='requestInventory' />

                <TabsPanel.Content identifier='current' >

                    <InventoryCurrentTab inventory={inventory} otherRequests={otherRequests} />
                </TabsPanel.Content>

                <TabsPanel.Content identifier='notes'>

                    <RequestNotesTab notes={notes} noteTypes={noteTypes} />

                </TabsPanel.Content>

                <TabsPanel.Content identifier='snapshot'>
                    <InventorySnapshotTab snapshot={snapshot} bprs={snapshotBprs} pos={snapshotPos} />
                </TabsPanel.Content>


            </TabsPanel.Root>
        </div>
    )
}

export default InventoryTabs
