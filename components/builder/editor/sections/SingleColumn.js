import React,{useEffect} from 'react'
import Container from '../container'
import { Element,useNode } from '@craftjs/core'
import Column from './Column'




export const SingleColumn = ()=>{
    return(
        <>
       <Container display="grid">
           <Element id="col1" is={Column} style={{flex:1, minHeight:200}} canvas></Element>
       </Container> 
        
       </>   
    )
}

export default SingleColumn

SingleColumn.craft ={
    displayName:"Section"
}