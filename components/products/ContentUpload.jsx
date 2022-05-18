import { useUpload } from "hooks";
import Image from "next/image"
import { useEffect, useState } from "react";
import { CloudUpload, CloudUploadDisable, FileDelete, FileZip, Audio, Video } from "utils"
import axios from "axios";
import styles from "./CreateProduct.module.scss";

export default function ContentUpload({file, setFile}){
    const [progress, setProgress] = useState(0)
    const {
        mainFile,
        getRootProps,
        getInputProps,
        deleteFile
      } = useUpload({
        fileType: "audio/*,video/*,application/pdf"
      });
      const handleDeleteFile = ()=>{
        deleteFile(mainFile[0].file)
        setFile(null)
      }

      useEffect(()=>{
        if(mainFile.length > 0){
            console.log(mainFile)
            mainFile.map(async (item)=>(
                await uploadFile(item.file, setProgress)
            ))
        }
      }, [mainFile])
    async function uploadFile(file, cb){
        const formData = new FormData()
          formData.append('upload_preset', 'kreatesell')
          formData.append('file', file)
          const options = {onUploadProgress: (progressEvent)=>{
            const {loaded, total} = progressEvent
            let percent = Math.floor(loaded * 100 / total)
            cb(percent)
          }}
          try {
            const instance = axios.create()
            delete instance.defaults.headers.common['Authorization'];
            const {data} = await instance.post('https://api.cloudinary.com/v1_1/salvoagency/upload', formData, options)
            console.log(data)
            setFile({
                type: data?.resource_type,
                url: data?.secure_url,
                format: data?.format,
                duration: data?.duration,
                size: data?.bytes
            })
          } catch (error) {
            console.log('ERROR',error)
          }
    }
    return (
            <div className="pt-2">
                <p className="text-base-gray-200 text-xs mb-0">
                  You can upload Audio, Video or PDF Files
                </p>
                <small className="text-black mb-4 font-normal">The maximum allowed file size is 750MB.</small>
                {mainFile.length > 0 && mainFile.map((item, index)=>(
                  <div key={index} className={styles.fileUpload + " flex flex-col"}>
                    <p className="mb-3">{progress !== 100 ? "Uploading" :"Content Uploaded Successfully"} ({progress && <>{progress}</>})%</p>
                    <div key={index} className={styles.uploaded+" w-full rounded-md"}>
                      {progress !== 100 && <span></span>}
                      <div className="flex items-center">
                        <div className="mr-4 flex items-center justify-center" style={{width: "48px", height: "48px", background: "#0072EF", borderRadius: "8px"}}>
                          <Image src={item.file.type.includes("video") ? Video : item.file.type.includes("audio")? Audio : FileZip} alt="zip" />
                        </div>
                        <div className="flex flex-col">
                          <h2 className="mb-3 text-base font-bold">{item.file.name}</h2>
                          <p className="mb-0">{`${(item.file.size/ (1024 * 1024)).toFixed()}MB`}</p>
                        </div>
                      </div>
                      <div onClick={()=> handleDeleteFile()} className={styles.deleteFile + " flex items-center justify-center"}>
                        <Image src={FileDelete} alt="delete" />
                      </div>
                    </div>
                  </div>
                ))
                  }
                <div className={styles.fileUploader}>
                  {file && <span></span>}
                  <div
                    className={`${styles.contentFileUpload} ${file ? styles.contentFileUploadDisabled : ''}`}
                    {...getRootProps()}
                  >
                    <div className="flex justify-center items-center">
                      <input {...getInputProps()} />
                      <Image src={file ? CloudUploadDisable : CloudUpload} alt="upload image" />
                      <p className="hidden md:block text-sm pl-4 my-auto">
                        Drag and Drop or Click to Upload Your Product File
                      </p>
                      <p className="md:hidden text-primary-blue text-sm pl-4 my-auto">
                        Drag & Drop Or Click to Upload Your Product File
                      </p>
                    </div>
                  </div>
                </div>
              </div>
    )
}