import React from "react";
import { Popconfirm,Tooltip} from "antd";
import { useEditor,useNode } from "@craftjs/core";
import {MoveLayerIcon,LayerDelete,LayerDuplicate,LayerSetting} from '../../../icons'
import {Column} from '../../../layout'
import {useDispatch} from 'react-redux'
import { openTab } from "../../../../../redux/slices/pageSlices";


const ColLayerItem = ({id})=>{

    const dispatch = useDispatch()

    const { displayName,isHidden, actions,query:{parseFreshNode,node} } = useEditor((state, query) => ({
        displayName: state.nodes[id].data?.displayName,
        isHidden: state.nodes[id].data.hidden
      }));

      const {data:{parent,props}} = node(id).get()
      const handleDuplicate = ()=>{
        const freshNode = {
            data:{
                type:Column,
                props:props
            }
        }
        const newNode = parseFreshNode(freshNode).toNode();
        actions.add(newNode,parent);

       
    }

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


    const handleStyleCta = ()=>{
        actions.selectNode(id)
        dispatch(openTab(4))
    }


    return(
        <>
        <div className="col-layer-item">
            <div className="col-layer-item-label"
                 onClick={()=>actions.selectNode(id)}>
                <MoveLayerIcon /><span>{displayName}</span>
            </div>
            <div className="col-layer-item-cta">
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
                     <LayerSetting onClick={()=>handleStyleCta()}/>
                </div>
        </div>
        <div className="col-item-container">
        
        </div>
        <style jsx>{`
            .col-layer-item{
                padding:15px 0;
                display:flex;
                width:100%;
                align-items:center;
                justify-content:space-between;
            }

            .col-layer-item .col-layer-item-label{
                display:flex;
                flex:1;
                align-items:center;
                gap:5px;
            }

            .col-layer-item .col-layer-item-cta{
                display:flex;
                flex:1;
                align-items:center;
                justify-content:flex-end;
                gap:20px;
            }

            .col-item-container{
                padding-left:20px;
            }

            
        `}</style>
        </>
    )
}

export default ColLayerItem