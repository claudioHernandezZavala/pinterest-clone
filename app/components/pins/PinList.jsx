import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { default as app } from "../../Shared/firebaseConfig";
import {default as PinItem} from "./PinItem"
const PinList = ({ pinList }) => {
    const db = getFirestore(app);
  
    return (
      <div className='mt-7 px-1 md:px-5
      columns-2 md:columns-3
      lg:columns-4 mb-4
      xl:columns-5 space-y-4 mx-auto'>
         {pinList.map((item,index)=>(
                
                <PinItem pinValue={item} key={index} />
            
         ))}
     </div>
    );
  };

export default PinList;
