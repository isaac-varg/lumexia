import { useEffect } from 'react'
import { useCommandPalletActions, useCommandPalletSelection } from '@/store/commandPalletSlice'
import { Item } from '@/actions/inventory/getAllItems'
import { Command } from '../CommandType'
import { getItemCommand } from './getItemCommand'

const useCommandPalletItems = (): Command[] => {

    const { items } = useCommandPalletSelection()
    const { getItems } = useCommandPalletActions()

    useEffect(() => {
        if (items.length === 0) {
            getItems()
        }
    })

    const commandItems = items.map((item) => getItemCommand(item))


    
    return commandItems 

}

export default useCommandPalletItems
