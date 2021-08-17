import React from 'react'
import { Row,Column } from '../grid'
import { TextInput,Button , CustomSelect,DatePicker, DateInput, FileInput, 
    Uploader,Checkbox, Switch } from '../inputPack'
import {Formik, Form} from 'formik'
import Alert from '../alert'
import {Card} from '../card'




const Bank = ()=>{
    return(
        <>
        <div className="bank-modal-wrapper">
            <Row>
                <Column m="2"/>
                <Column m="8">
                    <Card>

                
        <Formik>
            {()=>(
                <Form>
                    <Row>
                        <Column m="12" align="center">
                            <h3
                                style={{fontSize: "24px",lineHeight: "32px",color: "#262626"}}
                                >Provide your Bank details</h3>
                            <p style={{fontSize:"16px",lineHeight:"26px",color:"#8C8C8C", marginTop:"10px"}}>We pay your funds to this account</p>
                        </Column>
                    </Row>
                    <Row>
                        <Column m="12">
                            <CustomSelect 
                                label="Select Country"
                                list={[{label:"Nigeria",value:"Nigeria"}]}/>
                        </Column>
                    </Row>
                    <Row>
                        <Column m="12">
                        <CustomSelect 
                                label="Select Bank"
                                placeholder="Choose Bank"
                                list={[{label:"FBN",value:"FBN"}]}/>
                        </Column>
                    </Row>
                    <Row>
                        <Column m="12">
                            <TextInput 
                                label="Account Number"
                                placeholder="Enter account Number"/>
                        </Column>
                    </Row>
                    <Row>
                        <Column m="12">
                            <TextInput 
                                label="Account Name"
                                placeholder="Enter account Name"/>
                        </Column>
                    </Row>
                    <Row>
                        <Column m="12">
                           <Alert />
                        </Column>
                    </Row>
                    <Row>
                        <Column m="12">
                            <TextInput 
                                type="password"
                                label="Enter your current password"
                                placeholder="*********"/>
                        </Column>
                    </Row>
                    <Row>
                        <Column m="12" align="center">
                           <p>Finished adding your account details?</p>
                           <Button label="Save Bank Info" style={{marginTop:"10px"}}/>
                        </Column>
                    </Row>
                </Form>
            )}
        </Formik>
        </Card>
                </Column>
                <Column m="2"/>
            </Row>
        </div>

        <style jsx>{`
            .bank-modal-wrapper{
                position:fixed;
                top:0;
                left:0;
                right:0;
                bottom:0;
                display:flex;
                justify-content:center;
                align-items:center;
                background: rgba(38, 38, 38, .5);
                max-height:100%;
                overflow-y:auto;

            }
        `}</style>
        </>
    )
}

export default Bank