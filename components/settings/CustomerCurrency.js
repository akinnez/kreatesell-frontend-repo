import React,{useState,useEffect} from 'react'
import style from './Index.module.scss'
import {Checkbox,Row,Col,Spin} from 'antd'
import {Button} from '../form-input'




const Index = ({list=[]})=>{

    return(
        <div className={style.wrapper}>

      
        <div className={style.bordered}>
            <h4>Customer's Currency Options</h4>
            <p> These are the currencies that your customers get to see and select when they want to buy a product. Although your payouts can only be in your local currency, your store currency can be any that are listed here. Customers can pay in their local currency.</p>


            <Checkbox.Group style={{ width: '100%' }} onChange={(e)=>console.log(e)}>
                <Row>
                      {  list?.map(({label,value},i)=>(
                            <Col key={i} md={8} sm={8}>
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