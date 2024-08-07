import React from "react";
import SidebarButton from "./SidebarButton";
import { sidebar } from "../../configs/sidebar";

const Sidebar: React.FC = () => {
  return (
    <div className="px-4 py-8 shadow-lg h-full ">
      <div className="flex flex-col gap-y-4">
        {sidebar.map((buttonData) => (
          <SidebarButton key={buttonData.label} {...buttonData} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
