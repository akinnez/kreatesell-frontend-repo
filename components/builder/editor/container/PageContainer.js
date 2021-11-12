import React,{useEffect} from 'react'
import PageContainerSettings from './PageContainerSettings'
import { useNode,useEditor } from '@craftjs/core';
import QuickActions from '../../util/quickactions'

const Page = ({
        children,
        fillSpace, 
        flexDirection,
        backgroundColor,
        gridTemplateColumn,
        backgroundImage,
        display,
        width,
        height,
        paddingTop,
        paddingBottom,
        paddingLeft,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        position,
        paddingRight})=>{

        
        const {isHover,name, dom, connectors: {connect,drag} } = useNode((node)=>({
                isHover: node.events.hovered,
                dom: node.dom,
                name: "Page",
            }));
        
    return(

        <>
      
        <div ref={(ref)=>connect(drag(ref))}
            style={{
                minWidth:width,
                minHeight:height,
                flex:fillSpace == 'yes'? 1:'unset',
                flexDirection,
                gridTemplateColumns:gridTemplateColumn,
                backgroundColor,
                display:display,
                position:position,
                paddingTop:paddingTop+'px',
                paddingBottom:paddingBottom+'px',
                paddingRight:paddingRight+'px',
                paddingLeft:paddingLeft+'px',
                marginTop:marginTop+'px',
                marginBottom:marginBottom+'px',
                marginLeft:marginLeft+'px',
                marginRight:marginRight+'px',
                backgroundImage:`url(${backgroundImage})`,
                backgroundRepeat:'no-repeat',
                backgroundPosition:"center",
                backgroundSize:"cover"
            }}>               
            {children}
        </div>
        <style jsx>{`

        `}</style>
       </>
    )
}

export default Page


Page.craft = {
    displayName:"Page",
    props:{
        fillSpace:'no', 
        flexDirection:"column",
        backgroundColor:'#ffffff',
        gridTemplateColumn:"auto",
        width:100,
        display:"flex",
        height:100,
        position:"relative",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        marginRight:0,
        marginLeft:0,
        marginTop:0,
        marginBottom:0,
        backgroundImage:''
    },
    related:{
        settings:PageContainerSettings
    },
    rules: {
        canDrag: (node) => true
      }
}