import React from 'react'
import Topbar from './topbar'
import Sidebar from './sidebar'
import styles from './Index.module.scss'
import {Element, Editor, Frame} from "@craftjs/core"
import { Text,Column,Heading,SingleColumnSection,TwoColumnSection,ThreeColumnSection,FourColumnSection,Divider,Spacer,Button,Image } from './toolbox/widgets'


const Index = ({children})=>{

    return(
        <Editor resolver={{Text,Heading,Column,SingleColumnSection,TwoColumnSection,ThreeColumnSection,FourColumnSection,Divider,Spacer,Button,Image}}>
             <Topbar />
            <main className={styles.main}>
                <Frame>
                    <Element id="drop" is="div" canvas style={{height:"100%",width:"100%",overflow:"auto"}}>
                        {children}
                    </Element>
                </Frame>
            </main>
            <Sidebar />
            </Editor>
    )
}

export default Index