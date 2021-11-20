import React,{useState} from 'react'
import styles from './Index.module.scss'
import Menu from './menu'
import Layout from '../toolbox/layers'
import Sections from '../toolbox/sections'
import Widget from '../toolbox/widgets'
import Settings from '../toolbox/settings'
import Checkout from '../toolbox/checkout'
import Style from '../toolbox/styles'
import { Layers as LayersIcon,Sections as SectionIcon, Widgets, Styles, Checkout as CheckoutIcon,Settings as SettingsIcon } from '../icons'
import { openTab } from '../../../redux/slices/pageSlices'
import {useSelector, useDispatch} from 'react-redux'

const Index = ()=>{

    const {prevTab, tab} = useSelector((state) => state.page)
    const dispatch = useDispatch()

    return(
    
        <aside className={styles.aside}>
            <div className={styles.menuContainer}>
                <Menu Icon={LayersIcon}
                    Container={Layout} 
                    title="Layers"
                    modalTitle="Page Layouts"
                    active={tab == 1} 
                    onClick={()=>dispatch(openTab(1))}
                    onClose={()=>dispatch(openTab(prevTab))}/>
                <Menu Icon={SectionIcon} 
                    title="Sections" key={2} 
                    active={tab == 2}
                    onClick={()=>dispatch(openTab(2))}
                    onClose={()=>dispatch(openTab(prevTab))}
                    Container={Sections}
                    modalTitle="Page Section"/>
                <Menu Icon={Widgets} 
                    title="Widgets" 
                    key={3} active={tab == 3} 
                    onClick={()=>dispatch(openTab(3))}
                    onClose={()=>dispatch(openTab(prevTab))}
                    Container={Widget}
                    modalTitle="Widgets"/>
                <Menu Icon={Styles} 
                    title="Styles" key={4} active={tab == 4} 
                    onClick={()=>dispatch(openTab(4))}
                    onClose={()=>dispatch(openTab(prevTab))}
                    modalTitle="Styles"
                    Container={Style}/>
                <Menu Icon={CheckoutIcon} 
                    title="Checkout" key={5} 
                    active={tab == 5} 
                    onClick={()=>dispatch(openTab(5))}
                    onClose={()=>dispatch(openTab(prevTab))}
                    Container={Checkout}/>
                <Menu Icon={SettingsIcon} 
                    title="Settings" key={6} 
                    active={tab == 6} 
                    onClick={()=>dispatch(openTab(6))}
                    onClose={()=>dispatch(openTab(prevTab))}
                    Container={Settings}/>
            </div>
        </aside>
       
 
    )
}

export default Index