import { TbCircle } from "react-icons/tb"
import { Command } from "../CommandType";

const useCommandPalletPages = (): Command[] => {
    const pages: Command[] = [
        {
            id: 'inventory',
            commandType: 'page',
            shortcut: 'i',
            icon: <TbCircle />,
            label: 'Inventory',
        },
    ]

    return pages

}

export default useCommandPalletPages
