import React,{useState} from 'react'
import {Form,Input as AntInput, Select as AntSelect,Upload as AntUpload,Image, Button as AntButton} from 'antd'
import style from './Index.module.scss'
import {UploaderIcon} from '../../components/IconPack'


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


export const Input = ({CustomInput,type="text",placeholder,size="large",label,extraLabel,row,...rest})=>{
    return(
        <Form.Item {...rest} label={<label className={style.label}>{label} <span>{extraLabel}</span></label>}>
            {
                CustomInput ? <CustomInput rows={row} className={style.input} size={size} placeholder={placeholder}/>:

                <AntInput className={style.input} type={type} size={size} placeholder={placeholder}/>
            }
        </Form.Item>
    )
}


export const Select = ({placeholder,size="large",onChange=()=>{},loading,label,extraLabel,list=[],...rest})=>{
    return(
        <Form.Item {...rest} label={<label className={style.label}>{label} <span>{extraLabel}</span></label>}>
            {
                <AntSelect onChange={(e)=>onChange(e)} loading={loading} className={style.input} size={size} placeholder={placeholder}>
                    {list?.map(({label,value},i)=>(
                        <AntSelect.Option key={i} value={value}>{label}</AntSelect.Option>
                    ))}
                </AntSelect>
            }
        </Form.Item>
    )
}


export const Dropzone = ({label, onChange=()=>{},extraLabel,...rest})=>{

    const [imgUrl, setImgUrl] = useState()

    const handleChange = info =>{
        if (info.file.status === 'done') {
            onChange(info)
          getBase64(info.file.originFileObj, imageUrl =>
            setImgUrl(imageUrl)
          );
        }
      }

    return(
        <div className={style.dragger_wrapper}>
        <label className={style.label}>{label} <span>{extraLabel}</span></label>
        <AntUpload.Dragger {...rest}
            previewFile={false}
            style={{padding:0, height:"200px"}}
            onChange={handleChange}
            listType="picture-card" 
            showUploadList={false}>
            {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%',height:"100%" }} /> : <UploadPlaceholder/>}
        </AntUpload.Dragger>
        </div>
    )
}

export const Button = ({label,...rest})=>{

    return(
        <AntButton className={style.btn}  {...rest}>{label}</AntButton>
    )
}