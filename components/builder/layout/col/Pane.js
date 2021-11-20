import React from 'react'
import { useNode } from '@craftjs/core'


const ColPane = ({children,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight
    })=>{
    const {isHover,isSelected,connectors:{connect,drag}} = useNode((state)=>({
        isHover:state.events.hovered,
        isSelected:state.events.selected
    }))


    return(
        <>
        <div style={{paddingTop:paddingTop,paddingBottom:paddingBottom,
                    paddingLeft:paddingLeft,paddingRight:paddingRight}}
            className={`col-pane ${isHover || isSelected ? 'selected-hover': !children ? 'empty':null}`} ref={ref => connect(drag(ref))}>
            {children}
        </div>
        <style jsx>{`
            .col-pane{
                min-height:200px;
                flex:1;
                border:1px dashed transparent;
            }

            .selected-hover{
                border-color:#D9D9D9;
            }

            .empty{
                background-color:rgba(245, 252, 255, 0.84);
            }
        `}</style>
        </>
    )
}

export default ColPane


ColPane.craft={
    displayName:"Column",
    props:{

    }
}