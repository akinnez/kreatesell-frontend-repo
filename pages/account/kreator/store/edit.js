import React from 'react';
import AuthLayout from "../../../../components/authlayout"
import { Row,Col,Card,Divider,Form,Input,Space } from 'antd';




const Index = ()=>{

    return(
        <>
        
        <AuthLayout>

            <Row>
                <Col span={24}>
                <Card bordered={false}>
                    <h3>Welcome to Kreatesell</h3>
                    <p>Fill out the fields below to complete your profile</p>
                <Space align="center" size="large" direction="vertical">
                    <Form>
                        
                        <Form.Item>
                            <Input size="large" placeholder="Brand name, Business name or Full name"/>
                        </Form.Item>
                    </Form>
                    </Space>
                </Card>
                </Col>
            </Row>

        </AuthLayout>
        <style jsx>{`
            .btn-wrapper{
                display:flex;
                gap:15px;
                justify-content:center;
                margin-top:10px;
            }

            .highlight{
                display:flex;
                align-items:center;
                gap:10px;
            }

            #spacer{
                padding:40px 190px 0 190px
            }

            @media screen and (max-width:600px){
                #spacer{
                    padding:0;
                }
            }
        `}</style>
        </>
    )
}

export default Index