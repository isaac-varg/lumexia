import React from "react";
import SidebarButton from "./SidebarButton";
import { sidebar } from "../../configs/sidebar";
import Image from "next/image";
import icon from "@/configs/assets/icon.svg"
import SidebarGroupTitle from "./SidebarGroupTitle";

const Sidebar: React.FC = () => {
        return (
                <div className="px-4 py-8 shadow-lg min-h-dvh">
                        <div className="flex flex-col gap-y-8">
                                <div className="flex flex-row justify-center items-center ">
                                        <Image
                                                src={icon}
                                                alt="Lumexia icon"
                                                width={100}
                                                height={100}
                                                className="hover:bg-swirl-200 rounded-full p-4 hover:cursor-pointer"
                                        />
                                </div>

                                {sidebar.map((group) => {
                                        return (
                                                <div className="flex flex-col gap-y-3">
                                                        <SidebarGroupTitle>{group.label}</SidebarGroupTitle>
                                                        <div className="flex flex-col gap-y-2">
                                                                {group.contents.map((sidebarItem) => <SidebarButton key={sidebarItem.label} {...sidebarItem} />)}
                                                        </div>

                                                </div>


                                        )
                                })}
                        </div>
                </div>
        );
};

export default Sidebar;


