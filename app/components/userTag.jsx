import Image from "next/image";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const UserTag = ({user}) => {
  const { data: session } = useSession();
  return (
    <div>
      
        <div className="flex gap-4">
          <Image
            src={user.image}
            alt="userImage"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <h2 className="text-[14px] font-medium">{user.name}</h2>
            <h2 className="text-[12px]">{user.email}</h2>
          </div>
        </div>
       
    </div>
  );
};

export default UserTag;
