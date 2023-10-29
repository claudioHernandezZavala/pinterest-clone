"use client"
import React, { useEffect, useState } from 'react';
import app from "../Shared/firebaseConfig";
import { getFirestore, collection, query, where, doc, getDocs,getDoc } from "firebase/firestore";

import { default as UserInfo } from '../components/UserInfo';
import {default as PinList} from "../components/pins/PinList"
const Profile = ({ params }) => {
    const db = getFirestore(app);
    const [userInfo, setUserInfo] = useState(null); // Provide an initial value of null
    const [pinsList, setPinsList] = useState([])
    useEffect(() => {
       // console.log(params);
        if (params) {
            getUserInfo(params.userId.replace('%40', '@'));
            getUserPins(params.userId.replace('%40', '@'))
        }
    }, [params]);

    const getUserInfo = async (email) => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            setUserInfo(docSnap.data());
           
        } else {
            // docSnap.data() will be undefined in this case
           // console.log("No such document!");
        }
    }
    const getUserPins = async (email) => {
        const postRef = collection(db, "posts");
        const q = query(postRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
         const pinsNew= [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            pinsNew.push({data:doc.data(),id:doc.id})
        });
        setPinsList(pinsNew)
      };
    
      useEffect(() => {
        if (userInfo) {
            console.log("asdasd")
          getUserPins();
        }
      }, []);

    return (
        <div>
            {userInfo ? <UserInfo userInfo={userInfo} /> : null}
            <PinList  pinList={pinsList} />
        </div>
    )
}

export default Profile;
