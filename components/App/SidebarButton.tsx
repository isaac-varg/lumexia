"use client";

import { useRouter } from "next/navigation";

interface SidebarButtonProps {
  label: string;
  icon?: JSX.Element;
  path: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ label, icon, path }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
  };
  return (
    <button
      className="px-4 py-2 bg-tasman-100 hover:bg-tasman-200 rounded-lg hover:cursor-pointer flex gap-x-2 items-center text-2xl text-tasman-900"
      onClick={handleClick}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default SidebarButton;
