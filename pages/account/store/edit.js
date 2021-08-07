import React from 'react'
import {AuthLayout} from "../../../components/authlayout"
import Topbar from '../../../components/topbar'
import {Card} from '../../../components/card'
import {TextInput,Button, TextArea, CustomSelect, FileInput, Uploader} from '../../../components/inputPack'
import {Formik, Form} from 'formik'



const Index = ()=>{

    return(
        <>
        
        <AuthLayout>
            <Formik
            initialValues={{storeName:"", userName:"", phone:"", bio:"", profilePicture:"", country:"", facebook:"", instagram:"", linkedIn:"", twitter:""}}
            >{({values,setFieldValue, isSubmitting, errors})=>(
                <Form>
           <Card style={{padding:"0 150px"}}>
               <div style={{padding:"40px 40px 0 40px"}}>
               <div className="row">
                   <div className="col-12" style={{textAlign: 'center'}}>
                        <h3>Welcome to Kreatesell</h3>
                        <p className="muted-text">Fill out the fields below to complete your profile</p>
                    </div>
               </div>
               <div className="row" style={{paddingTop:"25px"}}>
                   <div className="col-12">
                        <TextInput 
                            label="Name"
                            value={values.storeName}
                            onChange={(e)=>setFieldValue("storeName",e)}
                            labelExtra="Your user name or company name"
                            placeholder="Brand name, Business name or Full name"/>
                   </div>
               </div>
                <div className="row">
                    <div className="col-12">
                    <p className="text-label">Username <span className="muted-text"> - choose the username of your store page</span></p>
                    <div className="highlight">
                    <h3 style={{fontWeight: 500, fontSize:"18px", color:"#595959"}}>Kreatesell.com/</h3>
                    <TextInput
                            value={values.userName}
                            onChange={(e)=>setFieldValue("userName",e)}
                            placeholder="olumidejohn"/>
                        </div>
                    </div>
                </div>
              
                <div className="row">
                    <div className="col-12">
                        <TextArea
                            label="Bio"
                            value={values.bio}
                            onChange={(e)=>setFieldValue("bio",e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <FileInput
                            label="Profile picture"
                            labelExtra="Your profile picture"
                            value={values.profilePicture}
                            onChange={(e)=>setFieldValue("profilePicture",e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Uploader 
                            label="Cover"
                            extralable="- add image on your cover page"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <CustomSelect
                            list={[{label:"Nigeria", value:"Nigeria"}]}
                            label="Country"
                            value={values.country}
                            onChange={(e)=>setFieldValue("country",e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextInput
                            type="tel"
                            label="Phone number (+234___)"
                            placeholder="+234"
                            value={values.phone}
                            onChange={(e)=>setFieldValue("phone",e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextInput
                            label="Facebook"
                            labelExtra="link to your Facebook account"
                            placeholder="Salvo Agency Int’l"
                            value={values.facebook}
                            onChange={(e)=>setFieldValue("facebook",e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextInput
                            label="Instagram"
                            labelExtra="link to your Instagram account"
                            placeholder="Salvo Agency Int’l"
                            value={values.instagram}
                            onChange={(e)=>setFieldValue("instagram", e)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <TextInput
                            label="LinkedIn"
                            labelExtra="link to your LinkedIn account"
                            placeholder="Salvo Agency Int’l"
                            value={values.linkedIn}
                            onChange={(e)=>setFieldValue("linkedIn", e)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextInput
                            label="Twitter"
                            labelExtra="link to your Twitter account"
                            placeholder="Salvo Agency Int’l"
                            value={values.twitter}
                            onChange={(e)=>setFieldValue("twitter", e)}
                        />
                    </div>
                </div>
                </div>
                <div className="divider"/>
                <div className="row">
                    <div className="col-12 center" style={{padding:"30px 0"}}>
                        <p className="muted-text">Finished adding your settings change and proceed to add first products?</p>
                        <div className="btn-wrapper">
                        <Button style={{backgroundColor:"transparent", border:"1px solid #0072EF", color:"#0072EF"}} label="Save and View Store"/>
                        <Button label="Add Product"/>
                        </div>
                    </div>
                </div>
               
           </Card>
           </Form>
            )}</Formik>
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
        `}</style>
        </>
    )
}

export default Index