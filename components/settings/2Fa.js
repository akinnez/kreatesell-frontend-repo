import React,{useState} from 'react'
import {Row, Col, Switch} from 'antd'
import ApiService from '../../utils/axios'

const TwoFactor = ()=>{

    const [loading, setLoading] = useState(false)

    const handleChange = ()=>{
        setLoading(true)
        ApiService.request(
            'post',
            'Seller/Activate/De-Activate2FA',
            (res)=>{
                setLoading(false)
            }
        )
    }

    return(
        <>
            <Row style={{marginTop:"50px"}}>
                <Col md={18} sm={24}>
                    <h2>Enable Two-Factor Authentication using email</h2>
                    <p style={{color:"#8C8C8C"}}>Two-factor Authentication is an additional security layer to secure your account.</p>
                </Col>
                <Col md={6} sm={24} style={{display:"flex", justifyContent:"flex-end"}}>
                    
                <Switch defaultChecked loading={loading} onChange={handleChange}/>
                </Col>
            </Row>
        </>
    )
}


export default TwoFactor
