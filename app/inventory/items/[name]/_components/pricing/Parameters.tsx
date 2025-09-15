import React, { useState } from 'react'
import { TbEdit } from 'react-icons/tb'
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import { useItemSelection } from '@/store/itemSlice'
import FormMode from './ParameterFormMode'
import ViewMode from './ParametersViewMode'

const Parameters = () => {

  const [mode, setMode] = useState<'view' | 'edit'>('view')

  return (
    <Card.Root>
      <Layout.Row>
        <Card.Title>Item Properties</Card.Title>
        <button onClick={() => setMode('edit')} className="btn btn-primary btn-outline btn-circle">
          <TbEdit className="text-xl" />
        </button>
      </Layout.Row>


      {mode === 'edit' && <FormMode setMode={setMode} />}
      {mode === 'view' && <ViewMode />}

    </Card.Root >
  )
}

export default Parameters 
