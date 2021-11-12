import { Button } from "antd";
import React from "react";
import { Undo,Redo,Save } from "../icons";
import style from './Index.module.scss'
import { useEditor } from '@craftjs/core'


const Index = ()=>{

    const { canUndo, canRedo, actions } = useEditor((state, query) => ({
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo()
      }));

    return(
        <div className={style.container}>
        <Button type="link" icon={
            <Undo style={{color:'red'}}/>} 
            className={style.undo} 
            onClick={() => actions.history.undo()}/>
        <Button type="link" icon={<Redo/>} className={style.redo}
        onClick={() => actions.history.redo()}/>
        <Button 
            type="link" 
            icon={<Save/>} 
            className={style.save}>Save</Button>
        </div>
    )
}

export default Index