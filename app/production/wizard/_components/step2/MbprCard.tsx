import useProductionWizard from '@/hooks/useProductionWizard'
import { MasterBatchProductionRecord } from '@/types/masterBatchProductionRecord'
import { DateTime } from 'luxon'
import React from 'react'
import MbprForm from './MbprForm'
import useDialog from '@/hooks/useDialog'
import { Action } from '@radix-ui/react-toast'
import ActionButton from '@/components/ActionButton'
import { TbEdit } from 'react-icons/tb'

const MbprCard = ({ mbpr }: { mbpr: MasterBatchProductionRecord }) => {

  const { showDialog } = useDialog();
  const { setSelectedMbpr, selectedMbpr } = useProductionWizard();

  const isSelected = selectedMbpr?.id === mbpr.id

  const handleEdit = (e: any) => {
    e.stopPropagation();
    showDialog(`mbprEdit${mbpr.id}`)
  }

  const handleClick = () => {
    setSelectedMbpr(mbpr)
  }

  const accentColorClasses: Record<string, string> = {
    'inactive': 'bg-neutral-200',
    'active': 'bg-bay-leaf-300',
    'archived': 'bg-orange-300',
  }



  const accentColor = mbpr.recordStatus ? accentColorClasses[mbpr.recordStatus.name] : accentColorClasses.inactive

  return (
    <>
      <MbprForm mode='edit' mbpr={mbpr} />
      <div className={`flex flex-col items-center bg-white ${isSelected ? 'outline outline-2 outline-red-300' : ''} border-2 border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`} onClick={() => handleClick()}>
        <div className={`w-40 rounded-t-lg h-full ${accentColor} `} />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <div className='flex flex-row items-center justify-between'>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mbpr.versionLabel}</h5>
            <div onClick={(e) => handleEdit(e)}><ActionButton size='default' color='cararra' ><span className=''><TbEdit /></span></ActionButton></div>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mbpr.recordStatus?.name}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{DateTime.fromJSDate(mbpr.createdAt).toFormat("DD @t")}</p>
        </div>
      </div>
    </>
  )
}

export default MbprCard

