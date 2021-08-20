import React,{useState} from 'react'
import style from './Index.module.scss'
import {Card,Row,Col,Form, Radio,Space} from 'antd'
import {Button} from '../form-input'
import { useSelector,useDispatch } from 'react-redux'
import {getBanks} from '../../redux/actions/utilityActions'
import ApiService from '../../utils/axios'
import BankModal from './account-info-form'

const BankSettings = ()=>{

        const [mode, setMode] = useState()
        const [open, setOpen] = useState()

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
                    <Radio name="name" value={1}><b>Automatic</b></Radio>
                    <p className={style.sch_desc}>Your funds will be automatically withdrawn into the provided bank account.</p>
                    <Radio name="name" value={2}><b>Manual</b></Radio>
                    <p className={style.sch_desc}>By choosing this option, you'll have to be manually withdrawing your funds to the provided bank account.</p>
                   <Button label="Update Settings" style={{width:"200px"}} type="primary"/>
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
                <div>First Bank of Nigeria</div>
            </div>
            <div className={style.bank_list}>
                <div>Account Number</div>
                <div>3077230408</div>
            </div>
            <div className={style.bank_list}>
                <div>Account Name</div>
                <div>Abiodun Michael</div>
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