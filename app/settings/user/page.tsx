import userActions from "@/actions/users/userAction"
import Title from "./_components/Title"
import userRoleActions from "@/actions/users/userRoles"
import UserRoles from "./_components/UserRoles";
import { getUser } from "@/actions/users/getUser";
import { getAllUserConfigs } from "./_actions/getAllConfigs";
import AppConfigurations from "./_components/AppConfigurations";
import { userConfigGroups } from "@/configs/staticRecords/userConfigGroups";

const UserPage = async () => {

  const allRoles = await userRoleActions.getAll();
  const user = await getUser();
  const configs = await getAllUserConfigs(user.id);


  return (
    <div className="flex flex-col gap-y-6">
      <Title />


      <div className="grid grid-cols-3 gap-4">
        <UserRoles allRoles={allRoles} user={user} />
        <AppConfigurations configs={configs.filter(config => config.configGroupId === userConfigGroups.general)} />
      </div>

    </div>
  )
}

export default UserPage 
