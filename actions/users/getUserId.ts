"use server";

import { auth } from "@/auth";
import userActions from "./userAction";

export const getUserId = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    throw new Error("No session found");
  }

  const user = await userActions.getOne(undefined, {
    email: session.user.email,
  });

return user.id;
};
