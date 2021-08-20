import React,{useState} from 'react'
import AuthLayout from "../../../../components/authlayout"
import {Card,Tabs} from 'antd'
import style from '../../../../public/css/payout.module.scss'
import Payout from '../../../../components/payout/payouts'
import BankSettings from '../../../../components/payout/bank-settings'

const Index = ()=>{

    const {TabPane} = Tabs

    return(
        <>
        
        <AuthLayout>
            
           <Card bordered={false} className={style.card}>
                <Tabs defaultActiveKey="1" centered size="large">
                    <TabPane tab="Payouts" key="1">
                    <Payout />
                    </TabPane>
                    <TabPane tab="Payout/Bank Settings" key="2">
                        <BankSettings />
                    </TabPane>
                    <TabPane tab="Wallet" key="3">
                    Content of Tab Pane 3
                    </TabPane>
                </Tabs>
           </Card>
                   
          
        </AuthLayout>
        
        
        </>
    )
}

export default Index