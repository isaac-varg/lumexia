import React from 'react'
import useCommandPalletPages from './Commands/Pages'
import { Search } from '../Search'

export type CommandType = "page"

const CommandCenter = () => {

    const pages = useCommandPalletPages()
    const dummyArray = [{ cat: 'calico', name: 'liv' }, { cat: 'domestic long hair', name: 'holdito' }]

    const mergedData = [...pages, ...dummyArray]

    return (
        <div className='flex flex-col gap-y-2'>

            <Search.Searcher
                data={mergedData}
                keys={['cat', 'label']}
                onQueryComplete={(value) => console.log(value)}
            />

            

            {pages.map((page) => {
                return (
                    <div key={page.id}>
                        {page.label}
                    </div>
                )
            })}

        </div>
    )
}

export default CommandCenter 
