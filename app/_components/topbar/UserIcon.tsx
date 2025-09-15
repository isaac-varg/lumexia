import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { RiUserLine } from "react-icons/ri";

const UserIcon = async () => {
    const session = await auth();

    if (!session) {
        redirect("/api/auth/signin")
    }

    if (!session)
        return (
            <form
                action={async () => {
                    "use server";
                    await signIn();
                }}
            >
                <button className="flex items-center" type="submit">
                    <RiUserLine className="text-gray-700 text-2xl mr-2 cursor-pointer" />
                </button>
            </form>
        );



    return (
        <div className="w-8 h-8 ">
            {session?.user?.image ? (
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button type="submit">
                        <Image
                            className="rounded-full"
                            src={session.user.image}
                            alt="User Avatar"
                            width={32}
                            height={32}
                        />
                    </button>
                </form>
            ) : (
                <RiUserLine className="text-gray-700 text-2xl mr-2 cursor-pointer" />
            )}
        </div>
    );
};

export default UserIcon;
