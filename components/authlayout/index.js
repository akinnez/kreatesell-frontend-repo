import React from 'react';
import {Sidebar} from '../sidebar'


export const AuthLayout = ({children})=>{


    return(
        <>
        <div className="page-content">
            <Sidebar />
            <main>{children}</main>
        </div>
        <style jsx>{`
            .page-content{
                width:100vw;
                height:100vh;
                background-color:#E5E5E5;
            }

            main{
                padding: 0 0 20px 300px;

            }
        
        `}</style>
        </>
    )
}