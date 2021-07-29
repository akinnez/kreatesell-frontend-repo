import React from 'react'
import {AuthLayout} from "../../../components/authlayout"
import Topbar from '../../../components/topbar'
import {Card} from '../../../components/card'
import {TextInput,Button, TextArea,Radio, CustomSelect, DateInput, FileInput, Uploader,Checkbox} from '../../../components/inputPack'
import {Formik, Form} from 'formik'



const Index = ()=>{

    return(
        <>
        
        <AuthLayout>
            <Formik
            initialValues={{productName:"", preOrder:false, userName:"", bio:"", profilePicture:"", country:"", facebook:"", instagram:"", linkedIn:"", twitter:""}}
            >{({values,setFieldValue, isSubmitting, errors})=>(
                <Form>
           <Card>
               <div style={{padding:"5px 0 0 40px"}}>
               <div className="row">
                   <div className="col-12">
                        <h3>Checkout details</h3>
                    </div>
               </div>
               <div className="row">
                   <div className="col-8">
                        <TextInput 
                            label="Checkout Button CTA (Call To Action)"
                            value={values.productName}
                            style={{width:"320px"}}
                            onChange={(e)=>setFieldValue("productName",e)}
                            placeholder="Buy now"/>
                             <p className="form-desc-txt">Enter a customised CTA only if you want to override the default label for the checkout button on the product page.</p>
                   </div>
               </div>
               <div className="row">
                   <div className="col-8">
                        <TextInput 
                            type="number"
                            label="Price"
                            labelExtra=" set to price to 0 for a free product."
                            value={values.productName}
                            onChange={(e)=>setFieldValue("productName",e)}
                            style={{width:"320px"}}
                            placeholder="0"/>
                            <p className="form-desc-txt">By default, you set the price in your local currency and we automatically convert the amount to other currencies on your store page, but if you'd like to set the fixed price for other currencies, e.g USD?, you can enable this option on your <a href="#">currency settings</a> page.</p>
                   </div>
               </div>

               <div className="row">
                   <div className="col-12">
                   <Checkbox 
                        label="Show striked out original price"
                        value={values.preOrder} 
                        onChange={(e)=>setFieldValue("preOrder",e)}/>
                   </div>
               </div>

               <div className="row">
                   <div className="col-4">
                        <TextInput 
                            type="number"
                            label="Original price (NGN) * "
                            value={values.productName}
                            onChange={(e)=>setFieldValue("productName",e)}
                            placeholder="0"/>
                   </div>
               </div>

               <div className="row">
                   <div className="col-6">
                   <Checkbox 
                        label="Create Coupon"
                        extralable="- create a coupon for this product."
                        value={values.preOrder} 
                        onChange={(e)=>setFieldValue("preOrder",e)}/>
                         <TextInput 
                            value={values.productName}
                            onChange={(e)=>setFieldValue("productName",e)}
                            placeholder="Enter coupon code"
                            style={{width:"320px"}}/>
                            <p className="form-desc-txt">For the coupon discount, you can set either the percentage or the fixed amount discount. 
If you want to create coupon for other products you can see more on coupon settings page.</p>
                   </div>
               </div>


             
               
             
               <div className="row">
                   <div className="col-4">
                       <DateInput label="Preorder release date"/>
                   </div>
               </div>
              
            <div className="row">
                <div className="col-3">
                    <Radio label="Percentage(%)"/>
                    <TextInput 
                        placeholder="0"/>
                </div>
                <div className="col-3">
                <Radio label="Fixed Amount(NGN)"/>
                    <TextInput 
                        placeholder="0"/>
                </div>
            </div>

            
            
           
                  </div>
                  
                <div className="row">
                    <div className="col-12 center" style={{padding:"30px 0"}}>
                        <p className="muted-text">Almost there, now click the button to create product from template</p>
                        <Button label="Next"/>
                    </div>
                </div>
               
           </Card>
           </Form>
            )}</Formik>
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