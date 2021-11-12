import React from 'react'



const ViewPort = ({children})=>{

    return(
        <>
        <div className="viewport">
            {children}
        </div>
        
        <style jsx>{`
            .viewport{
                flex:1;
                display:flex;
                flex-direction:column;
            }
        `}</style>
        </>
    )
}

export default ViewPort