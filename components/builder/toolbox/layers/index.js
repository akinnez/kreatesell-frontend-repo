import React from 'react'
import Container from '../../sidebar/menu/Container'
import {AddSection} from '../../icons'
import { ActionMethodsWithConfig, useEditor } from '@craftjs/core'
import SectionLayerItem from './items'
import {useDispatch} from 'react-redux'
import {openTab} from '../../../../redux/slices/pageSlices'




const Layout = ({open,onClose=()=>{},title})=>{

    const dispatch = useDispatch()

    return(
        <Container open={open} onClose={()=>onClose()} title={title}>
           
            <SectionLayerItem />
            <AddSection onClick={()=>dispatch(openTab(2))} style={{marginTop:10}}/>
        </Container>
    )
}

export default Layout