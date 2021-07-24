import React from 'react'
import {AuthLayout} from "../../../components/authlayout"
import Topbar from '../../../components/topbar'
import {Button} from '../../../components/button/Button'
import {Card} from '../../../components/card'
import Image from 'next/image'
import { EditIcon, ShareIcon, Progress } from '../../../components/IconPack'
import Router from 'next/router'



const cardStyles = {
    borderRadius:"8px",
    padding:"10px 30px"
}

const Index = ()=>{

    return(
        <>
        
        <AuthLayout>
           <div className="bg-wrapper" style={{backgroundImage: `url(/images/placeholder-1.jpg)`}}>
               <div className="inner">
               <div className="inner-item-profile">
                   <div className="profile-wrapper">
                   <div className="image-intro-text" style={{backgroundImage:`url(/images/placeholder-2.jpg)`}}/>
                   <div className="txt-wrapper">
                   <h3>Olumide John</h3>
                   <p>https://kreatesell.com/olumidejohn</p>
                   </div>
                   </div>
                    <div className="cta-link-wrapper">
                        <ul>
                            <li onClick={()=>Router.push("/account/store/edit")}><EditIcon /> Edit Profile</li>
                            <li><ShareIcon /> Share Link</li>
                           
                           
                        </ul>
                    </div>
                </div>
               </div>
                
           </div>
            <div className="row" style={{marginTop:"100px"}}>
                <div className="col-8">
                    <Card style={cardStyles}>
                        <h5>Bio</h5>
                        <p className="bio-text">I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills I will help you evolve your writting skills</p>
                    </Card>
                </div>
                <div className="col-4">
                <Card  style={cardStyles}>
                   <Progress />
                </Card>
                </div>
            </div>
        </AuthLayout>
        <style jsx>{`
            .bg-wrapper{
                height:300px;
                background-position:center;
                background-size:cover;
                border-radius:12px;
                position:relative;
            }

            .inner{
                display:flex;
                justify-content:center;
            }

            .inner-item-profile{
                background: rgba(255, 255, 255, 0.80059);
                box-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
                height:104px;
                position:absolute;
                bottom:-50px;
                width:70%;
                margin:0 auto;
                backdrop-filter: blur(27.1828px);
                padding: 12px 10px 12px 16px;
                border-radius:12px;
                display:flex;
                justify-content:space-between;
                
            }

            .image-intro-text{
               height:80px;
               width:80px;
               border-radius:12px;
               background-size:cover;
               background-position:center;
            }

            .profile-wrapper{
                display:flex;
                gap:10px;
            }

            .txt-wrapper{
                display:flex;
                flex-direction:column;
                justify-content:center;
            }
            .txt-wrapper h3, .txt-wrapper p{
                margin:0;
            }
            .txt-wrapper p{
                color:#262626;
                font-size:15px;
                font-style: italic;
            }

            .cta-link-wrapper ul{
                list-style-type:none;
                padding:0 10px;
                display:flex;
                gap:10px;
            }

            .cta-link-wrapper ul li{
                font-size:14px;
                display:flex;
                align-items:center;
                gap:5px;
                box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.07);
                padding:2px 10px;
                border-radius:8px;
                cursor:pointer;
            }
        
                .bio-text{
                    color:#8c8c8c;
                    font-size:14px;
                    line-height: 24px;
                }
        `}</style>
        
        </>
    )
}

export default Index