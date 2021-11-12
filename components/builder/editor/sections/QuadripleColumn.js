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

export const QuadripleColumn = ()=>{
    return(
       <Container display="grid" gridTemplateColumn="25% 25% 25% 25%">
           <Element id="col1" is={Column} style={{minHeight:200}} canvas></Element>
           <Element id="col2" is={Column} style={{minHeight:200}} canvas></Element>
           <Element id="col3" is={Column} style={{minHeight:200}} canvas></Element>
           <Element id="col4" is={Column} style={{minHeight:200}} canvas></Element>
       </Container>     
    )
}

export default QuadripleColumn

QuadripleColumn.craft ={
    displayName:"Section"
}