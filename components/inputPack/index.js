import React from 'react'
import Select from 'react-select'
import {DropdownIndicator} from '../IconPack'


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

export const Button = ({onClick=()=>{}, label="Submit", disabled,loading})=>{


    return(
        <>
            <button 
                onClick={()=>onClick()}
                disabled={disabled || loading}> 
                {loading ? "Loading...": label}</button>

            <style jsx>{`
                button{
                    padding:16px 26px;
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
