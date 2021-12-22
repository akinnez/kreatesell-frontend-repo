import React from 'react'
import {Spin} from 'antd'



const Loader = ({...rest})=>{

    return(
        <>
        <div className="container">
            <Spin {...rest}/> 
        </div>
        <style jsx>{`
            .container{
                display:flex;
                align-items:center;
                justify-content:center;
                height:100%;
            }
        `}</style>
        </>
           )
}

export default Loader