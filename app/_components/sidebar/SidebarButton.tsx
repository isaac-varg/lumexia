"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarButtonProps {
  label: string;
  icon?: JSX.Element;
  path: string;
  badge?: string | number;
  isSidebarCollapsed: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  label,
  icon,
  path,
  badge,
  isSidebarCollapsed,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      className={`btn btn-lg flex w-full ${isSidebarCollapsed ? "justify-center px-0" : "justify-between pl-4 pr-8"
        } py-2`}
      onClick={handleClick}
    >
      <div className="flex gap-x-2 items-center">
        <span>{icon}</span>
        <AnimatePresence>
          {!isSidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {!isSidebarCollapsed && badge !== undefined && badge !== 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center text-xs text-center justify-center p-1 font-semibold w-8 h-8 rounded-full bg-accent"
          >
            <span className="text-accent-content">{badge}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default SidebarButton;
