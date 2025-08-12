import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import React, { useEffect, useState } from 'react'
import Heading from '../details/Heading'
import { Search } from '@/components/Search'
import { Item } from '@/actions/inventory/getAllItems'
import { useHotkeys } from 'react-hotkeys-hook';
import { UnmanagedForm } from '@/components/UnmanagedForm'
import { Prisma } from '@prisma/client'
import { productionActions } from '@/actions/production'

// TODO this is a biiig file... maybe split it up

const MaterialForm = () => {
  const { materialIdentifierSequence, selectedMbpr, selectedStep, isMaterialFormEdited, materialFormSeletedBomItem, selectedMaterial, isNewForFormPanel, materialItems } = useMbprWizardSelection()
  const { updateSelectedMbprBomItem, addSelectedMbprBomItem, incrementMaterialIdentifierSequence, setMaterialFormSelectedBomItem, setIsMaterialFormEdited } = useMbprWizardActions()
  const [isSearch, setIsSearch] = useState(isNewForFormPanel)
  const [results, setResults] = useState<Item[]>([])
  const [searcherInput, setSearcherInput] = useState("")
  const [concentrationInput, setConcentrationInput] = useState<string>("");

  const { getMaterialItems } = useMbprWizardActions()

  const submitData = () => {

    if (isNewForFormPanel) {
      handleNew()
      return;
    }

    handleUpdate()

  }

  const handleUpdate = async () => {

    if (!selectedMaterial) {
      console.error("One or more MBPR element states were unreachable.")
      return;
    }

    const payload: Prisma.BillOfMaterialUncheckedUpdateInput = {
      ...(materialFormSeletedBomItem
        ? { itemId: materialFormSeletedBomItem.id }
        : {}),
      concentration: parseFloat(concentrationInput),
    }

    const response = await productionActions.mbprs.bom.update(selectedMaterial.id, payload)

    updateSelectedMbprBomItem(selectedMaterial.id, response)


  }

  const handleNew = async () => {

    if (!materialFormSeletedBomItem || !selectedMbpr || !selectedStep) {
      console.error('One of more MBPR elements states were unreachable.');
      return;
    };



    const payload: Prisma.BillOfMaterialUncheckedCreateInput = {
      itemId: materialFormSeletedBomItem.id,
      mbprId: selectedMbpr.id,
      stepId: selectedStep.id,
      identifier: `${materialIdentifierSequence + 1}`,
      concentration: parseFloat(concentrationInput)
    }

    const item = await productionActions.mbprs.bom.create(payload);

    addSelectedMbprBomItem(item);
    incrementMaterialIdentifierSequence()

  }

  useEffect(() => {
    if (materialItems.length === 0) {

      getMaterialItems();
    };

  }, [selectedMaterial, isNewForFormPanel])

  useEffect(() => {

    if (isNewForFormPanel && !materialFormSeletedBomItem) {
      setIsSearch(true)
      return;
    }


    setIsSearch(false)

  }, [isNewForFormPanel, selectedMaterial])

  useEffect(() => {
    const value = selectedMaterial ? selectedMaterial.concentration : 0
    setConcentrationInput(`${value}`)
  }, [selectedMaterial])


  useHotkeys('return', () => { setMaterialFormSelectedBomItem(results[0]); setIsSearch(false); }, { enableOnFormTags: true, preventDefault: true })



  return (
    <div className='flex flex-col gap-y-6'>

      <div className='flex flex-col'>
        <Heading>Actions</Heading>
        <div className='flex flex-col gap-y-1'>
          {/* {!isNewForFormPanel && <button className='btn btn-warning'>Delete Material</button>} */}
          <button onClick={() => submitData()} className='btn btn-success'>Save</button>
          <button className='btn btn-info' onClick={() => { setIsSearch(true); setMaterialFormSelectedBomItem(null); setSearcherInput(""); setResults([]); setIsMaterialFormEdited(true) }}>Change Material</button>
        </div>
      </div>


      <div className='flex flex-col gap-y-4'>
        <Heading>Material</Heading>

        {isMaterialFormEdited && <p className='font-poppins text-base text-base-content font-medium'>{materialFormSeletedBomItem?.name}</p>}

        {(!isSearch && (materialFormSeletedBomItem || selectedMaterial) && !isMaterialFormEdited) && (<p className='font-poppins text-base text-base-content font-medium'>{!isNewForFormPanel ? selectedMaterial?.item.name : materialFormSeletedBomItem?.name}</p>)}

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
                    onClick={() => { setMaterialFormSelectedBomItem(result); setIsSearch(false) }}
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
        <Heading>Concentration w/w %</Heading>

        <UnmanagedForm.Number
          placeholder='Set concentration'
          input={concentrationInput}
          onChangeOutput={setConcentrationInput}
        />

      </div>

    </div>
  )
}

export default MaterialForm
