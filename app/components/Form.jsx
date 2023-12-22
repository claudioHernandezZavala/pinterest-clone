"use client";
import React, { useState } from "react";
import { default as UploadImage } from "./UploadImage";
import { default as UserTag } from "./userTag";
import { useSession, signIn, signOut } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { default as app } from "../Shared/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [title, setTitle] = useState(" ");
  const [desc, setDesc] = useState(" ");
  const [link, setLink] = useState(" ");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const postId = Date.now().toString();

  const uploadImage = () => {
    const storageRef = ref(storage, "pinterest/" + file.name);
    uploadBytes(storageRef, file)
      .then((snap) => {
        console.log("uploaded");
      })
      .then(() => {})
      .then((response) => {
        getDownloadURL(storageRef).then(async (url) => {
          setImageUrl(url);
          await postData(url);
          router.push("/" + session?.user?.email);
        });
      });
  };
  const onSaves = () => {
    uploadImage();
  };
  const postData = async (url) => {
    try {
      await setDoc(doc(db, "posts", postId), {
        title: title,
        desc: desc,
        link: link,
        imageUrl: url,
        email: session.user.email,
        name: session.user.name,
        userImage: session.user.image,
        id: postId,
      });
      console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="bg-white p-16 rounded-2xl">
      <div className="flex justify-end mb-6">
        <button
          className="bg-red-500 p-2 text-white font-semibold px-3,rounded-lg"
          onClick={onSaves}
        >
          save
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <UploadImage setFile={(file) => setFile(file)} />
        <div className="col-span-2">
          <div className="w-[100%]">
            <input
              type="text"
              onChange={(text) => {
                setTitle(text.target.value);
              }}
              placeholder="Add your title"
              className="text-[35px] outline-none font-bold w-full
            border-b-[2px] border-gray-400 placeholder-gray-400 text-black"
            />
            <h2 className="text-[12px] w-full text-gray-400">
              The first 40 characters are what usually show up in feeds
            </h2>
            {session && session.user && (
              <UserTag
                user={{
                  email: session.user.email,
                  name: session.user.name,
                  image: session.user.image,
                }}
              />
            )}
            <textarea
              type="text"
              onChange={(text) => {
                setDesc(text.target.value);
              }}
              placeholder="Tell everyone what your pin is about"
              className="text-black outline-none w-full mt-8 pb-4 text-[14px] border-b-[2px] border-gray-400 placeholder-gray-400"
            />
            <input
              type="text"
              onChange={(text) => {
                setLink(text.target.value);
              }}
              placeholder="Add a destination link"
              className=" text-black outline-none w-full mt-8 pb-4 text-[14px] border-b-[2px] border-gray-400 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
