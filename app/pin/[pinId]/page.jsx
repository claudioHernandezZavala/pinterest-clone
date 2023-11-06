"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import UserTag from "../../components/userTag";
import { app } from "../../Shared/firebaseConfig";
import { HiArrowSmallLeft } from "react-icons/hi2";

function PinDetail({params}) {
  const router=useRouter();
  const db=getFirestore(app);
  const [pinDetail,setPinDetail]=useState([]);
  useEffect(()=>{
    getPinDetail();
  },[])
 const getPinDetail=async()=>{
      const docRef = doc(db, 'posts',params.pinId );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
       
        setPinDetail(docSnap.data())
      } else {
       
        console.log("No such document!");
      }
  }
  return (
    <>
      {pinDetail ? (
        <div className="bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36">
          <HiArrowSmallLeft
            className="text-[60px] font-bold ml-[-50px] cursor-pointer hover:bg-gray-200 rounded-full p-2"
            onClick={() => router.back()}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16">
            <div>
              <Image
                src={pinDetail.imageUrl}
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
                  className="p-2 bg-[#e9e9e9] px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all"
                  onClick={() => window.open(pinDetail.link)}
                >
                  Open Url
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : <h2>Loading...</h2>}
    </>
  );
}

// export async function getStaticPaths() {
//   // Fetch a list of pin IDs from your database or source
//   // Example: Replace this with your actual data source
//   const pins = [/* List of pin IDs */];

//   const paths = pins.map((pinId) => ({
//     params: { pinId: pinId.toString() },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const db = getFirestore(app);
//   const docRef = doc(db, "posts", params.pinId);

//   try {
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const pinDetail = docSnap.data();
//       return {
//         props: {
//           pinDetail,
//         },
//       };
//     } else {
//       console.log("No such document!");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }

//   return {
//     props: {
//       pinDetail: null,
//     },
//   };
// }

export default PinDetail;
