import React from 'react'

import styles from "./Tab.module.scss";



export const TabItem = ({children})=>{

    return children
}


const Index = ({children, active=0, titles=[], onSelect=()=>{}})=>{

    return(
        <>
        <ul className={`tab-wrapper ${styles.tabWrapper}`}>
            {
                titles?.map((item,i)=>(
                    <li key={i} 
                   onClick={()=>onSelect(i)}
                    className={`${active == i ? `active ${styles.activeContainer}`: active > i ? `completed ${styles.Completed}`:`completed ${styles.Completed}`}`}><span className={styles.active}>{item}</span></li>
                ))
            }
          
        </ul>
        {
            React.Children.map(children,(child,i)=>{
                if(child.type.name == "TabItem" && active == i){
                    return child
                }
            })
        }

        <style jsx>{`
            .tab-wrapper{
                list-style-type:none;
                display:flex;
                gap:10px;
                padding:0;
                justify-content:center;
            }

            .tab-wrapper li{
                border-bottom:2px solid transparent;
                padding:10px;
                font-size:18px;
                cursor:pointer;
                font-weight: 600
                color: #8c8c8c;
            }

            .tab-wrapper li.active{
                font-weight:700;
                color:#0072EF;
                border-bottom-color:#0072EF;
                transition:all 4ms ease-in-out;
            }

            .tab-wrapper li.completed{
                color:#8c8c8c;
            }

        
        `}</style>
        </>
    )
}

export default Index