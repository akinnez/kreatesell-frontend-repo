import React from "react";
import styles from './Index.module.scss'
import { Close } from "../../icons";

const Index = ({title="Title",open,onClose=()=>{}, children,...rest})=>{

    return(
        <div {...rest} className={styles.container} style={{display:open ? 'block':'none'}}>
            <div className={styles.header}>
                <h3>{title}</h3>
                <Close onClick={()=>onClose()}/>
            </div>
            {children}
        </div>
    )
}

export default  Index