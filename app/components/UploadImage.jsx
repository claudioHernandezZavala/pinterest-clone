"use client"
import React , {useState} from 'react'
import { HiArrowUpCircle } from 'react-icons/hi2'

const UploadImage = ({setFile}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  return (
    <div className='h-[450px] bg-[#e9e9e9]'>
        <label className="m-5 flex flex-col justify-center items-center
        cursor-poniter h-[90%]
        border-[2px] border-gray-500 border-dashed rounded-lg text-gray-600
        
        ">{!selectedFile? <div className='flex items-center flex-col'>
            <HiArrowUpCircle/>
            <h2 className='font-semibold'>
                Click to upload

            </h2>
            <input  id='dropzone-file' type='file' className='hidden' onChange={(e)=>{setFile(e.target.files[0])
            setSelectedFile(e.target.files[0])  
          
          }
            
            }/>
        </div>:null}
        {
          selectedFile?<img
          src={window.URL.createObjectURL(selectedFile)}
          width={500}
          height={800}
          />:null
        }
          

        </label>
    </div>
  )
}

export default UploadImage