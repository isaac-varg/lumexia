import { TbSmartHome } from "react-icons/tb";
import { BsBox2Heart, BsBoxSeam } from "react-icons/bs";

export const sidebar = [
	{
		label: "Dashboard",
		icon: <TbSmartHome />,
		path: "/",
	},
	{
		label: "Audit",
		icon: <BsBoxSeam />,
		path: "/inventory/audit",
	},

	{
		label: "Inventory",
		icon: <BsBox2Heart />,
		path: "/inventory",
	},
	{
		label: "Items",
		icon: <TbSmartHome />,
		path: "/inventory/items",
	},
	{
		label: "Purchasing",
		icon: <TbSmartHome />,
		path: "/purchasing/purchase-orders",
	},
	{
		label: "Receiving",
		icon: <TbSmartHome />,
		path: "/receiving/",
	},
	{
		label: "Suppliers",
		icon: <TbSmartHome />,
		path: "/purchasing/suppliers",
	},
];
