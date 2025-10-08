import userActions from "@/actions/users/userAction"
import Title from "./_components/Title"
import userRoleActions from "@/actions/users/userRoles"
import UserRoles from "./_components/UserRoles";
import { getUser } from "@/actions/users/getUser";

const UserPage = async () => {

  const allRoles = await userRoleActions.getAll();
  const user = await getUser();


  return (
    <div className="flex flex-col gap-y-6">
      <Title />


      <div className="grid grid-cols-3 gap-4">
        <UserRoles allRoles={allRoles} user={user} />
      </div>

    </div>
  )
}

export default UserPage 
