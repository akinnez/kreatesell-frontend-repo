import React from 'react'
import Container from '../container'
import { Element,useNode } from '@craftjs/core'
import Column from './Column'

export const DoubleColumn = ()=>{
    return(
       <Container display="grid" gridTemplateColumn="50% 50%" gap="10">
           <Element id="col1" is={Column} style={{minHeight:200}} canvas></Element>
           <Element id="col2" is={Column} style={{minHeight:200}} canvas></Element>
       </Container>     
    )
}

export default DoubleColumn

DoubleColumn.craft ={
    displayName:"Section"
}