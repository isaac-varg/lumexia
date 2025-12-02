// this function really isn't necessary, however, it will be nice for autocompletion and fetches user
import activityLogActions from "@/actions/auxiliary/activityLogActions";
import { getUserId } from "@/actions/users/getUserId";
import { users } from "@/configs/staticRecords/users";

export const createActivityLog = async (
  action: string,
  entityType: string,
  entityId: string,
  details: { [key: string]: any },
  isBot?: boolean,
) => {


  const userId = isBot ? users.lumexia : await getUserId();
  try {
    await activityLogActions.createNew({
      userId,
      action,
      entityType,
      entityId,
      details,
    });
  } catch (error) {
    throw error;
  }
};
