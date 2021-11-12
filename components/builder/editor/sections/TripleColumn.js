import React from 'react'
import Container from '../container'
import { Element,useNode } from '@craftjs/core'
import Column from './Column'

export const TripleColumn = ()=>{
    return(
       <Container display="grid" gap="10"
       gridTemplateColumn="33.33% 33.33% 33.33%">
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