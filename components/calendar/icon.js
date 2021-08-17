import React from 'react'


export const NextIcon = ({className, ...rest})=>{

    return(
        <>
        <svg {...rest} className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.24143 1.58567L16.3125 8.65674L9.24143 15.7278" stroke="#2C2A67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        </>
    )
}

export const PreviousIcon = ({className,...rest})=>{

    return(
        <>
        <svg {...rest} className={className}  width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.75661 1.58567L1.68555 8.65674L8.75661 15.7278" stroke="#2C2A67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        </>
    )
}