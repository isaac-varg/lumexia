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
            className="btn btn-lg  pl-4 pr-8 py-2 flex justify-between"
            onClick={handleClick}
        >
            <div className="flex gap-x-2 items-center">
                <span>{icon}</span>
                <span>{label}</span>
            </div>
            {(badge !== undefined && badge !== 0) && (
                <div className="flex items-center text-sm justify-center p-1 font-semibold  w-8 h-8 rounded-full bg-accent">
                    <span className="text-accent-content"> {badge}</span>
                </div>)}
        </button>
    );
};

export default SidebarButton;
