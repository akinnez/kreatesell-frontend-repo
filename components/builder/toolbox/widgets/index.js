import React from 'react'
import style from './Index.module.scss'
import MenuContainer from '../../sidebar/menu/Container'
import Text from './Text'
import {SingleColumnSection,TwoColumnSection,ThreeColumnSection,FourColumnSection} from './Section'
import Heading from './Heading'
import Divider from './Divider'
import Spacer from './Spacer'
import Button from './Button'
import Image from './Image'
import { Heading as HeadingWidget,Paragraph,Image as ImageWidget,Video,Spacer as SpacerWidget,Divider as DividerDragger,Countdown,Button as ButtonWidget } from '../draggables'

const Widget = ({open,onClose=()=>{},title})=>{

    return(
        <MenuContainer open={open} onClose={()=>onClose()} title={title}>
            <div className={style.wrapper}>
                <HeadingWidget />
                <Paragraph />
                <ImageWidget />
                <Video />
                <SpacerWidget />
                <DividerDragger />
                <Countdown />
                <ButtonWidget />
            </div>
        </MenuContainer>
    )
}

export default Widget


export{
    Text,
    Heading,
    SingleColumnSection,
    TwoColumnSection,
    ThreeColumnSection,
    FourColumnSection,
    Divider,
    Spacer,
    Button,
    Image
}