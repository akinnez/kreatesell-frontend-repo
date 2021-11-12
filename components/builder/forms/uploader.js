import { Button } from 'antd'
import React,{useState,useEffect} from 'react'
import { Avatar,RemoveImageIcon } from '../icons'



const Uploader = ({onChange=()=>{}, value})=>{
    const [state, setState] = useState({
        src:'',
        name:'',
        size:''
    })

        const handleChange = (e)=>{
            const input = e.target
            const name = input.files[0].name
            const size = input.files[0].size
            const reader = new FileReader()
         
            reader.onload = ()=>{
                const dataURL = reader.result
                setState({src:dataURL, name,size})
                
            }
            
            
            reader.readAsDataURL(input.files[0])
        }
    
        useEffect(()=>{
            onChange(state.src)
        },[state])

    return(
        <>
            <label className="uploader-label">Image</label>
            <div className="uploader-wrapper">
                <ImageHolder src={state.src || value} name={state.name}/>
                <div className="img-content">
                    <div className="img-btn-wrapper">
                        <RemoveImageIcon onClick={()=>setState({})}/>
                    </div>
                    <div className="img-label">
                        <p><span>Name:</span> {state.name}</p>
                        <p><span>Resolution:</span> 24 X 2</p>
                        <p><span>Size:</span> {state.size}B</p>
                    </div>
                </div>
            </div>
            <label className="file">
                <input className="fileinput" accept="image/*" type="file" onChange={(e)=>handleChange(e)}/>
                Add Image
            </label>
            
            <style jsx>{`

            .uploader-label{
                font-size:14px;
                color:#8C8C8C;
                margin-top:10px;
                display:block;
            }
                .uploader-wrapper{
                    display:flex;
                }

                .img-content{
                    flex:1;
                }

                .img-btn-wrapper{
                    display:flex;
                    justify-content:flex-end;
                   
                }

                .img-label{
                    margin-top:10px;
                    margin-left:5px;
                }

                .img-label p{
                    margin:10px 0;
                    font-size:12px;
                    line-height:1.5;
                    color:#595959;
                }
                .img-label p span{
                    color:#8C8C8C;
                }

                .file{
                    color:#69C0FF;
                    cursor:pointer;
                }
                .file .fileinput{
                    display:none;
                }
            
            `}</style>
        </>
    )
}

export default Uploader

const ImageHolder = ({src, name})=>{

    return(
        <>
        
        <div className="holder">
            {
                src ? <img src={src}/>:<Avatar />
            }
            
        </div>
        <style jsx>{`
            .holder{
                border: 1px solid #BFBFBF;
                box-sizing: border-box;
                border-radius: 8px;
                width: 167px;
                height: 118px;
                display:flex;
                align-items:center;
                justify-content:center;
            }
            
            .holder img{
                max-width:90%;
                max-height:100%;
            }
        `}</style>
        </>
    )
}