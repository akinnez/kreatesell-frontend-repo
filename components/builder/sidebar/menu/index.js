import React,{useState} from "react";
import styles from './Index.module.scss'

const Index = ({Icon=()=><></>,title,Container=()=><></>, modalTitle, active, onClose=()=>{},onClick=()=>{},...rest})=>{
   
    const activeStyle = {
        backgroundColor:"#ffffff"
    }

    return(
        <div>
            <div className={styles.menu} onClick={()=>onClick()} style={active ? activeStyle:null}>
            <Icon />
            <p>{title}</p>
            </div>
            <Container open={active} onClose={()=>onClose()} title={modalTitle}/>
        </div>
       
    )
}

export default  Index