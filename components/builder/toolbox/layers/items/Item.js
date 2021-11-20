import React,{useState} from "react";
import { Divider, Popconfirm,Tooltip} from "antd";
import { useEditor,useNode } from "@craftjs/core";
import {MoveLayerIcon,SectionStyleCta,LayerDelete,LayerSetting,LayerDuplicate,CollapseLayer,LayerVisible,LayerHidden,ExpandLayer} from '../../../icons'
import PaneMap from "./PaneMap";
import RowLayerItem from './Row'
import {Section} from '../../../layout'
import {useDispatch} from 'react-redux'
import { openTab } from "../../../../../redux/slices/pageSlices";



const StyleCta = ({onClick=()=>{}})=>{

    return(
        <>
            <div className="cta-wrapper">
                <SectionStyleCta />
                <LayerSetting onClick={()=>onClick()} style={{cursor:"pointer"}}/>
            </div>

            <style jsx>{`
                .cta-wrapper{
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    margin:20px 0;
                }
            `}</style>
        </>
    )
}



const SectionLayerItem = ({id})=>{

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const { displayName,isHidden, actions,descendants, query:{parseFreshNode,node} } = useEditor((state, query) => ({
        displayName: state.nodes[id].data?.displayName,
        isHidden: state.nodes[id].data.hidden,
        descendants: query.node(id).descendants(),
        
      }));

      const {data:{props,parent}} = node(id).get()
     
      const cancelBtnStyle = {
          width:80,
          height:30,
          border:'none',
          background: "#F5F5F5",
          borderRadius: "8px",
          color:'#BFBFBF'
      }

      const okBtnStyle = {
        width:80,
        height:30,
        border:'none',
        background: "#F5F5F5",
        borderRadius: "8px",
        color:'#BFBFBF'
      }

      
    const handleDuplicate = ()=>{
        const freshNode = {
            data:{
                type:Section,
                props:props
            }
        }
        const newNode = parseFreshNode(freshNode).toNode();
        actions.add(newNode,parent);

       
    }

    const handleStyleCta = ()=>{
        actions.selectNode(id)
        dispatch(openTab(4))
    }

    return(
        <>
        <div className="top-layer-item">
            <div className="top-layer-item-label"
                 onClick={()=>actions.selectNode(id)}>
                <MoveLayerIcon /> <span>{displayName}</span>
            </div>
            <div className="top-layer-item-cta">
            <Popconfirm icon={null}
                title="Are you sure to delete this Section"
                onConfirm={()=>actions.delete(id)}
                okText="Delete"
                okButtonProps={{style:okBtnStyle}}
                cancelButtonProps={{style:cancelBtnStyle}}
                cancelText="Cancel">
                <Tooltip title="Delete" color="white" 
                overlayInnerStyle={{color:"#595959",borderRadius:'8px'}}><LayerDelete /></Tooltip>
            </Popconfirm>
                    
            <Tooltip title="Duplicate" color="white" 
                overlayInnerStyle={{color:"#595959",borderRadius:'8px'}}>
                    <LayerDuplicate onClick={()=>handleDuplicate()}/>
                    </Tooltip>
                    <Tooltip title="Visible" color="white" 
                overlayInnerStyle={{color:"#595959",borderRadius:'8px'}}>
                    {!isHidden ? <LayerVisible onClick={()=>actions.setHidden(id,true)}/>:<LayerHidden onClick={()=>actions.setHidden(id,false)}/>}</Tooltip>
                   
                   {
                       open ? <CollapseLayer  onClick={()=>setOpen(!open)}/>:<ExpandLayer onClick={()=>setOpen(!open)}/>
                   }
                   
                </div>
        </div>

                   
        {
            open ? 
            <>
            <StyleCta onClick={()=>handleStyleCta()}/>
                   <Divider />
            <div className="top-item-container">
        {
              descendants?.map((item,i)=>(
                <PaneMap Component={RowLayerItem} id={item}/>
              ))
          }
        </div></>:null
        }
        
        <style jsx>{`
            .top-layer-item{
                padding:15px 0;
                display:flex;
                width:100%;
                align-items:center;
                justify-content:space-between;
            }

            .top-layer-item .top-layer-item-label{
                display:flex;
                flex:1;
                align-items:center;
                gap:5px;
            }

            .top-layer-item .top-layer-item-cta{
                display:flex;
                flex:1;
                align-items:center;
                gap:20px;
            }

            .top-item-container{
                padding-left:20px;
            }

            
        `}</style>
        </>
    )
}

export default SectionLayerItem