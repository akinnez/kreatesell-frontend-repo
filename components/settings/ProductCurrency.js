import React,{useState,useEffect} from 'react'
import style from './Index.module.scss'
import {Checkbox,Row,Col,Spin} from 'antd'
import {Button} from '../form-input'
import ApiService from '../../utils/axios'



const Index = ({list=[]})=>{
  

    return(
        <div className={style.wrapper}>

        <h3>Store Currency Settings</h3>
        <div className={style.bordered}>
            <h4>Custom Product Currency - Customize your product currency</h4>
            <p>Your(Creators) country currency is selected by default but you can decide to turn it off if you prefer to. You can select other options if you prefer to set the amount when adding a product on the add product section. Anyone you do not select here will be converted to automatically if allowed and selected by your customer.</p>
            <h4>Customize the amount you can set when adding a product</h4>

            <Checkbox.Group style={{ width: '100%' }} onChange={(e)=>console.log(e)}>
                <Row>
                      {  list?.map(({label,value},i)=>(
                            <Col key={i}  md={8} sm={8}>
                            <Checkbox value={value}>{label}</Checkbox>
                    </Col>
                        ))}
                    
                </Row>
            </Checkbox.Group>

            <Button type="primary" style={{marginTop:"20px"}} label="Update Details"/>
       
            </div>
        
        </div>
    )
}

export default Index