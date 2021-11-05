import React from 'react'
import { useNode } from '@craftjs/core'
import {MyInput} from '../../forms'


const Spacer = ({height})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
           <div style={{height:height+'px'}}/>           
        </div>
        
        </>
    )
}

export default Spacer

const SpaceSettings = ()=>{
    const { actions: {setProp}, height } = useNode((node) => ({
        height: node.data.props.height}));
    return(
        <MyInput label="Height" 
            value={height} 
            onChange={(e)=>setProp(props=>props.height = e)} 
            style={{width:120}}/>
    )
}


Spacer.craft = {
    name:"Spacer",
    props:{
        height:10
    },
    related:{
        settings:SpaceSettings
    }
}