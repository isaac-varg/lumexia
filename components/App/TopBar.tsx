import prisma from "@/lib/prisma";
import { getUserId } from "@/actions/users/getUserId";
import { staticRecords } from "@/configs/staticRecords";
import ConfigurationStateSetter from "./ConfigurationStateSetter";
import UserIcon from './UserIcon'
import AppQuery from "./AppQuery";
import AppStateSetter from "./AppStateSetter";
import PageBreadcrumbs from "./PageBreadcrumbs";
import ThemeIcon from "../Theme/ThemeIcon";
import ThemeChangerDialog from "../Theme/ThemeChangerDialog";

const TopBar = async () => {


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
      <ThemeChangerDialog />

      <div className="sticky top-0 z-10 flex items-center justify-between bg-base-200 p-4 rounded-lg" >

        <PageBreadcrumbs />


        <div className="flex items-center gap-x-4">

          <ThemeIcon />
          <UserIcon />

        </div>
      </div>


    </>
  );
};

export default TopBar;
