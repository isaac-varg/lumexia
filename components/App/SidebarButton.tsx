"use client";

import { useRouter } from "next/navigation";

interface SidebarButtonProps {
    label: string;
    icon?: JSX.Element;
    path: string;
    badge?: string | number;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ label, icon, path, badge }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(path);
    };


    return (
        <button
            className="px-4 py-2 bg-tasman-100 hover:bg-tasman-200 rounded-lg hover:cursor-pointer flex justify-between items-center text-2xl text-tasman-900"
            onClick={handleClick}
        >
            <div className="flex gap-x-2">
                <span>{icon}</span>
                <span>{label}</span>
            </div>
            {(badge !== undefined && badge !== 0) && (
                <div className="flex items-center text-sm justify-center p-1 font-semibold  w-8 h-8 rounded-full bg-red-400">
                    {badge}                    
                </div>)}
        </button>
    );
};

export default SidebarButton;
