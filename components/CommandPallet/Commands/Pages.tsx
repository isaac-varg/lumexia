import { TbBook2, TbCircle, TbClipboardCheck, TbClipboardHeart, TbCreditCard, TbShoppingBagCheck, TbShoppingBagPlus } from "react-icons/tb"
import { Command } from "../CommandType";
import { BsBox2Heart } from "react-icons/bs";
import { BiGhost } from "react-icons/bi";

const useCommandPalletPages = (): Command[] => {
    const pages: Command[] = [
        {
            id: 'home',
            commandType: 'page',
            shortcut: 'h',
            icon: <BiGhost />,
            label: 'Home',
            path: "/"
        },
        {
            id: 'items',
            commandType: 'page',
            shortcut: 'i',
            icon: <BsBox2Heart />,
            label: 'Items',
            path: "/inventory/items"
        },
        {
            id: 'requests',
            commandType: 'page',
            shortcut: 'r',
            icon: <TbShoppingBagPlus />,
            label: 'Requests',
            path: "/purchasing/requests"
        },
        {
            id: 'purchasing',
            commandType: 'page',
            shortcut: 'p',
            icon: <TbCreditCard />,
            label: 'Purchasing',
            path: "/purchasing/purchase-orders"
        },
        {
            id: 'planning',
            commandType: 'page',
            shortcut: 'n',
            icon: <TbClipboardHeart />,
            label: 'Planning',
            path: "/production/planning"
        },
        {
            id: 'mbpr',
            commandType: 'page',
            shortcut: 'm',
            icon: <TbBook2 />,
            label: 'MBPR',
            path: "/production/mbpr"
        },
        {
            id: 'quality',
            commandType: 'page',
            shortcut: 'q',
            icon: <TbClipboardCheck />,
            label: 'Quality',
            path: "/production/quality"
        },
        {
            id: 'pricing',
            commandType: 'page',
            shortcut: 'c',
            icon: <TbShoppingBagCheck />,
            label: 'Pricing',
            path: "/accounting/pricing"
        },






    ]

    return pages

}

export default useCommandPalletPages
