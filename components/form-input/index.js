import React,{useState} from 'react'
import {Form,Input as AntInput, Select as AntSelect,Upload as AntUpload,Image, Button as AntButton} from 'antd'
import style from './Index.module.scss'
import {UploaderIcon,ProfileInputIcon} from '../../components/IconPack'
import {toast} from 'react-toastify'
import { MdDelete } from "react-icons/md";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


const UploadPlaceholder = ()=>{
    return(
        <>
        <div className="upload-placeholder">
            <UploaderIcon />
            <div className="upload-btn">Upload Cover</div>
        </div>
        <style jsx>{`
            .upload-placeholder{
                height:200px;
                width:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
            }

            .upload-btn{
                width:50%;
                height:32px;
                background: #F5F5F5;
                box-shadow: 0px 0px 2.17863px rgba(0, 0, 0, 0.084), 0px 1.45242px 2.17863px rgba(0, 0, 0, 0.168);
                border-radius: 5.80968px;
                display:flex;
                align-items:center;
                justify-content:center;

            }
        `}</style>
        </>
    )
}


export const Input = ({CustomInput,type="text",placeholder,size="large",disabled,label,extraLabel,row,...rest})=>{
    return(
        <Form.Item {...rest} label={<label className={style.label}>{label} <span>{extraLabel}</span></label>}>
            {
                CustomInput ? <CustomInput rows={row} className={style.input} size={size} placeholder={placeholder}/>:

                <AntInput disabled={disabled} className={style.input} type={type} size={size} placeholder={placeholder}/>
            }
        </Form.Item>
    )
}

/**
 * @description Input Variant 2 component: It has a Prefix text and Input field too
 *
 */
export const InputV2 = ({type="text",placeholder,size="large",prefixText,disabled,label,extraLabel,row,defaultValue,...rest})=>{
    return(
        <Form.Item {...rest} label={<label className={style.label}>{label} <span>{extraLabel}</span></label>}>
            <div className={style.inputV2Container}>
                <p>{prefixText}</p> <AntInput defaultValue={defaultValue} disabled={disabled} className={style.input} type={type} size={size} placeholder={placeholder}/>
            </div>
        </Form.Item>
    )
}


export const Select = ({placeholder,size="large", onChange=()=>{},loading,label,extraLabel,list=[],...rest})=>{
    return(
        <Form.Item {...rest} label={<label className={style.label}>{label} <span>{extraLabel}</span></label>}>
            {
                <AntSelect showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e)=>onChange(e)} loading={loading} className={style.input} size={size} placeholder={placeholder}>
                    {list?.map(({label,value},i)=>(
                        <AntSelect.Option key={i} value={value}>{label}</AntSelect.Option>
                    ))}
                </AntSelect>
            }
        </Form.Item>
    )
}


export const Dropzone = ({label, value, onChange=()=>{},handleDelete, extraLabel,...rest})=>{

    const [imgUrl, setImgUrl] = useState()
    

      const handleBeforeUpload = (info,inp)=>{
          const isImage = info?.type?.split("/")[0] == "image"
          
          if(!isImage){
            toast.error("File must be an image")
          }else{
            onChange(inp[0])
            getBase64(inp[0], imageUrl =>
                setImgUrl(imageUrl)
            );
          }
          return false
          
      }

    return(
        <div className={style.dragger_wrapper}>
        <div className={style.deleteContainer} onClick={()=>handleDelete()}>
        <MdDelete className={style.icon} />
        </div>
        <label className={style.label}>{label} <span>{extraLabel}</span></label>
            <AntUpload.Dragger {...rest}
                previewFile={false}
                style={{padding:0, height:"200px"}}
                beforeUpload={handleBeforeUpload}
                listType="picture-card" 
                showUploadList={false}>
                {imgUrl || value ? <Image src={imgUrl || value} alt="avatar" height={300} preview={false}/> : <UploadPlaceholder/>}
            </AntUpload.Dragger>
        </div>
    )
}

export const Button = ({label,type,className="",...rest})=>{

    return(
        <AntButton className={`${style.btn} ${className}`} type={type||""}  {...rest}>{label}</AntButton>
    )
}

export const FileInput = ({
    onChange=()=>{}, 
    value,
    handleDelete,
    placeholder,
     label = "Profile picture", 
     disabled,
      extralable = "- Your profile picture"
    })=>{

        const [file, setFile] = useState("")

        const handleChange = (e)=>{
            setFile(e.target.files[0].name)
            onChange(e.target.files[0])
        }

    return (
        <>
            <div className="label"><span className="label-text">{label}</span> <span className="extralable">{extralable}</span></div>
            <div className="input-group-wrapper">
                <div className="profile-input-icon">
                    {!!value ? <img src={value} className='img' /> :<ProfileInputIcon />}
                </div>
            <label className="file-input-label">
                <input type="file" accept="image/*" onChange={(e)=>handleChange(e)}/>
                {value != "" ? <div id="fi" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis", display:"flex", position:"relative", zIndex:"14"}}><MdDelete onClick={handleDelete} style={{fontSize: "20px",cursor:"pointer"}} color="red" /> Click to delete the profile picture</div>: <span>upload a profile picture of 300 X 300 pixel not exceed 300KB</span>}
            </label>
            </div>

            <style jsx>{`
                .file-input-label{
                        height:45px;
                        width:100%;
                        border: 1px solid #D9D9D9;
                        border-radius:8px;
                        padding:13px;
                        padding-left: 50px;
                        margin: 8px 0px;
                        color: #8C8C8C;
                        font-size:14px;
                        display:block;
                        text-align:left;
                }

                .label{
                    font-weight: 500;
                        font-size: 14px;
                        line-height: 26px; 
                        display:block;
                        font-weight:600;
                        text-align:left;
                }
                .icon{
                    font-size: 25px;
                    color: red !important; 
                }
                .img{
                    border-radius: 5px;
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }

                span.extralable{
                    color: #8C8C8C;
                }


                .file-input-label input[type=file]{
                    display:none;
                }

                .profile-input-icon{
                    width:42px;
                    height:45px;
                    background:#0072EF;
                    position:absolute;
                    top:0px;
                    border-radius:8px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }

                .input-group-wrapper{
                    position:relative;
                }
            
                @media screen and (max-width:600px){
                    .file-input-label{
                        font-size:12px;
                    }
                }
            `}</style>
        </>
    )
}