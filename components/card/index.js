import React from 'react'



export const Card = ({children, style})=>{


    return(
        <>
            <div className="card" style={style}>
                {children}
            </div>

            <style jsx>{`
                .card {
                    background: #FFFFFF;
                    box-shadow: 0px 10px 40px rgba(34, 34, 34, 0.1);
                    border-radius: 12px;
                    padding:40px;
                }
            
            `}</style>
        </>
    )
}