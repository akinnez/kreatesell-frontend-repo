import React from 'react'
import { useNode } from '@craftjs/core'
import ContentEditable from 'react-contenteditable'


const Heading = ({text,fontSize,color,fontFamily,fontWeight})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
        <div ref={ref=>connect(drag(ref))}>
           <ContentEditable
        html={text} 
        onChange={e => 
          setProp(props =>props.text)
        } 
        tagName="h1"
        style={{fontSize: `${fontSize}px`}}
      />
        </div>
    )
}

export default Heading