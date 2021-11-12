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

export const TripleColumn = ()=>{
    return(
       <Container display="grid" gridTemplateColumn="33.33% 33.33% 33.33%">
           <Element id="col1" is={Column} style={{flex:1, minHeight:200}} canvas></Element>
           <Element id="col2" is={Column} style={{flex:1, minHeight:200}} canvas></Element>
           <Element id="col3" is={Column} style={{flex:1, minHeight:200}} canvas></Element>
       </Container>     
    )
}

export default TripleColumn

TripleColumn.craft ={
    displayName:"Section"
}