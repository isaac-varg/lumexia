import React, { useState } from 'react'
import useCommandPalletPages from './Commands/Pages'
import CommandButton from './CommandButton'
import { Search } from '../Search'
import useCommandPalletItems from './Commands/Items'
import { Command } from './CommandType'

export type MergedCommandData = Command[]//(Command | Item)[]


const CommandCenter = () => {

    const pages = useCommandPalletPages()
    const items = useCommandPalletItems()
    const [input, setInput] = useState('');
    const mergedData = [...pages, ...items]
    const [results, setResults] = useState<Command[]>([])

    return (
        <div className='flex flex-col gap-y-2'>

            <Search.SearcherUnmanaged
                data={mergedData}
                keys={['label', 'terms']}
                onQueryComplete={setResults}
                input={input}
                setInput={setInput}

            />

            {!input && (
                pages.map((page, index) => {
                    return (
                        <CommandButton command={page} index={index} />
                    )
                })

            )}

            {results && results.map((result, index) => <CommandButton command={result} index={index} />)}

        </div>
    )
}

export default CommandCenter 
