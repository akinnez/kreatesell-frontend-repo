import React from 'react'


const Topbar = ({CtaButton = ()=>(<></>)})=>{


    return(
        <>
        <nav>
            {CtaButton}
        </nav>
        <style jsx>{`
            nav{
                height:70px;
                display:flex;
                justify-content:flex-end;
                padding-right:20px;
                align-items:center;
            }

        
        `}</style>
        
        </>
    )
}

export default Topbar