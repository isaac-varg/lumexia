import { RiUserLine, RiSettingsLine } from "react-icons/ri";
import UserIcon from "./UserIcon";

const Searchbar: React.FC = async () => {

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center">
        <span className="text-gray-500 text-sm font-medium mr-4 font-poppins">CTRL + K</span>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <UserIcon />
        <RiSettingsLine className="text-gray-700 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Searchbar;
