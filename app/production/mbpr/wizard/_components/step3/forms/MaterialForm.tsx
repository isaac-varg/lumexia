import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import React, { useEffect, useState } from 'react'
import Heading from '../details/Heading'
import { Search } from '@/components/Search'
import { Item } from '@/actions/inventory/getAllItems'
import { useHotkeys } from 'react-hotkeys-hook';
import { UnmanagedForm } from '@/components/UnmanagedForm'

// TODO this is a biiig file... maybe split it up

const MaterialForm = () => {
    const { selectedMaterial, isNewForFormPanel, materialItems } = useMbprWizardSelection()
    const [isSearch, setIsSearch] = useState(isNewForFormPanel)
    const [selectedBomItem, setSelectedBomItem] = useState<Item | null>(null)
    const [results, setResults] = useState<Item[]>([])
    const [searcherInput, setSearcherInput] = useState("")
    const [concentration, setConcentration] = useState(selectedMaterial ? selectedMaterial.concentration : 0)

    const { getMaterialItems } = useMbprWizardActions()

    useEffect(() => {
        if (materialItems.length === 0) {

            getMaterialItems();
        };
    }, [selectedMaterial, isNewForFormPanel])

    useHotkeys('return', () => { setSelectedBomItem(results[0]); setIsSearch(false); }, { enableOnFormTags: true, preventDefault: true })



    return (
        <div className='flex flex-col gap-y-6'>

            <div className='flex flex-col'>
                <Heading>Actions</Heading>
                <div className='flex flex-col gap-y-1'>
                    {/* {!isNewForFormPanel && <button className='btn btn-warning'>Delete Material</button>} */}
                    <button onClick={() => console.log(concentration)}>hey</button>
                    <button className='btn btn-success'>Save</button>
                    <button className='btn btn-info' onClick={() => { setIsSearch(true); setSelectedBomItem(null); setSearcherInput(""); setResults([]) }}>Change Material</button>
                </div>
            </div>


            <div className='flex flex-col gap-y-4'>
                <Heading>Material</Heading>

                {(!isSearch && (selectedBomItem || selectedMaterial)) && (<p className='font-poppins text-base text-neutral-800 font-medium'>{!isNewForFormPanel ? selectedMaterial?.item.name : selectedBomItem?.name}</p>)}

                {isSearch && (
                    <div>
                        <Search.SearcherUnmanaged
                            onQueryComplete={setResults}
                            input={searcherInput}
                            setInput={setSearcherInput}
                            data={materialItems}
                            keys={["name", "flatAliases"]}
                        />

                        <ul className='flex flex-col gap-y-1'>
                            {results.map((result, index) => {
                                const isFirst = index === 0
                                return (
                                    <li
                                        onClick={() => { setSelectedBomItem(result); setIsSearch(false) }}
                                        key={result.id}
                                        className={`${isFirst ? 'bg-lilac-400' : 'bg-lilac-200'} hover:bg-lilac-400 hover:cursor-pointer rounded-xl px-4 py-2 font-poppins text-base font-normal`}>
                                        {result.name}
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                )}

            </div>


            <div className='flex flex-col gap-y-4'>
                <Heading>Material</Heading>

                <UnmanagedForm.Number
                    placeholder='Set concentration'
                    onChangeOutput={setConcentration}
                />

            </div>

        </div>
    )
}

export default MaterialForm
