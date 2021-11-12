import React from 'react'
import { useNode } from '@craftjs/core'
import styles from './Index.module.scss'



const Button = ({text = "Button",fontSize,color,fontFamily,fontWeight})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
           <button ref={ref=>connect(drag(ref))}
            className={styles.button}><span>{text}</span></button>          
    )
}

export default Button