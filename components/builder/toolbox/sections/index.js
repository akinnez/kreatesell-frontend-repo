import React from 'react'
import Container from '../../sidebar/menu/Container'
import {Select} from 'antd'
import {SingleColumnDragger,DoubleColumnDragger,ThreeColumnDragger,FourColumnDragger} from '../draggables'


const Sections = ({open,onClose=()=>{},title})=>{

    return(
        <Container open={open} onClose={()=>onClose()} title={title}>
            <Select value="Blank Sections" options={[{label:"Blank Sections", value:"Blank Sections"}]}/>
            <SingleColumnDragger />
            <DoubleColumnDragger />
            <ThreeColumnDragger />
            <FourColumnDragger />
          
        </Container>
    )
}

export default Sections