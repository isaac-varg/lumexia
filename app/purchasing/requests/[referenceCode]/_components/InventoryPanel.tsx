import React from 'react'
import InventoryTabs from './InventoryTabs'
import { getInventorySnapshot } from '../_functions/getInventorySnapshot'
import { getSnapshotBprs } from '../_functions/getSnapshotBprs'
import { getSnapshotPos } from '../_functions/getSnapshotPos'
import { getInventory } from '../_functions/getInventory'
import { getOtherRequests } from '../_functions/getOtherRequests'
import { RequestNote } from '../_functions/getRequestNotes'
import { RequestNoteType } from '../_functions/getNoteTypes'

const InventoryPanel = async ({ requestId, itemId, notes , noteTypes}: { requestId: string, itemId: string, notes: RequestNote[], noteTypes: RequestNoteType[]}) => {

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
                notes={notes}
                noteTypes={noteTypes}
                otherRequests={otherRequests}
                />

        </div>
    )
}

export default InventoryPanel
