import React from 'react'
import { Row,Column } from '../grid'
import { TextInput,Button , CustomSelect,DatePicker, DateInput, FileInput, 
    Uploader,Checkbox, Switch } from '../inputPack'
import {Formik, Form} from 'formik'
import { FilterIcon } from '../IconPack'

const Payouts = ()=>{
    return(
        <>

        <Formik>
            {()=>(
                <Form>

               
        <Row>
                            <Column m="6">
                                <h3>Payouts</h3>
                            </Column>
                            <Column m="6" align="right">
                                <Button label="Payout setting"/>
                            </Column>
                        </Row>
                        <Row>
                            <Column m="3" s="6">
                                <TextInput placeholder="Search"
                                label="Search"
                                labelStyle={{color:"#8C8C8C", margin:0}}
                                style={{margin:0}}/>
                            </Column>
                            <Column m="3" s="6">
                                <CustomSelect placeholder="NGN"
                                list={[{label:"NGN",value:"NGN"},
                                {label:"USD",value:"USD"},
                                {label:"GBP", value:"GBP"},{label:"KES", value:"KES"},
                                {label:"ZAR", value:"ZAR"},{label:"TZS", value:"TZS"},{label:"UGX", value:"UGX"}]}
                                 labelStyle={{color:"#8C8C8C", margin:0}}
                                 label="Currency"
                                 margin="0px"
                                 style={{margin:0}}/>
                            </Column>
                            <Column m="2" s="5">
                                <TextInput 
                                type="date" 
                                placeholder="2021-07-22 "
                                label="Show from"
                                labelStyle={{color:"#8C8C8C", margin:0}}
                                style={{margin:0}}/>
                            </Column>
                            <Column m="2" s="5">
                                <TextInput 
                                type="date"  
                                placeholder="2021-07-22"
                                label="to"
                                labelStyle={{color:"#8C8C8C", margin:0}}
                                style={{margin:0}}/>
                            </Column>
                            <Column m="2" s="2" align="center" 
                                style={{height:"100%",marginTop:"25px"}}>
                                <Button label="Filter" Icon={FilterIcon} style={{minWidth:"40px", display:"flex", gap:"2px", alignItems:"center"}}/>
                            </Column>
                        </Row>
                        <Row>
                            <Column m="12">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Customer Name</th>
                                            <th>Customer Email</th>
                                            <th>Amount</th>
                                            <th>Transaction Date</th>
                                            <th>Payment Date</th>
                                        </tr>
                                    </thead>
                                </table>
                            </Column>
                        </Row>
                        </Form>
            )}
        </Formik>
        </>
    )
}

export default Payouts