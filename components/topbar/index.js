import React from 'react'
import {PageDot, Cog, Bell} from '../IconPack'
import style from "./TopBar.module.scss"


const Topbar = ()=>{
    return(
        <>
        <nav className={style.nav}>
          <div className={style.top_left}><PageDot /> <span>STORE</span></div>
          <ul className={style.right_nav_hor_menu}>
              <li>
                  <Cog />
              </li>
              <li>
                  <div className={style.notification_wrapper}>
                    <Bell />
                    <span className={style.notification_label}>4</span>
                  </div>
                  
              </li>
          </ul>
        </nav>
        </>
    )
}

export default Topbar