import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ContextMenu from "../ContextMenu";

const TabTrigger = ({
    identifier,
    label,
}: {
    identifier: string;
    label: string;
}) => {
    return (
        <ContextMenu.Root>

            <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-md leading-none text-limed-spruce-900 font-poppins font-bold select-none first:rounded-tl-md last:rounded-tr-md hover:text-limed-spruce-300  data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:bg-limed-spruce-800 data-[state=active]:text-white outline-none cursor-default"
                value={identifier}
            >

                <ContextMenu.Trigger>

                    {label}

                </ContextMenu.Trigger>
            </Tabs.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item onClick={() => console.log('herasd')}>hey</ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Root>
    );
};

export default TabTrigger;
