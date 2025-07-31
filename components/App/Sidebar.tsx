'use client'
import React from "react";
import SidebarButton from "./SidebarButton";
import { sidebar } from "../../configs/sidebar";
import Image from "next/image";
import logo from "@/configs/assets/logo.png"
import SidebarGroupTitle from "./SidebarGroupTitle";
import { useAuditRequest } from "@/hooks/appQuery/useAuditRequest";
import { useAllPurchasingRequests } from "@/hooks/appQuery/useAllPurchasingRequests";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

const Sidebar = () => {

    const { data: auditRequests } = useAuditRequest();
    const { data: purchasingRequests } = useAllPurchasingRequests();

    return (
        <div className="px-4 pt-2 pb-8 shadow-xl shadow-neutral-300 z-40 min-h-dvh">



            {/* 

                <div className="flex w-full justify-between">

                    <div className="flex justify-start items-center gap-x-2">

                        <Image
                            src={logo}
                            alt="Lumexia Logo"
                            width={75}
                            height={75}
                            className="hover:bg-swirl-200 rounded-full p-4 hover:cursor-pointer"
                        />


                        <h1 className="font-poppins text-sm uppercase tracking-wide font-semibold">lumexia</h1>

                        <div>
                            <TbLayoutSidebarLeftExpand />
                        </div>

                    </div>
                </div>
*/}



            <div className="flex flex-col gap-y-8">

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


