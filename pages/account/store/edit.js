import React from 'react'
import {AuthLayout} from "../../../components/authlayout"
import Topbar from '../../../components/topbar'
import {Card} from '../../../components/card'
import {TextInput,Button, TextArea, CustomSelect} from '../../../components/inputPack'

const Index = ()=>{

    return(
        <>
        
        <AuthLayout>
           <Card style={{padding:"0 200px"}}>
               <div style={{padding:"40px 40px 0 40px"}}>
               <div className="row">
                   <div className="col-12" style={{textAlign: 'center'}}>
                        <h3>Welcome to Kreatesell</h3>
                        <p className="muted-text">Fill out the fields below to complete your profile</p>
                    </div>
               </div>
               <div className="row">
                   <div className="col-12">
                        <TextInput 
                            label="Name"
                            labelExtra="Your store name or company name"
                            placeholder="Salvo Agency Int'l"/>
                   </div>
               </div>

               <p className="text-label">Username <span className="muted-text"> - choose the username of your store page</span></p>
                <div className="highlight">
                <div className="row">
                   <div className="col-2">
                       <h3>Kreatesell.com/</h3>
                       </div>
                       <div className="col-10">
                        <TextInput 
                            placeholder="salvoagencyint"/>
                   </div>
               </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextArea
                            label="Bio"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <CustomSelect
                            list={[{label:"Nigeria", value:"Nigeria"}]}
                            label="Country"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextInput
                            label="Facebook"
                            labelExtra="link to your Facebook account"
                            placeholder="Salvo Agency Int’l"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextInput
                            label="Instagram"
                            labelExtra="link to your Instagram account"
                            placeholder="Salvo Agency Int’l"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <TextInput
                            label="LinkedIn"
                            labelExtra="link to your LinkedIn account"
                            placeholder="Salvo Agency Int’l"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextInput
                            label="Twitter"
                            labelExtra="link to your Twitter account"
                            placeholder="Salvo Agency Int’l"
                        />
                    </div>
                </div>
                </div>
                <div className="divider"/>
                <div className="row">
                    <div className="col-12 center" style={{padding:"30px 0"}}>
                        <p className="muted-text">Finished adding your settings change and proceed to add first products?</p>
                        <Button label="Save Settings"/>
                    </div>
                </div>
               
           </Card>
        </AuthLayout>
        
        
        </>
    )
}

export default Index