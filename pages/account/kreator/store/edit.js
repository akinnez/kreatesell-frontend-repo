import React from 'react'
import {AuthLayout} from "../../../../components/authlayout"
import {Card} from '../../../../components/card'
import {TextInput,Button, TextArea, CustomSelect, FileInput, Uploader} from '../../../../components/inputPack'
import {Formik, Form} from 'formik'
import {Row,Column,Divider} from '../../../../components/grid'



const Index = ()=>{

    return(
        <>
        
        <AuthLayout>
            <Formik
            initialValues={{storeName:"", userName:"", phone:"", bio:"", profilePicture:"", country:"", facebook:"", instagram:"", linkedIn:"", twitter:""}}
            >{({values,setFieldValue, isSubmitting, errors})=>(
                <Form>
           <Card>
               <div id="spacer">
               <Row>
                   <Column m="12" s="12" align="center">
                        <h3>Welcome to Kreatesell</h3>
                        <p className="muted-text">Fill out the fields below to complete your profile</p>
                    </Column>
               </Row>
               <Row style={{paddingTop:"25px"}}>
                   <Column m="12" s="12">
                        <TextInput 
                            label="Name"
                            value={values.storeName}
                            onChange={(e)=>setFieldValue("storeName",e)}
                            labelExtra="Your user name or company name"
                            placeholder="Brand name, Business name or Full name"/>
                   </Column>
               </Row>
                <Row>
                    <Column m="12">
                    <p className="text-label">Username <span className="muted-text"> - choose the username of your store page</span></p>
                    <div className="highlight">
                    <h3 style={{fontWeight: 500, fontSize:"18px", color:"#595959"}}>Kreatesell.com/</h3>
                    <TextInput
                            value={values.userName}
                            onChange={(e)=>setFieldValue("userName",e)}
                            placeholder="olumidejohn"/>
                        </div>
                    </Column>
                </Row>
              
                <Row>
                    <Column m="12">
                        <TextArea
                            label="Bio"
                            value={values.bio}
                            onChange={(e)=>setFieldValue("bio",e)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column m="12">
                        <FileInput
                            label="Profile picture"
                            labelExtra="Your profile picture"
                            value={values.profilePicture}
                            onChange={(e)=>setFieldValue("profilePicture",e)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column m="12">
                        <Uploader 
                            label="Cover"
                            extralable="- add image on your cover page"/>
                    </Column>
                </Row>
                <Row>
                    <Column m="12">
                        <CustomSelect
                            list={[{label:"Nigeria", value:"Nigeria"}]}
                            label="Country"
                            value={values.country}
                            onChange={(e)=>setFieldValue("country",e)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column m="12">
                        <TextInput
                            type="tel"
                            label="Phone number (+234___)"
                            placeholder="+234"
                            value={values.phone}
                            onChange={(e)=>setFieldValue("phone",e)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column m="12">
                        <TextInput
                            label="Facebook"
                            labelExtra="link to your Facebook account"
                            placeholder="Salvo Agency Int’l"
                            value={values.facebook}
                            onChange={(e)=>setFieldValue("facebook",e)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column m="12">
                        <TextInput
                            label="Instagram"
                            labelExtra="link to your Instagram account"
                            placeholder="Salvo Agency Int’l"
                            value={values.instagram}
                            onChange={(e)=>setFieldValue("instagram", e)}
                        />
                    </Column>
                </Row>

                <Row>
                    <Column m="12">
                        <TextInput
                            label="LinkedIn"
                            labelExtra="link to your LinkedIn account"
                            placeholder="Salvo Agency Int’l"
                            value={values.linkedIn}
                            onChange={(e)=>setFieldValue("linkedIn", e)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column m="12">
                        <TextInput
                            label="Twitter"
                            labelExtra="link to your Twitter account"
                            placeholder="Salvo Agency Int’l"
                            value={values.twitter}
                            onChange={(e)=>setFieldValue("twitter", e)}
                        />
                    </Column>
                </Row>
                </div>
                <Divider />
                <Row>
                    <Column m="12" align="center" style={{padding:"30px 0"}}>
                        <p className="muted-text">Finished adding your settings change and proceed to add first products?</p>
                        <div className="btn-wrapper">
                        <Button style={{backgroundColor:"transparent", border:"1px solid #0072EF", color:"#0072EF"}} label="Save and View Store"/>
                        <Button label="Add Product"/>
                        </div>
                    </Column>
                </Row>
               
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