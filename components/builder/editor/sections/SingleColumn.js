import React from 'react'
import Container from '../container'
import { Element,useNode } from '@craftjs/core'

const Column = ({children,...rest})=>{
    const { connectors: {connect} } = useNode();

    return(
        <div ref={connect} {...rest}>
            {children}
        </div>
    )

}

export const SingleColumn = ()=>{
    return(
       <Container>
           <Element id="col1" is={Column} style={{flex:1, minHeight:200}} canvas></Element>
       </Container>     
    )
}

export default SingleColumn

SingleColumn.craft ={
    displayName:"Section"
}