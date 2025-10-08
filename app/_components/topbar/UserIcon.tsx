'use client'
import UserIcon from "@/components/UI/UserIcon";
import { useAppSelection } from "@/store/appSlice";
import { useRouter } from "next/navigation";
import React from "react";

const User = () => {

  const { user } = useAppSelection()
  const router = useRouter();



  return (
    <div onClick={() => router.push('/settings/user')} className="">

      <UserIcon image={user?.image || ''} name={user?.name || ''} isHoverable={true} />
    </div>
  );
};

export default User;
