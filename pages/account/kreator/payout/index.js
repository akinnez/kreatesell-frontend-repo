import React,{useState} from 'react'
import {AuthLayout} from "../../../components/authlayout"
import Topbar from '../../../components/topbar'
import {Card} from '../../../components/card'
import {TextInput,Button , CustomSelect,DatePicker, DateInput, FileInput, Uploader,Checkbox, Switch} from '../../../components/inputPack'
import {Formik, Form} from 'formik'
import Router from 'next/router'
import Tab,{TabItem} from '../../../components/tab'
import styles from '../../../public/css/Product.module.scss'
import {FilterIcon} from '../../../components/IconPack'



const Index = ()=>{

    const [tab, setTab] = useState(0)

    return(
        <>
        
        <AuthLayout>
            
           
                   
           <Card>
                <Tab titles={["Payouts","Payout/Bank settings","Wallet"]} active={tab} onSelect={(e)=>setTab(e)}>
                    <TabItem>
                        <div className="row">
                            <div className="col-6">
                                <h3>Payouts</h3>
                            </div>
                            <div className="col-6 right">
                                <Button label="Payout setting"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <TextInput placeholder="Search"
                                label="Search"
                                labelStyle={{color:"#8C8C8C", margin:0}}
                                style={{margin:0}}/>
                            </div>
                            <div className="col-2">
                                <CustomSelect placeholder="NGN"
                                list={[{label:"NGN",value:"NGN"},
                                {label:"USD",value:"USD"},
                                {label:"GBP", value:"GBP"},{label:"KES", value:"KES"},
                                {label:"ZAR", value:"ZAR"},{label:"TZS", value:"TZS"},{label:"UGX", value:"UGX"}]}
                                 labelStyle={{color:"#8C8C8C", margin:0}}
                                 label="Currency"
                                 margin="0px"
                                 style={{margin:0}}/>
                            </div>
                            <div className="col-3">
                                <TextInput 
                                type="date" 
                                placeholder="2021-07-22 "
                                label="Show from"
                                labelStyle={{color:"#8C8C8C", margin:0}}
                                style={{margin:0}}/>
                            </div>
                            <div className="col-3">
                                <TextInput 
                                type="date"  
                                placeholder="2021-07-22"
                                label="to"
                                labelStyle={{color:"#8C8C8C", margin:0}}
                                style={{margin:0}}/>
                            </div>
                            <div className="col-1">
                                <Button label="Filter" Icon={FilterIcon} style={{minWidth:"40px", display:"flex", gap:"2px", alignItems:"center"}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
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
                            </div>
                        </div>
                    </TabItem>
                    <TabItem>
                    <p>h2</p>
                    </TabItem>
                </Tab>
            
               
           </Card>
           
        </AuthLayout>
        
        <style jsx>{`
           
            .grey-bg{
                background-color:#f5f5f5;
                height:202px;
                padding:20px;
            }

            p#grey-bg-title{
                font-weight:500;
            }

            p#grey-bg-title span{
                color:#8C8C8C;
            }

          


          
        `}</style>
        </>
    )
}

export default Index