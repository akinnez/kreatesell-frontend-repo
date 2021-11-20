import React from 'react'
import { useNode } from '@craftjs/core'


const RowPane = ({children,
        gap,flexDirection,
        marginTop,marginBottom,marginRight,marginLeft
    })=>{
    const {connectors:{connect,drag}} = useNode()


    return(
        <>
        <div className="rowpane" ref={ref => connect(drag(ref))}
            style={{
                gap:gap,
                marginBottom:marginBottom,
                marginTop:marginTop,
                marginRight:marginRight,
                marginLeft:marginLeft,
                flexDirection:flexDirection
            }}>
            {children}
        </div>
        <style jsx>{`
            .rowpane{
                display:flex;
            }
        `}</style>
        </>
    )
}

export default RowPane


RowPane.craft = {
    displayName:"Row",
    props:{
        gap:10,
        marginBottom:10,
        marginRight:0,
        marginLeft:0,
        marginTop:0,
        flexDirection:'row'
    }
}