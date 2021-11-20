import React from 'react'
import Topbar from './topbar'
import Sidebar from './sidebar'
import styles from './Index.module.scss'
import {Element, Editor, Frame} from "@craftjs/core"
import { Text,Heading,Divider,Spacer,Button,Image,CountdownTimer } from './toolbox/widgets'
import ViewPort from './editor/viewport'
import Page from './editor/container/PageContainer'
import {Section,Row,Column} from './layout'



const Index = ()=>{

    return(
     
        <Editor indicator={{
            'success': '#2d9d78', // green
            'error': '#e34850' // red
          }}
             resolver={{Text,Heading,Page,Section,Row,Column,Divider,Spacer,Button,Image,CountdownTimer}}>
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
                                canvas>
                                   <Section /> 
                            </Element>
                        </Frame>
                    </ViewPort>
                </div>
            <Sidebar />
            </Editor>
          
    )
}

export default Index