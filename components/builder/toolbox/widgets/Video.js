import React from 'react'
import { useNode } from '@craftjs/core'
import styled from "styled-components";




const Video = ({text,fontSize,color,fontFamily,fontWeight})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
           <img src="/img/image.jpg" />           
        </div>
        
        </>
    )
}

export default Video