import Image from "next/image";
import React from "react";
import { default as UserTag } from "../userTag";
import { useRouter } from "next/navigation";

const PinItem = ({ pinValue }) => {
  const router = useRouter();
  console.log(pinValue)
  const user = {
    name: pinValue.name,
    image: pinValue.userImage,
  };
  console.log(user);
  return (
    <div className="">
      <div
        className="relative 
       before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-gray-600 
       before:opacity-50
       cursor-pointer
       "
        onClick={() => router.push("/pin/"+pinValue.id)}
      >
        <Image
          src={pinValue.imageUrl}
          alt={pinValue.title}
          height={250}
          width={250}
          style={{ width: "100%" }}
          className="rounded-3xl 
        cursor-pointer relative z-0"
        />
      </div>
      <h2
        className="font-bold 
        text-[18px] mb-1 mt-2 line-clamp-2"
      >
        {pinValue.title}
      </h2>
      <UserTag user={user} />
    </div>
  );
};

export default PinItem;
