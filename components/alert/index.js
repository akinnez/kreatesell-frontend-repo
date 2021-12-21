import React from 'react'



const Alert = ()=>{
    return(
        <>
        <div className="alert-wrapper">
            <h5>Please read carefully</h5>
            <p>Make sure your account details are correct before proceeding. 
                We will not be held liable for failed transactions resulting from incorrect bank details.</p>
        </div>
        <style jsx>{`
            .alert-wrapper{
                padding: 8px 8px 8px 16px;
                width: 100%;
                min-height: 82px;
                background: #FFFDD0;

            }

            .alert-wrapper h5{
                font-weight: 500;
                font-size: 16px;
                line-height: 26px;
                color: #FF5C00;
            }

            .alert-wrapper p{
                font-size: 12px;
                line-height: 18px;
                color: #FF5C00;
            }
        `}</style>
        </>
    )
}

export default Alert