import { TbSmartHome } from "react-icons/tb";
import { BsBox2Heart } from "react-icons/bs";

export const sidebar = [
    {
        label: "Dashboard",
        icon: <TbSmartHome/>,
        path: "/"
    },
    {
        label: "Inventory",
        icon: <BsBox2Heart/>,
        path: "/inventory"
    },
    {
        label: "Items",
        icon: <TbSmartHome/>,
        path: "/inventory/items"
    },
    {
        label: "Calendar",
        icon: <TbSmartHome/>,
        path: "/"
    },
    {
        label: "Team",
        icon: <TbSmartHome/>,
        path: "/"
    }
]