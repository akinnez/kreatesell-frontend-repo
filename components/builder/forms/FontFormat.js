import React,{useState} from 'react'
import { Bold,Italic,Underline,StrikeThrough,Subscript,Superscript,ListNumber,ListUnlisted } from '../icons'
import {Row,Col,Input} from 'antd'
import {ColorCancel, LeftAlign,CenterAlign,RightAlign,LineHeightIcon} from '../icons'
import { SketchPicker } from 'react-color'




const GroupFormat = ()=>{
    return(
        <Row gutter={10} style={{marginTop:20}}>
            <Col span={18} style={{display:'flex',gap:10}}>
               
            <Bold onMouseDown={(e)=>{
                e.preventDefault()
                document.execCommand("bold",false,"")
            }}/>
            <Italic onMouseDown={(e)=>{
                e.preventDefault()
                document.execCommand("italic",false,"")
            }} />
            <Underline 
                onMouseDown={(e)=>{
                    e.preventDefault()
                    document.execCommand("underline",false,"")
                }}/>
            <StrikeThrough onMouseDown={(e)=>{
                    e.preventDefault()
                    document.execCommand("strikethrough",false,"")
                }}/>
            <Subscript onMouseDown={(e)=>{
                    e.preventDefault()
                    document.execCommand("subscript",false,"")
                }}/>
            <Superscript onMouseDown={(e)=>{
                e.preventDefault()
                document.execCommand("superscript",false,"")
            }}/>
            </Col>
            <Col span={6}  style={{display:'flex',gap:10, justifyContent:"flex-end"}}>
              <ListNumber onMouseDown={(e)=>{
                    e.preventDefault()
                    document.execCommand("insertOrderedList",false,"")
                }}/>
              <ListUnlisted onMouseDown={(e)=>{
                    e.preventDefault()
                    document.execCommand("insertUnorderedList",false,"")
                }}/>
            </Col>
        </Row>
    )
}

export default GroupFormat


export const ColorPicker = ({label, value, onChange=()=>{},defaultColor})=>{
    const [open,setOpen] = useState(false)
    return(
        <>
        <div>
            {
                label ?<p className="label">{label}</p>:null
            }
        
        <div className="color-wrapper">
            <label onClick={()=>setOpen(!open)}>
            <span className="color" style={{backgroundColor:value}}/>
            <span className="txt">{value?.toUpperCase()}</span>
            </label>
            <ColorCancel className="cancel" onClick={()=>onChange(defaultColor)}/>
        </div>
        {
            open ?
            <div  style={{zIndex:999, position:"absolute"}}>
            <SketchPicker color={value || defaultColor} onChange={({hex})=>onChange(hex)}/>
        </div>:null
        }
        
        
        </div>
        <style jsx>{`
            label{
                display:flex;
                align-items:center;
                justify-content:space-between;
                width:100px;
                height:40px;
                border:1px solid #D9D9D9;
                border-radius:8px;
                padding:0 5px;
            }

            label input{
                display:none;
            }

            label span.color{
                display:inline-block;
                width:24px;
                height:24px;
                border-radius:8px;
            }

            label span.txt{
                font-size:12px;
                color:#8C8C8C;
            }

            .label{
                margin-top:15px;
                margin-bottom:5px;
            }

            .color-wrapper{
                display:flex;
                gap:5px;
                align-items:center;
            }


        `}</style>

        </>
    )
}



const LineHeight = ({value, onChange=()=>{}})=>{
    return(
        <>
        <div className="lineheight-wrapper">
            <LineHeightIcon />
            <Input value={24} value={value} onChange={(e)=>onChange(e.target.value)} bordered={false} style={{width:30,marginLeft:5,padding:0,textAlign:"center"}}/>
        </div>

        <style jsx>{`
            .lineheight-wrapper{
                border: 1px solid #D9D9D9;
                border-radius: 8px;
                width: 68px;
                height: 40px;
                display:flex;
                align-items:center;
                padding:0 5px;
            }
        `}</style>
        </>
    )
}




export const TextFormat = ({onChangeColor=()=>{},color, lineHeight, onChangeLineHeight=()=>{}, label, defaultColor})=>{

    return(
        <Row gutter={10}>
            <Col sm={12}>
                <ColorPicker label={label} defaultColor={defaultColor} value={color} onChange={(e)=>onChangeColor(e)}/>
                </Col>
                <Col sm={12}  style={{display:"flex", gap:5, alignItems:"center", paddingTop:40}}>
                <LeftAlign 
                    onMouseDown={(e)=>{
                        e.preventDefault()
                        document.execCommand("justifyLeft",false,"")
                    }}/>
                <CenterAlign 
                     onMouseDown={(e)=>{
                        e.preventDefault()
                        document.execCommand("justifyCenter",false,"")
                    }}/>
                <RightAlign 
                     onMouseDown={(e)=>{
                        e.preventDefault()
                        document.execCommand("justifyRight",false,"")
                    }}/>

                <LineHeight value={lineHeight} onChange={(e)=>onChangeLineHeight(e)}/>
            </Col>
        </Row>
    )
}


export const BoxModel = ({
    top,
    right,
    bottom,
    left, 
    onChangeTop=()=>{},
    onChangeRight=()=>{},
    onChangeBottom=()=>{},
    onChangeLeft=()=>{},
    label
})=>{

    return(
        <>
        <label>{label}</label>
        <Row>
            <Col sm={9}></Col>
            <Col sm={6} style={{textAlign:"center"}}>
                <label style={{color:"#595959", fontWeight:500}}>Top</label>
                <Input value={top} onChange={(e)=>onChangeTop(e.target.value)} 
                style={{borderRadius:8,textAlign:"center",width:60,height:40,
                fontSize:12,fontWeight:700}}/>
            </Col>
            <Col sm={9}></Col>
        </Row>
        <Row>
            <Col sm={8}  style={{display:"flex",alignItems:"center",gap:5}}>
            <label style={{color:"#595959", fontWeight:500}}>Left</label>
                <Input value={left} onChange={(e)=>onChangeLeft(e.target.value)} 
                style={{borderRadius:8,textAlign:"center",width:60,height:40,fontSize:12,
                fontWeight:700}}/>
            </Col>
            <Col sm={8}></Col>
            <Col sm={8} style={{display:"flex",alignItems:"center",gap:5}}>
                <Input value={right} onChange={(e)=>onChangeRight(e.target.value)} 
                    style={{borderRadius:8,textAlign:"center",width:60,height:40,
                    fontSize:12,fontWeight:700}}/>
                <label style={{color:"#595959", fontWeight:500}}>Right</label>
            </Col>
        </Row>
        <Row>
            <Col sm={9}></Col>
            <Col sm={6} style={{textAlign:"center"}}>
                <Input value={bottom} onChange={(e)=>onChangeBottom(e.target.value)}
                 style={{borderRadius:8,textAlign:"center",width:60,height:40,fontSize:12,fontWeight:700}}/>
                <label style={{color:"#595959", fontWeight:500}}>Bottom</label>
            </Col>
            <Col sm={9}></Col>
        </Row>
        </>
    )
}