import React,{useState} from 'react';
import Image from 'next/image'
import {KreateSellBrand} from '../../utils/assets'
import Link from 'next/link'
import {Dash, Shop, Dashboard,Logout,Card,Dollar,Ticket, Product, Chart, Wallet, AddUser,Setting, CreditCard, Diamond} from '../IconPack'
import {useRouter} from 'next/router'


const MenuItem = ({active, Icon = Category, target="#",label,isDropDown, submenu =[], style,labelStyle,iconStyle})=>{

    const [open, setOpen] = useState(false)
    const [hover, setHover] = useState(false)
    

    return(
        <>

            <li style={style} onClick={isDropDown ? () =>setOpen(!open):null} 
                onMouseOver={() =>setHover(true)} 
                onMouseLeave={()=>setHover(false)}>
                    <Link href={isDropDown ? "#": target}><a>
                <div className={`nav-menu-icon-wrapper ${active ? 'active':null}`}>
                    <div className={`menu-icon ${active ? 'opaque':null}`} style={iconStyle}>
                        <Icon set="bulk" primaryColor={hover || active ? "white":null}/>
                    </div>
                    <span style={labelStyle}>{label}</span>
                   {
                       isDropDown ?  <div className="menu-drop-minus">
                       <Dash/>
                       </div>:null
                   }
                 
                </div>
                </a></Link>
                
            </li>
            {
                open ? 
                <ul className="sub-menu">
                    {
                        submenu?.map(({url,label},i)=>(
                            <li key={i}><Link href={url}><a>{label}</a></Link></li>
                        ))
                    }
                </ul>:null
            }
            
        
        <style jsx>{`

        
        li:not(:first-child){
            margin-top:20px;
        }

        li a {
            text-decoration: none;
            display:block;
        }
         li a .nav-menu-icon-wrapper{
            display:flex;
            align-items:center;
            height:58px;
            border-radius: 8px;
            padding-left:20px;
          }

          li a .nav-menu-icon-wrapper:hover, .active{
            box-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
            transition: all 400ms ease-in
          }


          li a .nav-menu-icon-wrapper span{
              margin-left:12px;
              color: #67748E;
              font-size:1rem;

          }

          li a .nav-menu-icon-wrapper .menu-icon{
            box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.07);
            border-radius: 8px;
            width:42px;
            height:42px;
            display:flex;
            justify-content:center;
            align-items:center;
          }

          li:hover  .menu-icon, .opaque{
              background:#0072EF;
              transition: 400ms ease-in
          }

        .sub-menu{
            list-style-type:none;
            padding-left:75px;
            margin-top:20px
        }


        .sub-menu li a{
            color:#67748E;
            padding:12px 0 12px 6px ;
            
        }

        .sub-menu li:hover{
            background: #E6F7FF;
            transition: 400ms ease-in;

        }

        .menu-drop-minus{
            flex:1;
            display:flex;
            justify-content:flex-end;
            padding-right:5px;
        }
        
        `}</style>
        </>
    )
}


export const Sidebar = ()=>{


    return(
        <>
            <div className="sidebar">
                <div className="logo-wrapper">
                    <Image src="/images/logo.png" width="140px" height="48px"/>
                </div>
                <div className="side-menu-wrapper">
                   <ul id="side-menu">
                      <MenuItem label="Dashboard" active Icon={Dashboard}/>
                      <MenuItem label="Store" Icon={Shop} target="/account/store"/>
                      <MenuItem label="Products" Icon={Product} target="/account/product"/>
                      <MenuItem isDropDown 
                        submenu={[{label:"Sales",url:"#"},{label:"Purchases", url:"#"},
                        {label:"Transactions", url:"#"},{label:"Customers", url:"#"}
                        ]} 
                        label="Activities" Icon={Chart}/>
                      <MenuItem isDropDown
                        submenu={[{label:"Wallet", url:"#"},{label:"Payout", url:"#"}]}
                        label="Wallet &amp; Payout" Icon={Wallet}/>

                      <MenuItem label="Affiliates" Icon={AddUser}/>
                      <MenuItem label="Coupons" Icon={AddUser}/>
                      <MenuItem label="Refer &amp; Earn" Icon={Dollar}/>
                      <MenuItem label="Integrations" Icon={Ticket}/>
                      <MenuItem label="Settings" Icon={Setting}/>
                      <MenuItem label="Billing" Icon={Card}/>


                      <MenuItem 
                        iconStyle={{backgroundColor:"#ffffff"}} 
                        style={{backgroundColor:"#0072EF", borderRadius:"8px", marginTop:"50px"}} 
                        labelStyle={{color:"#ffffff"}} label="Logout" Icon={Logout}/>

                        <li style={{marginTop:"50px"}}>
                            <div className="card-bg">
                                <div className="overlay">
                                    <Diamond />
                                    <p>Update to<br /> Premium Plan</p>
                                    <Link href="#"><a className="btn-link">GO PRO PLAN</a></Link>
                                </div>
                            </div>
                        </li>
                   </ul>
                </div>

            </div>
        <style jsx>{`
            .sidebar{
                height:100vh;
                position:fixed;
                left:0;
                width:300px;
                background-color:#fff;
                display:flex;
                flex-direction:column;
            }

            .logo-wrapper{
                height:70px;
                padding:15px 29px 15px 48px; 
                position:relative;
            }

          

            .side-menu-wrapper{
                flex:1;
                overflow-y:auto;
                overflow-x:hidden;
                padding:33px 10px 15px 28px;
                border-top:1px solid #F5F5F5;
            }

            .side-menu-wrapper::-webkit-scrollbar {
                width: 5px;
              }
              
           
              .side-menu-wrapper::-webkit-scrollbar-track {
                background: #f1f1f1;
              }
              
            
              .side-menu-wrapper::-webkit-scrollbar-thumb {
                background: #C4C4C4;
              }
              
             
              .side-menu-wrapper::-webkit-scrollbar-thumb:hover {
                background: #555;
              }

              #side-menu{
                  list-style-type:none;
                  padding:0;
              }

              .card-bg{
                  height:190px;
                  border-radius: 16px;
                 
                  background-image: url('/images/card-bg.png');
                  position:relative;
              }

              .card-bg .overlay{
                background: linear-gradient(163.16deg, rgba(0,102,255,.5) 10.04%, rgba(0,147,53,.5) 101.52%);
                position:absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                mix-blend-mode: normal;
                border-radius: 16px;
                padding: 20px;
              }

              .card-bg .overlay p{
                  margin:0;
                  color:#ffffff;
                  font-weight:500;
                  font-size: 1rem;
                  line-height: 26px;
              }

              .btn-link{
                background: #FFFFFF;
                box-shadow: 0px 4px 7px -1px rgba(0, 0, 0, 0.11), 0px 2px 4px -1px rgba(0, 0, 0, 0.07);
                border-radius: 8px;
                padding:8px 0;
                display:block;
                text-align:center;
                text-decoration:none;
                margin-top:20px;
              }
             
              main{
                  height:100vh;
                  background:red;
              }
        
        `}</style>
        </>
    )
}