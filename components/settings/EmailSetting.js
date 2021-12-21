import React,{useState,useEffect} from 'react'
import style from './Index.module.scss'
import {Checkbox,Row,Col,Spin,Form} from 'antd'
import {Button} from '../form-input'
import ApiService from '../../utils/axios'
import {Input} from '../form-input'



const Index = ()=>{
    const [state, setState] = useState()
    const [loading, setLoading] = useState(false)

  

        useEffect(()=>{
            setLoading(true)
            ApiService.request(
                'GET',
                'v1/kreatesell/utils/all-currencies',
                (res)=>{
                    setLoading(false)
                    const item = res?.data?.currencies?.map(({id,short_name})=>({label:short_name,value:id}))
                    setState(item)
                })
        },[])


    return(
        <div className={style.wrapper}>

        <h3>Account Settings</h3>
        <p>Edit your login details here.</p>
        <div className={style.bordered}>
            <h4>Email</h4>
            <Form layout="vertical">
                <Input placeholder=""
                    extraLabel="Change your email"
                    placeholder="adeddada@gmail.com"
                    type="email"
                    style={{width:"600px"}}/>
                <Button type="primary" label="Save Changes"/>
           </Form>
            </div>
        
        </div>
    )
}

export default Index