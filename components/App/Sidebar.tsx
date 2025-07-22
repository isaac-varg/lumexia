'use client'
import React from "react";
import SidebarButton from "./SidebarButton";
import { sidebar } from "../../configs/sidebar";
import Image from "next/image";
import icon from "@/configs/assets/icon.svg"
import SidebarGroupTitle from "./SidebarGroupTitle";
import { useAuditRequest } from "@/hooks/appQuery/useAuditRequest";
import { useAllPurchasingRequests } from "@/hooks/appQuery/useAllPurchasingRequests";

const Sidebar = () => {

    const { data: auditRequests } = useAuditRequest();
    const { data: purchasingRequests } = useAllPurchasingRequests();

    return (
        <div className="px-4 py-8 shadow-lg min-h-dvh">
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-row  justify-center items-center ">
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
                        <div key={group.label} className="flex flex-col gap-y-3">
                            <SidebarGroupTitle>{group.label}</SidebarGroupTitle>
                            <div className="flex flex-col gap-y-2">
                                {group.contents.map((sidebarItem) => {

                                    let badgeData: number | string | undefined;

                                    switch (sidebarItem.label) {
                                        case 'Audit':
                                            badgeData = auditRequests
                                            break;
                                        case 'Requests':
                                            badgeData = purchasingRequests
                                            break;
                                        default:
                                            break;
                                    }
                                    return (
                                        <SidebarButton key={sidebarItem.label} {...sidebarItem} badge={badgeData} />
                                    )
                                })}
                            </div>

                        </div>


                    )
                })}
            </div>
        </div>
    );
};

export default Sidebar;


