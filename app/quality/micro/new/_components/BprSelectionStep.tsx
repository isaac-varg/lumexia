"use state"

import React, { useEffect, useState } from 'react'
import { IBprForSSF } from '../_functions/getBprs'
import Text from '@/components/Text'
import { useWizard } from 'react-use-wizard'
import Fuse from 'fuse.js'

const BprSelectionStep = ({ bprs, onSelection }: { bprs: IBprForSSF[], onSelection: (bpr: IBprForSSF) => void }) => {
    const [searchInput, setSearchInput] = useState('')
    const [results, setResults] = useState<IBprForSSF[]>([])
    const { nextStep } = useWizard()

    const searchOptions = {
        keys: [
            "referenceCode",
            "producedItemIID",
            "producedItemName"

        ]
    }

    const searcher = new Fuse(bprs, searchOptions)

    const handleItemClick = (bpr: IBprForSSF) => {
        onSelection(bpr);
        nextStep()

    }

    const handleKeydown = (event: any) => {
        if (event.key === "Enter") {
            const firstResult = results[0];
            handleItemClick(firstResult);
        }
    };

    useEffect(() => {
        const searchResults = searcher.search(searchInput);
        const mappedResults = searchResults.map((s) => s.item);
        setResults(mappedResults);
    }, [searchInput]);


    return (
        <div className='flex flex-col gap-y-4'>

            <Text.SectionTitle>Select a BPR</Text.SectionTitle>

            <input
                placeholder="Search Name, Alias or Code"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeydown}
                className="w-full bg-slate-200 py-2 px-4 rounded-lg text-poppins text-lg mb-6"
            />

            <ul>
                <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[600px]">
                    {results.map((bpr) => (
                        <li className="border-2 rounded-lg px-4 py-2" key={bpr.bprId} onClick={() => handleItemClick(bpr)}>
                            <p>{`${bpr.producedItemName} <${bpr.bprReferenceCode}>`} </p>
                        </li>
                    ))}
                </div>
            </ul>

        </div>
    )
}

export default BprSelectionStep
