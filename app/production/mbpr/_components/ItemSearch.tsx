"use client"

import { Item } from "@/types/item";
import FuzzySearch from "fuzzy-search";
import { useEffect, useState } from "react"

export interface ItemDataForSearch extends Item {
  mergedAliases: string
}

const ItemSearch = ({ items, onSelection }: { items: ItemDataForSearch[], onSelection: (item: Item) => void }) => {
  const [searchInput, setSearchInput] = useState('')
  const [results, setResults] = useState<ItemDataForSearch[]>([])

  const searcher = new FuzzySearch(items, [
    "referenceCode",
    "name",
    "mergedAliases"
  ]);

  const handleItemClick = (item: Item) => {
    onSelection(item);
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
          {results.map((item) => (
            <li className="border-2 rounded-lg px-4 py-2" key={item.id} onClick={() => handleItemClick(item)}>
              <p>{`${item.name} ${item.mergedAliases.length < 1 ? "" :  `(${item.mergedAliases})`}`} </p>
            </li>
          ))}
        </div>
      </ul>

    </div>
  )
}

export default ItemSearch
