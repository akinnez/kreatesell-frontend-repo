import React from 'react'
import { useEditor } from '@craftjs/core'



const PaneMap = ({Component,id})=>{
    const {descendants} = useEditor((state,query)=>({
        descendants: query.node(id).descendants()
    }))

    return(
        <>
        {
            descendants?.map((item,i)=>(
                <Component id={item} key={i} />
            ))
        }
       </>
    )
}

export default PaneMap