import * as ContextMenu from "@radix-ui/react-context-menu";
import Layout from "../Layout";

const Item = ({
  children,
  shortcut,
  onClick,
}: {
  children: React.ReactNode;
  shortcut?: string | JSX.Element;
  onClick: (event: Event) => void;
}) => {
  return (
    <ContextMenu.Item onSelect={onClick} className="group leading-none text-base-content rounded-lg flex items-center h-auto select-none outline-none data-[disabled]:text-base-content/30 data-disabled:pointer-events-none data-[highlighted]:bg-accent/50 data-[highlighted]:text-accent-content px-2 py-1 w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="font-poppins font-medium text-base">{children}</div>
        <div className="font-poppins font-medium text-sm">{shortcut || ""}</div>
      </div>
    </ContextMenu.Item>
  );
};

export default Item;
