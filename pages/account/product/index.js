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
                        <h3>Add new digital product</h3>
                    </div>
               </div>
               <div className="row">
                   <div className="col-8">
                        <TextInput 
                            label="Product Name"
                            value={values.productName}
                            onChange={(e)=>setFieldValue("productName",e)}
                            labelExtra=" choose a name for the product"
                            placeholder="Brand name, Business name or Full name"/>
                   </div>
               </div>

                <div className="row">
                    <div className="col-8">
                        <TextArea
                            label="Product Description"
                            value={values.bio}
                            onChange={(e)=>setFieldValue("bio",e)}
                            labelExtra="add a description for your product"
                        />
                    </div>
                </div>
               
               <div className="row">
                   <div className="col-12">
                   <Checkbox 
                        label="Enable pre-orders"
                        value={values.preOrder} 
                        onChange={(e)=>setFieldValue("preOrder",e)}/>
                   </div>
               </div>

               <div className="row">
                   <div className="col-4">
                       <DateInput label="Preorder release date"/>
                   </div>
               </div>
              
               <div className="row">
                   <div className="col-12">
                       <Checkbox 
                        label="Upload product content"
                        value={values.preOrder} 
                        onChange={(e)=>setFieldValue("preOrder",e)}/>
                   </div>
               </div>

               <div className="row">
                   <div className="col-12">
                       <Checkbox 
                        label="The file I'll upload is a pre-order sample file, and users should be able to download it during the preorder."
                        value={values.preOrder} 
                        onChange={(e)=>setFieldValue("preOrder",e)}/>
                   </div>
               </div>

               <div className="row">
                   <div className="col-12">
                       <Checkbox 
                        label="Automatically redirect the buyer to an external URL after a purchase"
                        value={values.preOrder} 
                        onChange={(e)=>setFieldValue("preOrder",e)}/>
                   </div>
               </div>
              
               <div className="row">
                      <div className="col-8">
                          <p id="grey-bg-title">Visibility <span>- Should your store visitors be able to see this product?</span></p>
                          <div className="grey-bg">
                              <Radio 
                                value={values.preOrder} 
                                label="Visible"
                                extralable="- Everyone can see this product"
                                onChange={(e)=>setFieldValue("preOrder",e)}/>

                              <Radio 
                                value={values.preOrder} 
                                label="Invisible"
                                extralable="- Nobody except you can see this product"
                                onChange={(e)=>setFieldValue("preOrder",e)}/>           

                            <Radio 
                                value={values.preOrder} 
                                label="Unlisted"
                                extralable="- Only people who know the direct link to this product
                                can see it. Won’t be listed alongside other product on your store."
                                onChange={(e)=>setFieldValue("preOrder",e)}/>

                          </div>
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