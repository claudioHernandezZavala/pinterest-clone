"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import pinterestLogo from "../assets/pinterest.png";
import man_logo from "../assets/man.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { initializeApp } from "firebase/app";
import { getFirestore , doc, setDoc } from "firebase/firestore";
import app from "../Shared/firebaseConfig"
import { collection, addDoc } from "firebase/firestore"; 
import { useRouter } from "next/navigation";
import {default as PinBuilder} from "../pin-builder/page"
const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    saveUserInfo();
  }, [session])
  
  const db = getFirestore(app);
  const saveUserInfo = async ()=>{
    if(session?.user){
      try {
         await setDoc(doc(db, "users",session.user.email??""), {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image
        });
        //console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    }
  }

  return (
    // navbar
    <div className="flex gap-3 items-center p-6 md:gap-2">
      <Image
        alt="logo"
        width={50}
        onClick={()=>router.push('/')}
        height={50}
        src={pinterestLogo.src}
        className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
      />
      <button className="bg-black text-white p-2 px-4 rounded-full" 
       onClick={()=>router.push('/')}
      >
        Home
      </button>
      {session?.user ? (
          <button onClick={()=>router.push("../pin-builder")} className="font-semibold   text-white p-2 px-4 rounded-full">
          Create
        </button>
        ) : null}
      {/* 
      Search input div
      
      */}
      <div className="bg-[#e9e9e9] p-3 flex gap-3 items-center rounded-full w-full hidden md:flex">
        <HiSearch className="text-[25px] text-gray-500 " />

        <input
          type="text"
          placeholder="search"
          className="bg-transparent outline-none"
        />
      </div>
      <HiSearch className="text-[25px] text-gray-500 md:hidden" />

      <HiBell className="text-[40px] text-gray-500" />
      <HiChat className="text-[40px] text-gray-500" />
      {session?.user ? (
        <Image
          alt="man"
          width={50}
          height={50}
          src={session?.user?.image??man_logo}
          onClick={()=>router.push('/'+session?.user?.email)}
          className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
        />
      ) : (
        <button
          className="font-semibold  text-white p-2 px-4 rounded-full"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
