import React,{useState} from 'react'
import AuthLayout from "../../../../components/authlayout"
import {Card,Tabs} from 'antd'
import style from '../../../../public/css/Settings.module.scss'
import Currency from '../../../../components/settings/Currency'
import Account from '../../../../components/settings/Account'


const Index = ()=>{

    const {TabPane} = Tabs

    return(
        <>
        
        <AuthLayout>
            
           <Card bordered={false} className={style.card}>
                <Tabs defaultActiveKey="1" centered size="large">
                    <TabPane tab="Currencies" key="1">
                        <Currency />
                    </TabPane>
                    <TabPane tab="Account" key="2">
                        <Account />
                    </TabPane>
                    <TabPane tab="Advanced" key="3">
                    Content of Tab Pane 3
                    </TabPane>
                </Tabs>
           </Card>
                   
          
        </AuthLayout>
        
        
        </>
    )
}

export default Index