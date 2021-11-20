import React from 'react'
import { useEditor, Element } from '@craftjs/core'
import RowPane from './Pane'
import Column from '../col/Col'

const Row = ()=>{

    return(
        <Element id="row" is={RowPane} canvas>
            <Column />
        </Element>
    )
}

export default Row