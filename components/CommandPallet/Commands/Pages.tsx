import { TbCircle } from "react-icons/tb"
import { CommandType } from "../CommandCenter";

export type CommandPalletPage = {
       id: string;
       type: CommandType; 
       shortcut: string;
       icon: JSX.Element;
       label: string;
    }

const useCommandPalletPages = (): CommandPalletPage[] => {
    

    const pages: CommandPalletPage[] = [
        {
            id: 'inventory',
            type: 'page',
            shortcut: 'i',
            icon: <TbCircle />,
            label: 'Inventory',
        }
    ]

    return pages

}

export default useCommandPalletPages
