import { RiUserLine, RiSettingsLine } from "react-icons/ri";

const Searchbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center">
        <span className="text-gray-500 text-sm mr-2">ctrl + K</span>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>
      <div className="flex items-center">
        <RiUserLine className="text-gray-500 text-lg mr-2 cursor-pointer" />
        <RiSettingsLine className="text-gray-500 text-lg cursor-pointer" />
      </div>
    </div>
  );
};

export default Searchbar;
