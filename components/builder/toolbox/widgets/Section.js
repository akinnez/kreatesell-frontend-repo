import React from "react";
import style from './Index.module.scss'
import { useNode,Element } from '@craftjs/core'

const Section = ({children})=>{
    const {connectors:{connect,drag}} = useNode()

    return(
        <div ref={ref=>connect(drag(ref))}>
        <Element is="div" id="row"
            className={style.row}>
           {children}
        </Element>
        </div>
    )
}

export default Section


export const Column = ({children})=>{

    return(
        <Element is="div" id="col" canvas className={style.col}>
            {children}
        </Element>
    )
}


export const SectionSetting = ()=>{

    return(
        <></>
    )
}