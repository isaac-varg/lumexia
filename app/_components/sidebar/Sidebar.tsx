'use client'
import React from "react";
import { useAuditRequest } from "@/hooks/appQuery/useAuditRequest";
import { useAllPurchasingRequests } from "@/hooks/appQuery/useAllPurchasingRequests";
import { sidebarElements } from "./sidebar.config";
import SidebarGroupTitle from "./SidebarGroupTitle";
import SidebarButton from "./SidebarButton";
import SidebarHeader from "./SidebarHeader";
import { useAppSelection } from "@/store/appSlice";

const Sidebar = () => {

    const { data: auditRequests } = useAuditRequest();
    const { data: purchasingRequests } = useAllPurchasingRequests();
    const { isSidebarCollapsed } = useAppSelection()

    return (
        <div className="px-4 pt-2 pb-8 shadow-xl bg-base-100 shadow-base-300 z-40 min-h-dvh">

            <SidebarHeader />



            <div className="flex flex-col gap-y-8">

                {sidebarElements.map((group) => {

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


