import React from 'react'



export const TabItem = ({children})=>{

    return children
}


const Index = ()=>{


    return(
        <>
        <ul className="tab-wrapper">
            <li className="completed">Product Design</li>
            <li className="disabled">Checkout</li>
        </ul>
        

        <style jsx>{`
            .tab-wrapper{
                list-style-type:none;
                display:flex;
                gap:10px;
                padding:0;
                border-bottom:1px solid #BFBFBF;
                justify-content:center;
            }

            .tab-wrapper li{
                border-bottom:2px solid transparent;
                padding:10px;
                font-size:18px;
                cursor:pointer;
            }

            .tab-wrapper li.active{
                font-weight:700;
                color:#0072EF;
                border-bottom-color:#0072EF;
            }

            .tab-wrapper li.completed{
                color:#2DC071;
            }

            .tab-wrapper li.disabled{
                color:#8C8C8C;
                cursor:not-allowed;
            }
        
        `}</style>
        </>
    )
}

export default Index