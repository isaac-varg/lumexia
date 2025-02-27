"use client"

// this component differs from search in that the results are output to the component
// rather than displayed

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TbSearch } from "react-icons/tb";
import Fuse from 'fuse.js'
import { useCommandPalletActions } from "@/store/commandPalletSlice";
import { useHotkeys } from "react-hotkeys-hook";

type SearchProps<T> = {
    data: T[],
    keys: string[]
    input: any
    setInput: Dispatch<SetStateAction<string>>
    onQueryComplete: Dispatch<SetStateAction<T[]>>
    limit?: number
}

const SearcherUnmanaged = <T,>({ data, keys, input, setInput, onQueryComplete, limit = 6 }: SearchProps<T>) => {

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const searchOptions = {
        keys: [...keys],
        threshold: 0.3,
    }

    const fuse = new Fuse(data, searchOptions)


    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            let results: T[];
            if (input.trim() === "") {
                results = [];
            } else {
                // Otherwise, perform the search
                const searchResults = fuse.search(input);
                results = searchResults.map((result) => result.item).slice(0, limit);
            }
            onQueryComplete(results);
        }, 100);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [input]);


    return (
        <div className="flex flex-col gap-y-4">
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={input} onChange={(e) => {
                    setInput(e.target.value)
                }} />
                <span className="text-2xl"><TbSearch /></span>
            </label>


        </div>

    )
}

export default SearcherUnmanaged
