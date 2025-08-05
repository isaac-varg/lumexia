import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SidebarGroupTitle = ({
    children,
    isSidebarCollapsed,
}: {
    children: React.ReactNode;
    isSidebarCollapsed: boolean;
}) => {
    return (
        <AnimatePresence>
            {!isSidebarCollapsed && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex flex-row capitalize font-semibold tracking-wider font-poppins text-lg text-base-content overflow-hidden whitespace-nowrap"
                >
                    {children}
                </motion.div>
            )}

            {isSidebarCollapsed && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                >
                    <div className="h-1 mb-3 bg-base-300 border-0" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SidebarGroupTitle;
