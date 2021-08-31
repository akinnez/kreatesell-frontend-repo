import React,{useState,useEffect} from 'react'
import style from './Index.module.scss'
import {Checkbox,Row,Col,Spin,Form} from 'antd'
import {Button} from '../form-input'
import ApiService from '../../utils/axios'
import {Input} from '../form-input'

const width = '600px'

const Index = ()=>{
    const [state, setState] = useState()
    const [loading, setLoading] = useState(false)

  

        useEffect(()=>{
            setLoading(true)
            ApiService.request(
                'GET',
                'v1/kreatesell/utils/allowed-currencies',
                (res)=>{
                    setLoading(false)
                    const item = res?.data?.currencies?.map(({id,short_name})=>({label:short_name,value:id}))
                    setState(item)
                })
        },[])


    return(
        <div className={style.wrapper}>

        <div className={style.bordered}>
            <h4>Password</h4>
            <Form layout="vertical">
                <Input placeholder=""
                    label="Current Password"
                    extraLabel="- Enter current password to set a new password"
                    placeholder="******"
                    type="password"
                    style={{width}}/>
                <Input placeholder=""
                    label="New Password"
                    placeholder="Choose new password"
                    type="password"
                    style={{width}}/>
                <Input placeholder=""
                    label="Repeat Password"
                    placeholder="Re-enter password"
                    type="password"
                    style={{width}}/>
                <Button type="primary" label="Save Changes"/>
           </Form>
            </div>
        
        </div>
    )
}

export default Index