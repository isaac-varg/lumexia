import prisma from "@/lib/prisma";
import { getUserId } from "@/actions/users/getUserId";
import { staticRecords } from "@/configs/staticRecords";
import UserIcon from './UserIcon'
import ConfigurationStateSetter from "../state/ConfigurationStateSetter";
import SearchbarContent from "./SearchBarContent";
import AppQuery from "../state/AppQuery";
import AppStateSetter from "../state/AppStateSetter";

const SearchBar = async () => {


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
            <AppQuery />
            <AppStateSetter />
            <div className="flex items-center justify-between bg-base-200 p-4 rounded-lg"  >

                <SearchbarContent />

                <div className="flex items-center gap-x-4">
                    <UserIcon />

                </div>
            </div>


        </>
    );
};

export default SearchBar;
