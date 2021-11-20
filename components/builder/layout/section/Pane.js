import React from 'react'
import { useNode,useEditor } from '@craftjs/core'


const SectionPane = ({children})=>{
    const {isSelected,connectors:{connect,drag}} = useNode((node)=>({
        isSelected:node.events.selected
    }))

    return(
        <>
        <div className={`section-pane ${isSelected ? 'selected':null}`} ref={ref => connect(drag(ref))}>
            {children}
        </div>
        <style jsx>{`
            .section-pane{
                border:1px solid transparent;
            }

            .selected{
                border-color:red;
            }
        
        `}</style>
        </>
    )
}

export default SectionPane