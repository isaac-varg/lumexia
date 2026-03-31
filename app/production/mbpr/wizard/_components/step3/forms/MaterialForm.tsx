import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import React, { useEffect, useState } from 'react'
import Heading from '../details/Heading'
import { Search } from '@/components/Search'
import { Item } from '@/actions/inventory/getAllItems'
import { useHotkeys } from 'react-hotkeys-hook';
import { UnmanagedForm } from '@/components/UnmanagedForm'
import { Prisma } from '@prisma/client'
import { productionActions } from '@/actions/production'
import { recordStatuses } from '@/configs/staticRecords/recordStatuses'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'

// TODO this is a biiig file... maybe split it up

const MaterialForm = () => {
  const { materialIdentifierSequence, selectedMbpr, selectedStep, isMaterialFormEdited, materialFormSeletedBomItem, selectedMaterial, isNewForFormPanel, materialItems } = useMbprWizardSelection()
  const { updateSelectedMbprBomItem, addSelectedMbprBomItem, incrementMaterialIdentifierSequence, setMaterialFormSelectedBomItem, setIsMaterialFormEdited, removeBomItem, setFormPanelMode } = useMbprWizardActions()
  const [isSearch, setIsSearch] = useState(isNewForFormPanel)
  const [results, setResults] = useState<Item[]>([])
  const [searcherInput, setSearcherInput] = useState("")
  const [concentrationInput, setConcentrationInput] = useState<string>("");

  const { getMaterialItems } = useMbprWizardActions()

  const handleDelete = async () => {
    if (!selectedMaterial) return;
    await productionActions.mbprs.bom.update(selectedMaterial.id, {
      recordStatusId: recordStatuses.archived,
    });
    if (selectedMbpr) await createActivityLog('Removed BOM Item', 'mbpr', selectedMbpr.id, { context: 'Removed material from BOM' })
    removeBomItem(selectedMaterial.id);
    setFormPanelMode('default');
  }

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

    if (selectedMbpr) await createActivityLog('Updated BOM Item', 'mbpr', selectedMbpr.id, { context: 'Updated material concentration' })
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
      concentration: parseFloat(concentrationInput),
      recordStatusId: recordStatuses.active,
    }

    const item = await productionActions.mbprs.bom.create(payload);

    await createActivityLog('Added BOM Item', 'mbpr', selectedMbpr.id, { context: `Added ${item.item.name} at ${concentrationInput}% w/w` })
    addSelectedMbprBomItem(item);
    incrementMaterialIdentifierSequence()

  }

  useEffect(() => {
    if (materialItems.length === 0) {

      getMaterialItems();
    };

  }, [selectedMaterial, isNewForFormPanel, getMaterialItems, materialItems.length])

  useEffect(() => {

    if (isNewForFormPanel && !materialFormSeletedBomItem) {
      setIsSearch(true)
      return;
    }


    setIsSearch(false)

  }, [isNewForFormPanel, selectedMaterial, materialFormSeletedBomItem])

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
          <button onClick={() => submitData()} className='btn btn-success'>Save</button>
          {!isNewForFormPanel && <button onClick={handleDelete} className='btn btn-error'>Delete</button>}
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
