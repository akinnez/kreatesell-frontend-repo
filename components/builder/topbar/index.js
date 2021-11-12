import { Button } from 'antd'
import React from 'react'
import styles from './Index.module.scss'
import {ChevronLeft} from '../icons'
import Save from './Save'
import Router from 'next/router'


const Index = ()=>{

   
    return(
        <nav className={styles.nav}>
          <div className={styles.left}>
              <img src="/img/logo.png" id="logo"/>
              <Button className={styles.btn} 
              icon={<ChevronLeft />} type="link" onClick={()=>Router.back()}>Back</Button>
              <Save />
          </div>
          <div className={styles.right}>
              <Button type="link" className={styles.cancel} onClick={()=>window.location.reload()}>Cancel and Exit</Button>
              <Button type="link" className={styles.save}>Save and Exit</Button>
              <Button type="ghost"  className={styles.preview}>Preview</Button>
              <Button type="primary"  className={styles.publish}>Publish</Button>
          </div>

        </nav>
    )
}

export default Index