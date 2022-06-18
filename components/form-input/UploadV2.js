import React,{useState} from 'react'
import { Upload as AntUpload,Image} from 'antd'
import style from './Index.module.scss'
import {ExportIcon, AttachIcon} from '../../components/IconPack'
import {toast} from 'react-toastify'
import {deleteImage} from "../../redux/actions";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const UploadPlaceholderV2 = ()=>{
    return(
        <>
        <div className="upload-placeholder">
            <ExportIcon />
            <div className="uploadText">Drag & drop or click to upload file</div>
        </div>
        <style jsx>{`
            .upload-placeholder{
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:row !important;
                gap: 5px;
                padding: .4rem 1.2rem;
            }

            .uploadText{
                color: #0072EF !important;
            }
        `}</style>
        </>
    )
}
const UploadPlaceholderV3 = ()=>{
    return(
        <>
        <div className="upload-placeholderv3">
            <AttachIcon />
            <div className="uploadTextv3">Attach</div>
        </div>
        <style jsx>{`
            .upload-placeholderv3{
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:row !important;
                gap: 5px;
                padding: .4rem 1.2rem;
            }

            .uploadTextv3{
                color: #0072EF !important;
            }
        `}</style>
        </>
    )
}

export const DropzoneV2 = ({label, value, onChange=()=>{}, extraLabel,name,variant,accept,errors={},required=false,...rest})=>{
    const [imgUrl, setImgUrl] = useState();
    const [fileName, setFileName] = useState("");

      const handleBeforeUpload = (info,inp)=>{
          const isAcceptable = info?.type?.split("/")[1] == accept;
 
          
          if(!isAcceptable){
            toast.error("File must be an "+accept)
          }else{
            onChange(inp[0])
            getBase64(inp[0], imageUrl =>{
                setImgUrl(imageUrl)
                setFileName(info?.name);
            }
            );
          }
          return false
          
      }
    return(
        <>
             <div className={`${variant === 2 ?"customUploadV2": "customUploadV3"} ${style.dragger_wrapperV2} ${variant === 3 && style.dragger_wrapperV3} }`}>
            <label className={style.label}><span style={{color: "red"}}>{extraLabel}</span> {label} </label>
                <AntUpload.Dragger {...rest}
                className={`${variant === 2 ? style.dragger : style.plain}`}
                    previewFile={false}
                    // style={{padding:0, height:"30px"}}
                    beforeUpload={handleBeforeUpload}
                    listType="picture-card" 
                    showUploadList={false}>
                    {!!accept && imgUrl ? <div className={style.otheFileDescription}><h1 className={style.fileName}>{accept} file:</h1> {fileName}</div> : imgUrl || value ? <Image src={imgUrl || value} alt="avatar" height={50} preview={false}/> : variant === 2 ? <UploadPlaceholderV2/>: variant === 3 ? <UploadPlaceholderV3/>: null}
                </AntUpload.Dragger>
             </div>
                {(`${name}` in errors) && errors[name] && <p className={style.error} style={{display:"block"}}>{name} is required</p>}
        </>
    )
}