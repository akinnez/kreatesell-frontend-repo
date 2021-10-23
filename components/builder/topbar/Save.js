import { Button } from "antd";
import React from "react";
import { Undo,Redo,Save } from "../icons";
import style from './Index.module.scss'



const Index = ()=>{


    return(
        <div className={style.container}>
        <Button type="link" icon={<Undo/>} className={style.undo}/>
        <Button type="link" icon={<Redo/>} className={style.redo}/>
        <Button type="link" icon={<Save/>} className={style.save}>Save</Button>
        
        </div>
    )
}

export default Index