import React from 'react'
import { useNode } from '@craftjs/core'
import styles from './Index.module.scss'



const Button = ({text = "Button",fontSize,color,fontFamily,fontWeight})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
           <button className={styles.button}><span>{text}</span></button>          
        </div>
        
        </>
    )
}

export default Button