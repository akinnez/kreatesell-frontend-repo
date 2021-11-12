import React from "react"
import { Resizable } from "re-resizable"
import { useNode } from "@craftjs/core"

const Resizer = ({children})=>{
    const {id} = useNode((node)=>{
        id:node.id
    })
    
    return(
        <Resizable>{children}</Resizable>
    )
}

export default Resizer