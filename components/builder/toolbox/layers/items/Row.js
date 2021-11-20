import React,{useState} from "react";
import { Popconfirm,Tooltip} from "antd";
import { useEditor,useNode } from "@craftjs/core";
import {MoveLayerIcon,LayerDelete,LayerDuplicate,LayerVisible,CollapseLayer,ExpandLayer} from '../../../icons'
import ColLayerItem from "./Column";
import PaneMap from "./PaneMap";
import {Row} from '../../../layout'

const RowLayerItem = ({id})=>{

    const [open, setOpen] = useState()

    const { displayName,descendants, actions, query:{parseFreshNode,node} } = useEditor((state, query) => ({
        displayName: state.nodes[id].data?.displayName,
        isHidden: state.nodes[id].data.hidden,
        descendants: query.node(id).descendants()
      }));

      const {data:{parent,props}} = node(id).get()
      const handleDuplicate = ()=>{
        const freshNode = {
            data:{
                type:Row,
                props:props
            }
        }
        const newNode = parseFreshNode(freshNode).toNode();
        actions.add(newNode,parent);

       
    }


    return(
        <>
        <div className="row-layer-item">
            <div className="row-layer-item-label"
                 onClick={()=>actions.selectNode(id)}>
                <span>{displayName}</span>
            </div>
            <div className="row-layer-item-cta">
           
            <Tooltip title="Duplicate" color="white" 
                overlayInnerStyle={{color:"#595959",borderRadius:'8px'}}>
                    <LayerDuplicate onClick={()=>handleDuplicate()}/>
            </Tooltip>
                     {
                       open ? <CollapseLayer  onClick={()=>setOpen(!open)}/>:<ExpandLayer onClick={()=>setOpen(!open)}/>
                   }
                </div>
        </div>
        {
            open ? 
            <div className="row-item-container">
        {
              descendants?.map((item,i)=>(
                <PaneMap Component={ColLayerItem} id={item}/>
              ))
          }
        </div>:null
        }
        <style jsx>{`
            .row-layer-item{
                padding:15px 0;
                display:flex;
                width:100%;
                align-items:center;
                justify-content:space-between;
            }

            .row-layer-item .row-layer-item-label{
                display:flex;
                flex:1;
                align-items:center;
                gap:5px;
            }

            .row-layer-item .row-layer-item-cta{
                display:flex;
                flex:1;
                align-items:center;
                justify-content:flex-end;
                gap:20px;
            }

            .row-item-container{
                padding-left:20px;
            }

            
        `}</style>
        </>
    )
}

export default RowLayerItem