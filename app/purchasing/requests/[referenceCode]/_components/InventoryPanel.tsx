import React from 'react'
import InventoryTabs from './InventoryTabs'
import { getInventorySnapshot } from '../_functions/getInventorySnapshot'
import { getSnapshotBprs } from '../_functions/getSnapshotBprs'
import { getSnapshotPos } from '../_functions/getSnapshotPos'
import { getInventory } from '../_functions/getInventory'
import { getOtherRequests } from '../_functions/getOtherRequests'
import { getLinkedPosAmount } from '../_functions/getLinkedPoAmounts'

const InventoryPanel = async ({ requestId, itemId }: { requestId: string, itemId: string }) => {

    const snapshot = await getInventorySnapshot(requestId)
    const snapshotBprs = await getSnapshotBprs(snapshot.allocatedBprIds)
    const snapshotPos = await getSnapshotPos(snapshot.pendingPoIds);
    const inventory = await getInventory(itemId)
    const otherRequests = await getOtherRequests(itemId, requestId);


    return (
        <div className='col-span-2'>
            <InventoryTabs 
                snapshot={snapshot} 
                snapshotBprs={snapshotBprs} 
                snapshotPos={snapshotPos} 
                inventory={inventory}
                otherRequests={otherRequests}
                />

        </div>
    )
}

export default InventoryPanel
