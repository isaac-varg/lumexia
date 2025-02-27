import prisma from "@/lib/prisma";
import { getUserId } from "@/actions/users/getUserId";
import { staticRecords } from "@/configs/staticRecords";
import ConfigurationStateSetter from "./ConfigurationStateSetter";
import SearchbarContent from "./SearchbarContent";
import UserIcon from './UserIcon'
import { TbSettings } from 'react-icons/tb'

const Searchbar = async () => {


    const userId = await getUserId()
    const panelSelections = await prisma.userConfig.findMany({
        where: {
            userId,
            configGroupId: staticRecords.app.userConfigGroups.panelSelections
        },
    });



    return (
        <>
            <ConfigurationStateSetter panelSelections={panelSelections} />
            <div className="flex items-center justify-between bg-neutral-100 p-4 rounded-lg"  >

                <SearchbarContent />

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
