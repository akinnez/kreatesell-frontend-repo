import React from 'react'
import { useNode } from '@craftjs/core'
import styled from "styled-components";


const DividerTag = styled.div`
    height:1px;
    background-color:#000000;
`

const Divider = ({text,fontSize,color,fontFamily,fontWeight})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
           <DividerTag />           
        </div>
        
        </>
    )
}

export default Divider