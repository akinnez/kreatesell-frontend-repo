import React from 'react'
import { useNode } from '@craftjs/core'
import styled from "styled-components";


const ButtonTag = styled.button`
    background-color: #0072EF;
    border-radius: 8px;
    width:160px;
    font-size: 14px;
    outline:none;
    border:none;
    color:#ffffff;
    padding:5px 0;
`

const Button = ({text,fontSize,color,fontFamily,fontWeight})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
           <ButtonTag>Button</ButtonTag>          
        </div>
        
        </>
    )
}

export default Button