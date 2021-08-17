import React from 'react'
import {Copy,Facebook,Twitter,Instagram,LinkedIn} from '../../IconPack'
import { Divider } from '../../grid'

const Social = ()=>{


    return(
        <>
            <div className="social-wrapper">
                <p>Share store link on</p>
                <div className="social-icon-wrapper">
                    <Facebook /> <Instagram /> <LinkedIn /> <Twitter />
                </div>
                <Divider />
                <div className="copy-wrapper">
                    <Copy /> <span>Copy link</span>
                </div>
               
            </div>
        <style jsx>{`
            .social-wrapper{
                padding:20px;
                min-width:200px;
                text-align:center;
            }

            .social-wrapper p{
                font-size: 14px;
                line-height: 24px;
                color: #595959;
                margin-bottom:20px;
            }

            .social-icon-wrapper{
                display:flex;
                justify-content:space-between;
                gap:10px;
            }

            .copy-wrapper{
                display:flex;
                align-items:center;
                gap:10px;
                justify-content:center;
                font-size: 14px;
                line-height: 24px;
                color: #595959;
                cursor:pointer;
            }
        
        `}</style>
        </>
    )
}

export default Social