import React from 'react'
import Topbar from './topbar'
import Sidebar from './sidebar'
import styles from './Index.module.scss'
import {Element, Editor, Frame} from "@craftjs/core"
import { Text,Column,Heading,Divider,Spacer,Button,Image } from './toolbox/widgets'
import ViewPort from './editor/viewport'
import Page from './editor/container/PageContainer'
import Container from './editor/container'



const Index = ()=>{

    return(
     
        <Editor indicator="success"
             resolver={{Text,Heading,Column,Container,Page,Divider,Spacer,Button,Image}}>
             <Topbar />
             
                <div className={styles.craftjs_renderer}>
                    <ViewPort>
                    <Frame>
                        <Element
                            width="100%"
                            custom={{displayName:"Page"}}
                             is={Page}
                             fillSpace="yes"
                             flexDirection="column"
                             canvas
                             >
                             
                        </Element>
                    </Frame>
                    </ViewPort>
                </div>
            <Sidebar />
            </Editor>
          
    )
}

export default Index