"use client";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import app from "./Shared/firebaseConfig";
import { useEffect, useState } from "react";
import PinList from "./components/pins/PinList";

export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    getAllPins();
  }, []);
  const getAllPins = async () => {
    setListOfPins([]);
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    const pins = []
    querySnapshot.forEach((doc) => {
      
      pins.push({data:doc.data(),id:doc.id})
      
    });
    setListOfPins(pins)
  };

  return (
    <>
      <div className="p-3">
        <PinList pinList={listOfPins}/>
      </div>
    </>
  );
}
