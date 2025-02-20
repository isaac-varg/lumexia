"use client"

// this component differs from search in that the results are output to the component
// rather than displayed

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TbSearch } from "react-icons/tb";
import Fuse from 'fuse.js'

type SearchProps<T> = {
    data: T[],
    keys: string[]
    onQueryComplete: Dispatch<SetStateAction<T[]>>
}

const Searcher = <T,>({ data, keys, onQueryComplete }: SearchProps<T>) => {

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const [searchInput, setSearchInput] = useState("");

    const searchOptions = {
        keys: [...keys],
    }

    const fuse = new Fuse(data, searchOptions)


    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            let results: T[];
            if (searchInput.trim() === "") {
                // If search input is empty, return all data
                results = data;
            } else {
                // Otherwise, perform the search
                const searchResults = fuse.search(searchInput);
                results = searchResults.map((result) => result.item);
            }
            onQueryComplete(results);
        }, 400);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchInput]);




    return (
        <div className="flex flex-col gap-y-4">
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <span className="text-2xl"><TbSearch /></span>
            </label>


        </div>

    )
}

export default Searcher
