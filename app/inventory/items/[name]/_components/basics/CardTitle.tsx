"use client"
import ActionButton from '@/components/ActionButton'
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import useDialog from '@/hooks/useDialog'
import { Item } from '@/types/item'
import React from 'react'
import { TbEdit } from 'react-icons/tb'
import ItemEditForm from './ItemEditForm'
import { ItemEditSelectables } from '../../page'

const BasicsCardTitle = ({item, itemEditSelectables} : { item: Item, itemEditSelectables: ItemEditSelectables }) => {

  const { showDialog } = useDialog();

  return (
    <>

      <ItemEditForm item={item} itemEditSelectables={itemEditSelectables}/>
      <Layout.Row>
        <Card.Title>Basic Details</Card.Title>
        <ActionButton color="cararra" onClick={() => showDialog("editItem")}>
          <TbEdit />
        </ActionButton>
      </Layout.Row>
    </>
  )
}

export default BasicsCardTitle
