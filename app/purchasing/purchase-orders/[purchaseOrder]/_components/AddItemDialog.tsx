import Dialog from "@/components/Dialog";
import React, { useEffect, useState } from "react";
import { PoFlatItems } from "../_functions/flattenItems";
import Fuse from "fuse.js";

const AddItemDialog = ({ data, onItemSelection }: { data: PoFlatItems, onItemSelection: any }) => {
    const [results, setResults] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState("");

    const searchOptions = {
        keys: [["referenceCode",
            "name",
            "mergedAliases"
        ]],
    }

    const searcher = new Fuse(data, searchOptions)

    const handleItemClick = (item: any) => {
        onItemSelection(item);
    };

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
        <>
            <Dialog.Root identifier="addItemDialog">
                <Dialog.Title>Search Item</Dialog.Title>

                <input
                    placeholder="Search Name, Alias or Code"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeydown}
                    className="w-full bg-slate-200 py-2 px-4 rounded-lg text-poppins text-lg mb-6"
                />


                <ul>
                    <div className="flex flex-col overflow-y-auto  max-h-[600px] gap-y-4">
                        {results.map((item) => (
                            <li className="border-2 rounded-lg px-4 py-2" key={item.id} onClick={() => handleItemClick(item)}>
                                <p>{`${item.name} ${item.aliasesAll.length < 1 ? "" : `(${item.aliasesAll})`}`} </p>
                            </li>
                        ))}
                    </div>
                </ul>
            </Dialog.Root>
        </>
    );
};

export default AddItemDialog;
