"use client";
import React, { useEffect, useState } from "react";
import app from "../Shared/firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";

import { default as UserInfo } from "../components/UserInfo";
import { default as PinList } from "../components/pins/PinList";
const Profile = ({ params }) => {
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState(null);
  const [pinsList, setPinsList] = useState([]);

  useEffect(() => {
    if (params) {
      getUserInfo(params.userId.replace("%40", "@"));
    }
  }, [params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
    } else {
      setUserInfo(null); // Set userInfo to null if the document doesn't exist
    }
  };

  useEffect(() => {
    if (userInfo) {
      getUserPins();
    }
  }, [userInfo]);

  const getUserPins = async () => {
    setPinsList([]);
    const q = query(
      collection(db, "posts"),
      where("email", "==", userInfo?.email) // Use optional chaining to handle null or undefined userInfo
    );
    const querySnapshot = await getDocs(q);
    const pins = [];
    querySnapshot.forEach((doc) => {
      pins.push(doc.data());
    });
    setPinsList(pins);
  };

  return (
    <div>
      {userInfo ? <UserInfo userInfo={userInfo} /> : <p>User not found</p>}
      <PinList pinList={pinsList} />
    </div>
  );
};

export default Profile;