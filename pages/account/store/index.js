import React from 'react'
import styles from '../../../public/css/Store.module.scss'
import {AuthLayout} from "../../../components/authlayout"
import Topbar from '../../../components/topbar'
import {Button} from '../../../components/inputPack'
import {Card} from '../../../components/card'
import Image from 'next/image'
import { EditIcon, ShareIcon,ViewAs } from '../../../components/IconPack'
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import List from '../../../components/list'
import Router from 'next/router'
import Dropdown from '../../../components/dropdown'
import StoreHeader from '../../../components/storeHeader'




const cardStyles = {
    borderRadius:"8px",
    padding:"10px 30px"
}

const progressbarStyles = buildStyles({
    rotation: 0.30,
   strokeLinecap: 'round',
   textSize: '24px',
   fontWeight:600,
   pathTransitionDuration: 0.5,
   pathColor: '#0072EF',
   textColor: '#595959',
   trailColor: '#E6F7FF'
 })



const Index = ()=>{

    return(
        <>
        
        <AuthLayout>
          <StoreHeader />
            <div className="row" style={{marginTop:"100px"}}>
                <div className="col-7">
                    <Card style={cardStyles}>
                        <div className={styles.bio_info}>
                        <h5>Bio</h5>
                        <p>I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills</p>
                        <p>I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills</p>
                        </div>
                    </Card>
                </div>
                <div className="col-5">
                <Card  style={{...cardStyles}}>
                <div className={styles.progress_wrapper}>
                    <div className={styles.progress}>
                        <CircularProgressbar 
                        text="40%"
                        value={40}
                        strokeWidth={15}
                        styles={progressbarStyles} />
                    </div>
                    <div id={styles.progress_text}>
                        <p>You've completed <strong>40%</strong> of your store setup</p>
                    </div>
                </div>
                <div className="divider"/>

                <List step={1} 
                    list={[
                    "Complete your store profile details",
                    "Add your bank account details to receive your payments",
                    "Add your first product to increase your store completion"]}/>
                </Card>
                </div>
            </div>

            <div className="row">
                <div className="col-12 center">
                    <p>Almost there, now click the button to add your product</p>
                        <Button label="+ Add Product" onClick={()=>Router.push("/account/product")}/>
                </div>
            </div>
        
        </AuthLayout>
       
        
        </>
    )
}

export default Index