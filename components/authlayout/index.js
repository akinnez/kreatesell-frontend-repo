import React from 'react';
import {Sidebar} from '../sidebar'
import Topbar from "../topbar"

export const AuthLayout = ({children})=>{


    return(
        <>
            <Sidebar />
            <main>
            <Topbar />
                {children}</main>
      
        <style jsx>{`
           

            main{
                min-height:100vh;
                padding: 0 82px 20px 369px;
                background:#F5F5F5
            }
        
        `}</style>
        </>
    )
}