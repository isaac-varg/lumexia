import { RiUserLine, RiSettingsLine } from "react-icons/ri";
import UserIcon from "./UserIcon";
import { BiSearchAlt } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { CommandMenu } from "../CommandMenu/CommandMenu";

const Searchbar: React.FC = async () => {

  return (
    <>
      <CommandMenu />
    <div className="flex items-center justify-between bg-neutral-100 p-4 rounded-lg">
      <div className="flex gap-x-4 items-center text-neutral-400">
        <span className="text-2xl"><BiSearchAlt /></span>
        <span className="text-md font-medium font-poppins">CTRL + K</span>
        <input
          type="text"
          placeholder="Search..."
          className="font-poppins font-medium text-md bg-transparent outline-none"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <UserIcon />
        <div className="flex items-center justify-center bg-neutral-300 rounded-full w-8 h-8 p-1 hover:bg-neutral-400 hover:text-neutral-600 hover:cursor-pointer">
          <TbSettings className="text-gray-500 text-2xl  " />

          </div>
      </div>
    </div>
    </>
  );
};

export default Searchbar;
