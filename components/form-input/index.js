import React,{useState} from 'react'
import {Form,Input as AntInput, Select as AntSelect,Upload as AntUpload,Image, Button as AntButton} from 'antd'
import style from './Index.module.scss'
import {UploaderIcon,ProfileInputIcon} from '../../components/IconPack'
import {toast} from 'react-toastify'

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


export const Dropzone = ({label, value, onChange=()=>{},extraLabel,...rest})=>{

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

export const Button = ({label,...rest})=>{

    return(
        <AntButton className={style.btn}  {...rest}>{label}</AntButton>
    )
}

export const FileInput = ({
    onChange=()=>{}, 
    value, 
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
                    <ProfileInputIcon />
                </div>
            <label className="file-input-label">
                <input type="file" accept="image/*" onChange={(e)=>handleChange(e)}/>
                {value != "" ? <div id="fi" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{file || value}</div>: <span>upload a profile picture of 300 X 300 pixel not exceed 300KB</span>}
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