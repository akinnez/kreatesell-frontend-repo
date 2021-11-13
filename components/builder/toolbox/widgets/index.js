import React from 'react'
import style from './Index.module.scss'
import MenuContainer from '../../sidebar/menu/Container'
import Text from './Text'
import Heading from './Heading'
import Divider from './Divider'
import Spacer from './Spacer'
import Button from './Button'
import Image from './Image'
import Video from './Video'
import CountdownTimer from './Countdown'
import { Heading as HeadingWidget,Paragraph,Image as ImageWidget,Video as VideoWidget,Spacer as SpacerWidget,Divider as DividerDragger,Countdown,Button as ButtonWidget } from '../draggables'

const Widget = ({open,onClose=()=>{},title})=>{

    return(
        <MenuContainer open={open} onClose={()=>onClose()} title={title}>
            <div className={style.wrapper}>
                <HeadingWidget />
                <Paragraph />
                <ImageWidget />
                <VideoWidget />
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
    Divider,
    Spacer,
    Button,
    Image,
    Video,
    CountdownTimer
}