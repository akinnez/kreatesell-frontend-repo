import React from 'react'
import {AuthLayout} from "../../components/authlayout"
import Topbar from '../../components/topbar'
import {Button} from '../../components/button/Button'


const Index = ()=>{


    return(
        <>
        
        <AuthLayout>
            <Topbar CtaButton={<Button text="+ Add Product" bgColor="primaryBlue" 
            style={{width:"150px", fontSize:"14px",height:"42px", padding:"0 20px"}}/>}/>
            <p>Home</p>
        </AuthLayout>
        
        
        </>
    )
}

export default Index