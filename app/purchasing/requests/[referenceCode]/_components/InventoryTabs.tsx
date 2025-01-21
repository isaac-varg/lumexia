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

const InventoryTabs = ({
    snapshot,
    snapshotBprs,
    snapshotPos,
    inventory,
    otherRequests,
}: {
    snapshot: InventorySnapshot
    snapshotBprs: SnapshotBpr[]
    snapshotPos: SnapshotPo[]
    inventory: ItemInventory
    otherRequests: OtherRequest[]
}) => {

    const tabs = [
        {
            identifier: 'current',
            label: 'Current',
        },
        {
            identifier: 'snapshot',
            label: 'Snapshot',
        }
    ]

    return (
        <div className='card bg-base-300 '>
            <div className='card-body'>
                <div className='flex justify-between'>
                    <div className='card-title'>Invetory of Material</div>
                </div>

                <TabsPanel.Root panelStateName='requestInventory'>

                    <TabsPanel.List tabTriggers={tabs} panelStateName='requestInventory' />

                    <TabsPanel.Content identifier='current' >

                        <InventoryCurrentTab inventory={inventory} otherRequests={otherRequests} />
                    </TabsPanel.Content>

                    <TabsPanel.Content identifier='snapshot'>
                        <InventorySnapshotTab snapshot={snapshot} bprs={snapshotBprs} pos={snapshotPos} />
                    </TabsPanel.Content>


                </TabsPanel.Root>
            </div>
        </div>
    )
}

export default InventoryTabs
