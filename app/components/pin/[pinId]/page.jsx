"use client";
import React, { useEffect, useState } from "react";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import {default as app} from "../../../Shared/firebaseConfig";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";
function PinDetail({ params }) {
  const router = useRouter();
  const db = getFirestore(app);
  const [pinDetail, setPinDetail] = useState([]);
  useEffect(() => {
    getPinDetail();
  }, []);
  const getPinDetail = async () => {
    const docRef = doc(db, "posts", params.pinId);
    console.log(params)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPinDetail(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  return (
    <>
      {pinDetail ? (
        <div className=" bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36">
          <HiArrowSmallLeft
            className="text-[60px] font-bold ml-[-50px] 
       cursor-pointer hover:bg-gray-200 rounded-full p-2 "
            onClick={() => router.back()}
          />
          <div
            className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
      rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 "
          >
            <div>
              <Image
                src={pinDetail.image}
                alt={pinDetail.title}
                width={1000}
                height={1000}
                className="rounded-2xl"
              />
            </div>
            <div className="">
              <div>
                <h2 className="text-[30px] font-bold mb-10">
                  {pinDetail.title}
                </h2>
                <UserTag user={pinDetail.name} />
                <h2 className="mt-10">{pinDetail.desc}</h2>
                <button
                  className="p-2 bg-[#e9e9e9] px-5 text-[23px]
      mt-10 rounded-full hover:scale-105 transition-all"
                  onClick={() => window.open(pinDetail.link)}
                >
                  Open Url
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : <h2>sdasd</h2>}
    </>
  );
}

export default PinDetail;
