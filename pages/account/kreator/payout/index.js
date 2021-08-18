import React,{useState} from 'react'
import AuthLayout from "../../../../components/authlayout"
import {Card} from '../../../../components/card'
import Payouts from '../../../../components/payout/payouts'
import Bank from '../../../../components/payout/bank-settings'
import Tab,{TabItem} from '../../../../components/tab'



const Index = ()=>{

    const [tab, setTab] = useState(0)

    return(
        <>
        
        <AuthLayout>
            
           
                   
           <Card>
                <Tab titles={["Payouts","Payout/Bank settings","Wallet"]} active={tab} onSelect={(e)=>setTab(e)}>
                    <TabItem>
                       <Payouts /> 
                    </TabItem>
                    <TabItem>
                   <p></p>
                    </TabItem>
                </Tab>
            
               
           </Card>
           <Bank />
        </AuthLayout>
        
        
        </>
    )
}

export default Index