import prisma from "@/lib/prisma";
import { getUserId } from "@/actions/users/getUserId";
import UserIcon from './UserIcon'
import ConfigurationStateSetter from "../state/ConfigurationStateSetter";
import AppQuery from "../state/AppQuery";
import AppStateSetter from "../state/AppStateSetter";
import ThemeChangerDialog from "@/components/Theme/ThemeChangerDialog";
import PageBreadcrumbs from "./PageBreadcrumbs";
import ThemeIcon from "@/components/Theme/ThemeIcon";
import { userConfigGroups } from "@/configs/staticRecords/userConfigGroups";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Motions from "./Motions";

const TopBar = async () => {


  const userId = await getUserId()
  const panelSelections = await prisma.userConfig.findMany({
    where: {
      userId,
      configGroupId: userConfigGroups.panelselections
    },
  });

  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <>
      <ConfigurationStateSetter panelSelections={panelSelections} />
      <AppQuery />
      <AppStateSetter />
      <ThemeChangerDialog />

      <div className="sticky top-0 z-10 flex items-center justify-between bg-base-200 py-4  rounded-lg" >

        <PageBreadcrumbs />


        <div className="flex items-center gap-x-4">

          <Motions />
          <ThemeIcon />
          <UserIcon />

        </div>
      </div>


    </>
  );
};

export default TopBar;
