import React from 'react'
import { Element,useNode } from '@craftjs/core'


const Indicator = ()=>{


return(

    <>
    <div className="active"></div>
     <style jsx>{`
        .active{
            position:absolute;
            top:0;
            left:0;
            bottom:0;
            right:0;
            border:1px dashed #D9D9D9;
            background: rgba(245, 252, 255, 0.84);
        }
    `}</style>
    </>
)
}

const Column = ({children,...rest})=>{
    const { connectors: {connect} } = useNode();
       

    
    return(
        <>
        <div className="cls" ref={connect} {...rest}>
            {children}
            {
                !children ? <Indicator />:null
            }
        </div>
        <style jsx>{`
            .cls{
                position:relative
            }
        `}</style>
        </>
    )

}

export default Column