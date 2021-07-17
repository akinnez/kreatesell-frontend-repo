import React from 'react'
import {AuthLayout} from "../../../components/authlayout"
import Topbar from '../../../components/topbar'
import {Button} from '../../../components/button/Button'
import {Card} from '../../../components/card'


const Index = ()=>{

    return(
        <>
        
        <AuthLayout>
           <Card>
               <p>Home</p>
           </Card>
        </AuthLayout>
        
        
        </>
    )
}

export default Index