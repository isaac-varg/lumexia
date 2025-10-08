'use client'
import UserIcon from "@/components/UI/UserIcon";
import { useAppSelection } from "@/store/appSlice";
import { useRouter } from "next/navigation";
import React from "react";

const User = () => {

  const { user } = useAppSelection()
  const router = useRouter();



  return (
    <UserIcon onClick={() => router.push('/settings/user')} image={user?.image || ''} name={user?.name || ''} isHoverable={true} />
  );
};

export default User;
