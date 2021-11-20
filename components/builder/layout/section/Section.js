import React from 'react'
import { Element } from '@craftjs/core'
import SectionPane from './Pane'
import Row from '../row/Row'




const Section = ()=>{

    return(
        <Element id="section" is={SectionPane} canvas>
            <Row/>
        </Element>
    )
}

export default Section