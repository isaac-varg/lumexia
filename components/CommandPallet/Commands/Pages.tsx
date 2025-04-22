import { TbBook2, TbCircle, TbClipboardCheck, TbClipboardHeart, TbCreditCard, TbShoppingBagCheck, TbShoppingBagPlus } from "react-icons/tb"
import { Command } from "../CommandType";
import { BsBox2Heart } from "react-icons/bs";
import { BiGhost } from "react-icons/bi";

const useCommandPalletPages = (): Command[] => {
    const pages: Command[] = [
        {
            id: 'home',
            commandType: 'page',
            shortcut: 'shift+h',
            icon: <BiGhost />,
            label: 'Home',
            path: "/"
        },
        {
            id: 'items',
            commandType: 'page',
            shortcut: 'shift+i',
            icon: <BsBox2Heart />,
            label: 'Items',
            path: "/inventory/items"
        },
        {
            id: 'requests',
            commandType: 'page',
            shortcut: 'shift+r',
            icon: <TbShoppingBagPlus />,
            label: 'Requests',
            path: "/purchasing/requests"
        },
        {
            id: 'purchasing',
            commandType: 'page',
            shortcut: 'shift+p',
            icon: <TbCreditCard />,
            label: 'Purchasing',
            path: "/purchasing/purchase-orders"
        },
        {
            id: 'planning',
            commandType: 'page',
            shortcut: 'shift+n',
            icon: <TbClipboardHeart />,
            label: 'Planning',
            path: "/production/planning"
        },
        {
            id: 'mbpr',
            commandType: 'page',
            shortcut: 'shift+m',
            icon: <TbBook2 />,
            label: 'MBPR',
            path: "/production/mbpr"
        },
        {
            id: 'quality',
            commandType: 'page',
            shortcut: 'shift+q',
            icon: <TbClipboardCheck />,
            label: 'Quality',
            path: "/production/quality"
        },
        {
            id: 'pricing',
            commandType: 'page',
            shortcut: 'shift+c',
            icon: <TbShoppingBagCheck />,
            label: 'Pricing',
            path: "/accounting/pricing"
        },






    ]

    return pages

}

export default useCommandPalletPages
