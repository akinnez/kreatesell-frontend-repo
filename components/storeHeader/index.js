import React from 'react'
import styles from './Index.module.scss'
import { EditIcon,ShareIcon,ViewAs } from '../IconPack'
import Dropdown from '../dropdown'
import Router from 'next/router'


const CtaButton = ({Icon=()=><></>, label, active})=>{

    return(
        <>
            <div className={`cta ${active ? "active":''}`}>
                <Icon /> {label}
            </div>
          <style jsx>{`
            .cta{
                font-size:14px;
                display:flex;
                align-items:center;
                gap:5px;
                padding:2px 10px;
                border-radius:8px;
                cursor:pointer;
            }

            .cta.active{
                box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.07);
            }
          
          `}</style>  
        </>
    )
 }

export const ProtectedStoreHeader = ()=>{

    return(
        <>
             <div className={styles.bg_wrapper} style={{backgroundImage: `url(/images/placeholder-1.jpg)`}}>
               <div className={styles.inner}>
               <div className={styles.inner_item_profile}>
                   <div className={styles.profile_wrapper}>
                   <div className={styles.image_intro_text} style={{backgroundImage:`url(/images/placeholder-2.jpg)`}}/>
                   <div className={styles.txt_wrapper}>
                   <h3>Olumide John</h3>
                   <p>https://kreatesell.com/olumidejohn</p>
                   </div>
                   </div>
                    <div className={styles.cta_link_wrapper}>
                        <ul>
                            <li onClick={()=>Router.push("/account/kreator/store/edit")}>
                            <CtaButton Icon={EditIcon} label="Edit Profile" active/></li>
                            <li><Dropdown Button={<CtaButton Icon={ShareIcon} label="Share Link"/>}/></li>
                            <li><CtaButton Icon={ViewAs} label="View As"/></li>
                        </ul>
                    </div>
                </div>
               </div>
                
           </div>

        
        </>
    )
}


export const StoreHeader = ()=>{

    return(
        <>
             <div className={styles.bg_wrapper} style={{backgroundImage: `url(/images/placeholder-1.jpg)`}}>
               <div className={styles.inner}>
               <div className={styles.inner_item_profile}>
                   <div className={styles.profile_wrapper}>
                   <div className={styles.image_intro_text} style={{backgroundImage:`url(/images/placeholder-2.jpg)`}}/>
                   <div className={styles.txt_wrapper}>
                   <h3>Olumide John</h3>
                   <p>https://kreatesell.com/olumidejohn</p>
                   </div>
                   </div>
                    <div className={styles.cta_link_wrapper}>
                        <ul>
                            <li onClick={()=>Router.push("/account/store/edit")}>
                            <CtaButton Icon={EditIcon} label="Edit Profile" active/></li>
                            <li><Dropdown Button={<CtaButton Icon={ShareIcon} label="Share Link"/>}/></li>
                            <li><CtaButton Icon={ViewAs} label="View As"/></li>
                        </ul>
                    </div>
                </div>
               </div>
                
           </div>

        
        </>
    )
}