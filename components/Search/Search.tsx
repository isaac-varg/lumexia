"use client"

import { useEffect, useRef, useState } from "react";
import { TbSearch } from "react-icons/tb";
import Fuse from 'fuse.js'

type SearchProps = {
    data: any[],
    keys: string[]
    onClick: (value: string) => void;
}

const Search = ({ data, keys, onClick }: SearchProps) => {
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const [searchInput, setSearchInput] = useState("");
    const [queryResults, setQueryResults] = useState<any[]>([])


    const searchOptions = {
        keys: [...keys],
    }

    const fuse = new Fuse(data, searchOptions)


    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            const searchResults = fuse.search(searchInput, {limit: 9});
            const mappedResults = searchResults.map((s) => s.item);
            setQueryResults(mappedResults);
        }, 400);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchInput]);



    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-xl font-poppins text-neutral-600">Search</span>

            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <span className="text-2xl"><TbSearch /></span>
            </label>



            <ul className="flex flex-col gap-y-2 max-h-80 overflow-y-auto">

                {queryResults.length < 10 && queryResults.map((result) => {
                    return (
                        <li key={result.id} className="font-poppins text-lg  bg-lilac-200 rounded-xl py-2 px-4 hover:cursor-pointer hover:bg-lilac-300" onClick={() => onClick(result.id)}>
                            <span>{result.name}</span>
                        </li>

                    )
                })}

                {queryResults.length > 10 && <p className="font-poppins text-lg ">Try refining your search.</p>}
            </ul>

        </div>

    )
}

export default Search
