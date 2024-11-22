"use state"

import React, { useEffect, useState } from 'react'
import { IBprForSSF } from '../_functions/getBprs'
import FuzzySearch from 'fuzzy-search'

const BprSelectionStep = ({ bprs, onSelection }: { bprs: IBprForSSF[], onSelection: (bpr: IBprForSSF) => void  }) => {
    const [searchInput, setSearchInput] = useState('')
    const [results, setResults] = useState<IBprForSSF[]>([])

    console.log(bprs)
    const searcher = new FuzzySearch(bprs, [
        "referenceCode",
        "producedItemIID",
        "producedItemName"
    ]);


    const handleItemClick = (bpr: IBprForSSF ) => {
        onSelection(bpr);
    }

    const handleKeydown = (event: any) => {
        if (event.key === "Enter") {
            const firstResult = results[0];
            handleItemClick(firstResult);
        }
    };

    useEffect(() => {
        const searchResults = searcher.search(searchInput);
        setResults(searchResults);
    }, [searchInput]);


    return (
        <div>
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
