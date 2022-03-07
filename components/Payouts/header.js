import React,{useState} from 'react'
import style from './Index.module.scss'
import {DatePicker,Space,Form,Input as AntInput} from 'antd'
import {Button,Select} from '../form-input'
import {FilterIcon} from '../IconPack'
import BankModal from './account-info-form'



const Header = ()=>{
  const [open, setOpen] = useState(false)
  

    return(
        <>
        <div className={style.header_container}>
            <h3>Payouts</h3>
            <Button onClick={()=>setOpen(true)} type="primary" style={{width:"180px"}} label="Payout Setting"/>
        </div>

            <Form layout="vertical" style={{paddingLeft:"25px", marginTop:"20px"}}>
            <Space size={30} wrap>
            <Form.Item label="Search">
                <AntInput placeholder="Search" 
                    size="large"
                    className={style.input} 
                    extraLabel="Search"/>
            </Form.Item>
            
                <Select placeholder="NGN" label="Currency"
                     defaultValue="" style={{width:"200px"}} size="large">
                    <Select.Option value="NGN">NGN</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="GBP">GBP</Select.Option>
                    <Select.Option value="KES">KES</Select.Option>
                    <Select.Option value="ZAR">ZAR</Select.Option>
                    <Select.Option value="TZS">TZS</Select.Option>
                    <Select.Option value="UGX">UGX</Select.Option>
                </Select>
         
            <Form.Item label="Show from">
            <DatePicker size="large" className={style.input} />
            </Form.Item>
            <Form.Item label="to">
            <DatePicker size="large"  className={style.input} />
            </Form.Item>
            <Form.Item label=" ">
                <Button type="primary" icon={<FilterIcon />} label="Filter"/>
            </Form.Item>
            </Space>
</Form>
     <BankModal open={open} onClose={()=>setOpen(false)}/>
        </>
    )
}

export default Header