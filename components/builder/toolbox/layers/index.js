import React from 'react'
import Container from '../../sidebar/menu/Container'
import {Layers} from "@craftjs/layers"




const Layout = ({open,onClose=()=>{},title})=>{

    return(
        <Container open={open} onClose={()=>onClose()} title={title}>
            <Layers />
        </Container>
    )
}

export default Layout