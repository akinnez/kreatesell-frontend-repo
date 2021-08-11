import React from 'react'
import {PageDot, Cog, Bell} from '../IconPack'


const Topbar = ()=>{


    return(
        <>
        <nav>
          <div id="top-left"><PageDot /> <span>STORE</span></div>
          <ul className="right-nav-hor-menu">
              <li>
                  <Cog />
              </li>
              <li>
                  <div className="notification-wrapper">
                    <Bell />
                    <span id="notification-label">4</span>
                  </div>
                  
              </li>
          </ul>
        </nav>
        <style jsx>{`
            nav{
                height:90px;
                display:flex;
                justify-content:space-between;
                padding-right:20px;
                align-items:center;
                margin-bottom:20px;
            }

            #top-left{
                height:inherit;
                display:flex;
                align-items:center;
            }

            #top-left span{
                margin-left:15px;
                color: #0072EF;
                font-weight:700;
                font-size: 1.2rem;
            }

            .right-nav-hor-menu{
                list-style-type:none;
                padding:0;
                display:flex;
                gap:30px;
                height:inherit;
                align-items:center;
                justify-content:flex-end;
            }

            .notification-wrapper{
                position:relative;
            }

            #notification-label{
                position:absolute;
                top:-10px;
                right:-10px;
                width:20px;
                height:20px;
                background:red;
                border-radius:50%;
                display:flex;
                justify-content:center;
                align-items:center;
                font-size:12px;
                color:#ffffff;
            }

        
        `}</style>
        
        </>
    )
}

export default Topbar