import React,{useState,useEffect} from 'react'
import AuthLayout from "../../../../components/authlayout"
import {Card,Tabs} from 'antd'
import style from '../../../../public/css/payout.module.scss'
import Payout from '../../../../components/payout/payouts'
import BankSettings from '../../../../components/payout/bank-settings'
import ApiService from '../../../../utils/axios'

const Index = ()=>{

    const {TabPane} = Tabs
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        ApiService.request('get','v1/kreatesell/store/me',
        ({data})=>{
            setLoading(false)
            setInfo(data?.bank_details)
        })
    },[])

    return(
        <>
        
        <AuthLayout loading={loading}>
            
           <Card bordered={false} className={style.card}>
                <Tabs defaultActiveKey="1" centered size="large">
                    <TabPane tab="Payouts" key="1">
                        <Payout />
                    </TabPane>
                    <TabPane tab="Payout/Bank Settings" key="2">
                        <BankSettings bankInfo={info}/>
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