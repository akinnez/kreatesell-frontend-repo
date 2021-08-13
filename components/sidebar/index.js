import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from './Sidebar.module.scss'
import {Shop,Dashboard,Logout,Ticket,Product,Wallet,Setting,} from "../IconPack";
import ProPlanCard from './proPlanCard'
import Menu,{ MenuItem } from "./menu";


export const Sidebar = () => {
	return (
		<>
			<div className={style.sidebar}>
				<div className={style.logo_wrapper}>
					<Image src="/images/logo.png" width="140px" height="48px" />
				</div>
				<Menu>
						<MenuItem
							label="Dashboard"
							active
							Icon={Dashboard}
							target="/account/kreator/dashboard"
						/>
						<MenuItem 
							label="Store" 
							Icon={Shop} 
							target="/account/kreator/store" />
						<MenuItem 
							label="Products" 
							Icon={Product}  
							target="/account/kreator/products"/>
						
						<MenuItem
							label="Payouts"
							Icon={Wallet}
							target="/account/kreator/payouts"/>

						<MenuItem 
							label="Integrations" 
							Icon={Ticket} 
							target="/account/kreator/integrations"/>
						<MenuItem 
							label="Settings" 
							Icon={Setting}  
							target="/account/kreator/settings"/>
					
						<MenuItem
							iconStyle={{ backgroundColor: "#ffffff" }}
							style={{backgroundColor: "#0072EF",borderRadius: "8px",marginTop: "50px"}}
							labelStyle={{ color: "#ffffff" }}
							label="Logout"
							Icon={Logout}/>

							<ProPlanCard />
					
						</Menu>
			</div>
		
		</>
	);
};
