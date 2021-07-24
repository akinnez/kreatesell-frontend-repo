import React,{useState,useRef} from 'react'
import Select from 'react-select'
import {DropdownIndicator, ProfileInputIcon, UploaderIcon,CheckMark} from '../IconPack'



export const TextInput = ({disabled, name, type="text", value, onChange=()=>{},onBlur=()=>{}, label, placeholder, labelExtra})=>{

    return(
        <>
            <label>{label} {labelExtra ? <span>- {labelExtra}</span>:null}</label>
            <input 
                type={type} 
                name={name}
                disabled={disabled}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                placeholder={placeholder}
                onBlur={(e)=>onBlur(e.target.value)}
                />

                <style jsx>{`
                    label{
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 26px; 
                        display:block;
                    }

                    label span{
                        color: #8C8C8C;
                    }

                    input{
                        outline:none;
                        border:none;
                        height:45 px;
                        width:100%;
                        border: 1px solid #D9D9D9;
                        border-radius:8px;
                        padding:13px;
                        margin: 8px 0px;
                        color: #8C8C8C;
                        font-size:14px;

                    }

                
                `}</style>
        </>
    )
}

export const TextArea = ({disabled, name, type="text", value, onChange=()=>{},onBlur=()=>{}, label, placeholder, labelExtra})=>{

    return(
        <>
            <label>{label}  {labelExtra ? <span>- {labelExtra}</span>:null}</label>
            <textarea 
                type={type} 
                name={name}
                disabled={disabled}
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                placeholder={placeholder}
                onBlur={(e)=>onBlur(e.target.value)}
                rows="8"
                />

                <style jsx>{`
                    label{
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 26px; 
                        display:block;
                    }

                    label span{
                        color: #8C8C8C;
                    }

                    textarea{
                        outline:none;
                        border:none;
                        height:45 px;
                        width:100%;
                        border: 1px solid #D9D9D9;
                        border-radius:8px;
                        padding:13px;
                        margin: 8px 0px;
                        color: #8C8C8C;
                        font-size:14px;
                        resize:none;
                        font-family: 'Inter'
                    }

                
                `}</style>
        </>
    )
}

export const CustomSelect = ({label,width,disabled,onChange=()=>{},isMultiple = false, value,error,placeholder, list =[]})=>{
  

    const selectStyle = {
        control: base => ({
            ...base,
            height:45,
            minHeight: 45,
            border:"1px solid #D9D9D9",
            fontSize:"14px",
            color:"#8C8C8C",
            background:"#fff",
            borderRadius:8,
            margin: "8px 0px"
          }),
          indicatorSeparator: () => {}
    }


    const handleChange = (v)=>{
        if(isMultiple){
            
          const val =  v?.map(({value})=>value)
          onChange(val)
        }else{
            onChange(v?.value)
        }
    }

        const handleLabel = ()=>{

            if(isMultiple){
                const arr = []
                value?.forEach((item)=>{
                    const index = list?.findIndex(el=>el.value == item)
                    arr.push({label:list[index].label,value:item})
                })
                return arr
            }else{
                const index = list?.findIndex(el=>el.value == value)

                if(index > -1){
                    return {label:list[index].label, value}
                }
                return ""
            }
           
        }

    return(
        <>
        <div className="input-wrapper" >
            <div className="input-plus-label-wrapper">
            <label>{label}</label>
            <Select isDisabled={disabled} styles={selectStyle} isMulti = {isMultiple}
                    placeholder={placeholder}
                    options={list}
                    value={handleLabel()}
                    components={{DropdownIndicator}}
                    getOptionLabel={opt=>opt.label}
                    getOptionValue={opt=>opt.value}
                    onChange={(value)=>handleChange(value)} />
                    <span className={error ? "error":null}>{error}</span>
            </div>
            

        </div>


        <style jsx>{`

            .input-wrapper{
                position:relative;
                width: ${width};
                min-height:20px;
                
            }

            label{
                font-weight: 500;
                font-size: 16px;
                line-height: 26px; 
                display:block;
            }

            .error{
                color:red;
            }
 
        `}</style>
        </>
    )
}

export const Button = ({onClick=()=>{},style, label="Submit", disabled,loading})=>{


    return(
        <>
            <button style={style}
                onClick={()=>onClick()}
                disabled={disabled || loading}> 
                {loading ? "Loading...": label}</button>

            <style jsx>{`
                button{
                    padding:10px 16px;
                    outline:none;
                    border:none;
                    background:#0072EF;
                    color:#fff;
                    border-radius:8px;
                    font-weight:700;
                    font-size:14px;
                    min-width:160px;
                }

                button:not(:disabled){
                    cursor:pointer;
                }

                button:disabled{
                    background-color:#B0B3C5
                }
            
            `}</style>
        </>
    )
}

export const FileInput = ({
    onChange, 
    value, 
    placeholder,
     label = "Profile picture", 
     disabled,
      extralable = "- Your profile picture"
    })=>{


        const handleChange = (e)=>{
            onChange(e.target.value)
        }

    return (
        <>
            <div className="label"></div><span className="label-text">{label}</span> <span className="extralable">{extralable}</span>
            <div className="input-group-wrapper">
                <div className="profile-input-icon">
                    <ProfileInputIcon />
                </div>
            <label className="file-input-label">
                <input type="file" accept="image/*" onChange={(e)=>handleChange(e)}/>
                {value != "" ? value: <span>upload a profile picture of 300 X 300 pixel not exceed 300KB</span>}
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
                }

                .label{
                    font-weight: 500;
                        font-size: 16px;
                        line-height: 26px; 
                        display:block;
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
            
            `}</style>
        </>
    )
}

export const Uploader = ({disabled,label,extralable, value, onChange=()=>{},onBlur=()=>{}})=>{
        const [file, setFile] = useState("")
        const inputFileRef = useRef( null );

        const handleChange = (e) => {
            const file = e.target.files[0]
            if(file !== undefined){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = ({currentTarget})=>{
                setFile(currentTarget?.result)
            }
        }
        }
    
        const handleClick = () => {
            inputFileRef.current.click();
          }

    return(
        <>
           <div className="label"></div><span className="label-text">{label}</span> <span className="extralable">{extralable}</span>
            <label className={`uploader-wrapper ${file ? "filled":''}`}  style={{backgroundImage: `url(${file})`}}>
                <input type="file" accept="image/*" ref={inputFileRef} onChange={(e)=>handleChange(e)}/>
                <UploaderIcon />
                <button className="upload-cta" onClick={()=>handleClick()}>Upload Cover</button>
                <span className="info-text">Recommended minimum image ratio is 400 x 800 pixels and not exceed 500kb</span>
            </label>
        <style jsx>{`
            .uploader-wrapper{
                border: 1px dashed #D9D9D9;
                height:262px;
                border-radius:8px;
                margin: 8px 0px;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                background-size:cover;
                background-position:center;
                background-repeat:no-repeat;
            }

            .uploader-wrapper input[type=file]{
                display:none;
            }

            .filled:hover svg{
                display:none;
            }

            .label{
                font-weight: 500;
                    font-size: 16px;
                    line-height: 26px; 
                    display:block;
            }

            span.extralable{
                color: #8C8C8C;
            }

            .upload-cta{
                background: #F5F5F5;
                box-shadow: 0px 0px 2.17863px rgba(0, 0, 0, 0.084), 0px 1.45242px 2.17863px rgba(0, 0, 0, 0.168);
                border-radius: 5.80968px;
                width:400px;
                outline:none;
                border:none;
                height:32px;
            }

            .info-text{
                color: #8C8C8C;
                font-size:14px;
                margin-top:10px;

            }
        `}</style>
        </>
    )
}


export const  Checkbox = ({value, onChange =()=>{}, label})=>{

    return(
        <>
            <div className="checkbox-wrapper">
                <span className={`indicator ${value ? "checked":''}`} onClick={()=>onChange(!value)}>
                    <CheckMark />
                </span>
                <span className="label">{label}</span>
            </div>


            <style jsx>{`

                .checkbox-wrapper{
                    display:flex;
                    margin:10px 0;
                }


                .checkbox-wrapper span.indicator{
                    height:20px;
                    width:20px;
                    border-radius:2px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }

                .checkbox-wrapper span.indicator:not(.checked){
                    border:1px solid #D9D9D9;
                    background-color:#ffffff;
                }
                .checked{
                    background:#0072EF;
                }

                .label{
                    margin-left:10px;
                    font-weight:500;
                    font-size:16px;
                }
            
            `}</style>
        </>
    )
}


export const  Radio = ({value, onChange =()=>{}, label, extralable})=>{

    return(
        <>
            <div className="radio-wrapper">
                <div className={`radio ${value ? 'checked' : ''}`} onClick={()=>onChange(!value)}>
                    {
                        value ? <div className="indicator"/>:null
                    }
                   
                </div>
                <span className="label">{label} <span className="extra">{extralable}</span></span>
            </div>


            <style jsx>{`
                .radio-wrapper{
                    display:flex;
                    margin:15px 0;
                }

                .radio{
                    height:20px;
                    width:20px;
                    border-radius:50%;
                    border:2px solid #8C8C8C;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }

                .checked{
                    border-color:#0072EF;
                }

                .radio .indicator{
                    width:10px;
                    height:10px;
                    background:#0072EF;
                    border-radius:50%;
                }

                .label{
                    margin-left:10px;
                    font-weight:500;
                    font-size:16px;
                    flex:1;
                }

                .extra{
                    color: #8C8C8C;
                }
               
            `}</style>
        </>
    )
}


export const DateInput = ({onChange=()=>{}, value})=>{

    return(
        <>
       
      
        </>
    )
}