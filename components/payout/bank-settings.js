import React,{useState, useEffect} from 'react'
import style from './Index.module.scss'
import {Card,Row,Col,Form, Radio,Space} from 'antd'
import {Button} from '../form-input'
import fetcher from '../../utils/fetcher'
import useSWR from 'swr'
import ApiService from '../../utils/axios'
import BankModal from './account-info-form'

const BankSettings = ()=>{

        const {data} = useSWR('v1/kreatesell/store/me', fetcher)
        const [mode, setMode] = useState(1)
        const [open, setOpen] = useState()
        const [loading, setLoading] = useState(false)

        const handleMode = ()=>{
            setLoading(true)
            ApiService.request(
                'PATCH',
                'v1/kreatesell/payment/update-payout-mode/'+mode,
                (res)=>{
                    setLoading(false)
                },(err)=>{console.log(err)},
                {
                    "country_id": bank_details?.country_id,
                    "bank_id": bank_details?.bank_id,
                    "account_number": bank_details?.account_number,
                    "account_name": bank_details?.account_number,
                  }
            )
        }

        

    return(
        <>
         <div className={style.header_container}>
            <h3>Payout/Bank settings</h3>
        </div>
        <Row gutter={50}>
            <Col span={12}>
            <Card className={style.bank_card}>
                <p className={style.title}>Payout Schdule</p>
                <p className={style.subtitle}>How do you want to be receiving your payment?</p>
                <Form>
               
                <Space direction="vertical">
                    <Radio name="name" value={1} onChange={()=>setMode(1)}  checked={mode == 1}><b>Automatic</b></Radio>
                    <p className={style.sch_desc}>Your funds will be automatically withdrawn into the provided bank account.</p>
                    <Radio name="name" value={2} disabled onChange={()=>setMode(2)} checked={mode == 2}><b>Manual</b></Radio>
                    <p className={style.sch_desc}>By choosing this option, you'll have to be manually withdrawing your funds to the provided bank account.</p>
                   <Button disabled label="Update Settings" loading={loading} onClick={handleMode} style={{width:"200px"}} type="primary"/>
                </Space>
              
                </Form>
            </Card>
            </Col>
            <Col span={12}>
            <Card className={style.bank_card}>
            <p className={style.title}>We pay your funds to this account</p>

            <div className={style.bank_list}>
                <div>Currency</div>
                <div>NGN</div>
            </div>
            <div className={style.bank_list}>
                <div>Bank Name</div>
                <div>{data?.bank_details?.bank_name}</div>
            </div>
            <div className={style.bank_list}>
                <div>Account Number</div>
                <div>{data?.bank_details?.account_number}</div>
            </div>
            <div className={style.bank_list}>
                <div>Account Name</div>
                <div>{data?.bank_details?.account_name}</div>
            </div>
            <Button type="primary" onClick={()=>setOpen(true)} label="Change payout account settings"/>
            </Card>
            </Col>
            
        </Row>

        <BankModal open={open} onClose={()=>setOpen(false)}/>
        </>
    )
}

export default BankSettings