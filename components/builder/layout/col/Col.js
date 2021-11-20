import React from 'react'
import { Element } from '@craftjs/core'
import ColPane from './Pane'





const Column = ()=>{

    return(
        <Element id="col" is={ColPane} canvas></Element>
    )
}

export default Column