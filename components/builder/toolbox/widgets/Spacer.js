import React from 'react'
import { useNode } from '@craftjs/core'
import styled from "styled-components";


const SpacerTag = styled.div`
    height:5px;
`

const Spacer = ({text,fontSize,color,fontFamily,fontWeight})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
           <SpacerTag />           
        </div>
        
        </>
    )
}

export default Spacer