'use client'
import Text from '@/components/Text'
import { DateTime } from 'luxon'
import React, { useMemo, useState } from 'react'
import { updateRequest } from '../_functions/updateRequest'
import { RequestStatus } from '../_functions/getRequestStatuses'
import { RequestPriority } from '../../_functions/getPriorities'
import Card from '@/components/Card'
import SectionTitle from '@/components/Text/SectionTitle'
import { TbPlus, TbX } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import { SupplierTag } from '../_functions/getSupplierTags'
import SearcherUnmanaged from '@/components/Search/SearcherUnmanaged'
import { RequestSupplier } from '../_functions/getSuppliers'
import { createSupplierTag } from '../_functions/createSupplierTag'
import { deleteSupplierTag } from '../_functions/deleteSupplierTag'

type BasicDetailsPanelProps = {
  requestingUser: string
  statusId: string;
  statusName: string
  priorityName: string
  requestDate: Date
  requestId: string
  allStatuses: RequestStatus[]
  allPriorities: RequestPriority[]
  priorityId: string;
  supplierTags: SupplierTag[]
  suppliers: RequestSupplier[]
}


const BasicDetailsPanel = ({ suppliers, supplierTags, requestingUser, priorityId, requestDate, requestId, allStatuses, allPriorities, statusId }: BasicDetailsPanelProps) => {

  const [isEditStatus, setIsEditStatus] = useState(false);
  const router = useRouter()
  const [isEditPriority, setIsEditPriority] = useState(false);
  const [isAddTag, setIsAddTag] = useState(false);
  const currentStatus = useMemo(() => {
    return allStatuses.find(s => s.id === statusId);
  }, [statusId]);
  const currentPriority = useMemo(() => {
    return allPriorities.find(p => p.id === priorityId);
  }, [priorityId]);
  const [tagInput, setTagInput] = useState('');
  const [tagResults, setTagResults] = useState<RequestSupplier[]>([]);

  const handleTagDelete = async (id: string) => {
    await deleteSupplierTag(id);
    router.refresh()
  }

  const handlePriorityOption = async (value: string) => {
    await updateRequest(requestId, { priorityId: value })
    setIsEditPriority(false)
    router.refresh()
  };

  const handleStatusOptions = async (value: string) => {
    await updateRequest(requestId, { statusId: value })
    setIsEditStatus(false)
    router.refresh()
  }

  const handleTagAdd = async (supplierId: string) => {
    await createSupplierTag({
      purchasingRequestId: requestId,
      supplierId,
    });
    setIsAddTag(false);
    setTagInput("");
    router.refresh()
  }


  return (
    <div className='flex flex-col gap-2'>
      <SectionTitle>Basics</SectionTitle>
      <Card.Root>

        {!isEditPriority && !isEditStatus && !isAddTag && (<div className='flex flex-col gap-2'>
          <Text.LabelDataPair label='Requesting User' data={requestingUser} />
          <Text.LabelDataPair label='Request On' data={DateTime.fromJSDate(requestDate).toFormat('dd MMM yyyy \'at\' hh:mm a')} />

          <Text.LabelDataPair label='Status'>
            <button onClick={() => setIsEditStatus(true)} className={`btn btn-md btn-accent`}>{currentStatus?.name}</button>
          </Text.LabelDataPair>

          <Text.LabelDataPair label='Priority'>
            <button onClick={() => setIsEditPriority(true)} className={`btn btn-md btn-secondary`}>{currentPriority?.name}</button>
          </Text.LabelDataPair>

          <div className='flex flex-col gap-1 border-dotted border-b-base-content/60 rounded-tr-xl rounded-tl-xl py-1 px-2'>
            <div className='flex justify-between'>
              <label className={`font-inter font-medium text-lg text-base-content hover:cursor-pointer`}>
                Supplier Tags
              </label>
              <button onClick={() => setIsAddTag(true)} className='btn btn-secondary btn-circle btn-md'>
                <TbPlus className='size-4' />
              </button>
            </div>

            <div className='grid grid-cols-2 gap-1'>

              {supplierTags.map(s => {
                return (
                  <button className='btn btn-accent' key={s.id} onClick={() => handleTagDelete(s.id)}>
                    {s.supplier.name}
                  </button>
                )
              })}
            </div>

          </div>


        </div>)}


        {isEditStatus && (
          <div className='flex flex-col gap-4'>
            <div className='flex justify-end'>
              <button className='btn btn-outline btn-error' onClick={() => setIsEditStatus(false)}><TbX className='size-4' /> </button>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              {allStatuses.map(s => {
                return (
                  <button key={s.id} className='btn btn-h-20' onClick={() => handleStatusOptions(s.id)}>
                    {s.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {isEditPriority && (
          <div className='flex flex-col gap-4'>
            <div className='flex justify-end'>
              <button className='btn btn-outline btn-error' onClick={() => setIsEditPriority(false)}><TbX className='size-4' /> </button>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              {allPriorities.map(p => {
                return (
                  <button key={p.id} className='btn btn-h-20' onClick={() => handlePriorityOption(p.id)}>
                    {p.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {isAddTag && (
          <div className='flex flex-col gap-4 max-h-[400px]'>
            <SearcherUnmanaged
              data={suppliers}
              keys={['name']}
              input={tagInput}
              setInput={setTagInput}
              onQueryComplete={setTagResults}
            />

            <div className='grid grid-cols-1 gap-1 overflow-auto'>
              {tagResults.map(t => {
                return (
                  <button
                    key={t.id}
                    className='btn btn-accent btn-soft'
                    onClick={() => handleTagAdd(t.id)}
                  >
                    {t.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}

      </Card.Root>
    </div>
  )
}

export default BasicDetailsPanel
