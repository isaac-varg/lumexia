"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import { TbSearch } from "react-icons/tb";
import Fuse from 'fuse.js'

const classes = {
  display: {
    list: "flex flex-col gap-y-2 h-full",
    listShort: "flex flex-col gap-y-2 max-h-90 overflow-y-auto",
  },
  resultItem: {
    base: "font-poppins text-lg bg-base-200 rounded-xl py-2 px-4 hover:cursor-pointer hover:bg-secondary/40",
    elevated: 'font-inter text-lg bg-base-300/90 border border-neutral rounded-xl py-2 px-4 hover:cursor-pointer hover:bg-primary/50',
  }
}

type SearchProps = {
  data: any[],
  keys: string[]
  onClick: (value: any) => void;
  title?: boolean
  display?: keyof typeof classes.display;
  resultItem?: keyof typeof classes.resultItem;
  returnObject?: boolean;
}

const Search = ({ data, keys, onClick, title = true, display = "listShort", resultItem = 'base', returnObject = false }: SearchProps) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [queryResults, setQueryResults] = useState<any[]>([])


  const fuse = useMemo(() => {
    const searchOptions = {
      keys: [...keys],
    }
    return new Fuse(data, searchOptions)
  }, [data, keys])


  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const searchResults = fuse.search(searchInput, { limit: 9 });
      const mappedResults = searchResults.map((s) => s.item);
      setQueryResults(mappedResults);
    }, 400);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchInput, fuse]);



  return (
    <div className="flex flex-col gap-y-4 w-full">
      {title && <span className="text-xl font-poppins text-base-content">Search</span>}

      <label className="input input-bordered flex items-center gap-2 w-full">
        <input type="text" className="flex-grow" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <span className="text-2xl"><TbSearch /></span>
      </label>

      <ul className={`${classes.display[display]}`}>

        {queryResults.length < 10 && queryResults.map((result) => {
          return (
            <li key={result.id} className={`${classes.resultItem[resultItem]}`} onClick={() => onClick(returnObject ? result : result.id)}>
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
