import React,{useState} from 'react'
import styles from './Index.module.scss'
import Menu from './menu'
import Layout from '../toolbox/layers'
import Section from '../toolbox/Sections'
import Widget from '../toolbox/Widgets'
import Settings from '../toolbox/Settings'
import Checkout from '../toolbox/Checkout'
import Style from '../toolbox/styles'
import { Layers as LayersIcon,Sections, Widgets, Styles, Checkout as CheckoutIcon,Settings as SettingsIcon } from '../icons'


const Index = ()=>{

    const [open, setOpen] = useState(0)

    return(
    
        <aside className={styles.aside}>
            <div className={styles.menuContainer}>
                <Menu Icon={LayersIcon}
                    Container={Layout} 
                    title="Layers"
                    modalTitle="Page Layouts"
                    active={open == 1} 
                    onClick={()=>setOpen(1)}
                    onClose={()=>setOpen(0)}/>
                <Menu Icon={Sections} 
                    title="Sections" key={2} 
                    active={open == 2}
                    onClick={()=>setOpen(2)}
                    onClose={()=>setOpen(0)}
                    Container={Section}
                    modalTitle="Page Section"/>
                <Menu Icon={Widgets} 
                    title="Widgets" 
                    key={3} active={open == 3} 
                    onClick={()=>setOpen(3)}
                    onClose={()=>setOpen(0)}
                    Container={Widget}
                    modalTitle="Widgets"/>
                <Menu Icon={Styles} 
                    title="Styles" key={4} active={open == 4} 
                    onClick={()=>setOpen(4)}
                    onClose={()=>setOpen(0)}
                    modalTitle="Styles"
                    Container={Style}/>
                <Menu Icon={CheckoutIcon} 
                    title="Checkout" key={5} 
                    active={open == 5} 
                    onClick={()=>setOpen(5)}
                    onClose={()=>setOpen(0)}
                    Container={Checkout}/>
                <Menu Icon={SettingsIcon} 
                    title="Settings" key={6} 
                    active={open == 6} 
                    onClick={()=>setOpen(6)}
                    onClose={()=>setOpen(0)}
                    Container={Settings}/>
            </div>
        </aside>
       
 
    )
}

export default Index