import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserInfo = ({ userInfo }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const onLogout = () => {
    signOut();
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center">
      <Image
        src={userInfo.image}
        alt="userImage"
        width={100}
        height={100}
        className="rounded-full"
      />
      <h2 className="text-[30px] font-semibold">{userInfo.name}</h2>
      <h2 className=" text-gray-400">{userInfo.email}</h2>
      <div className="flex">
        <button className="rounded-full  bg-gray-200 p-3 mr-5 mt-5 font-semibold text-black">
          Share
        </button>

        {session?.user.email === userInfo.email ? (
           <button className="rounded-full  bg-gray-200 p-3 mr-5 mt-5 font-semibold text-black">
           {" "}
           Edit Profile
         </button>
        ) : null}
       
        {session?.user.email === userInfo.email ? (
          <button
            className="rounded-full  bg-gray-200 p-3 mr-5 mt-5 font-semibold text-black"
            onClick={onLogout}
          >
            {" "}
            Log Out
          </button>
        ) : null}{" "}
      </div>
    </div>
  );
};

export default UserInfo;
