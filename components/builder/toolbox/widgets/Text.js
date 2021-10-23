import React from 'react'
import { useNode } from '@craftjs/core'
import { Input } from 'antd'
import ContentEditable from 'react-contenteditable'
import Container from '../../sidebar/menu/Container'



const Text = ({text,fontSize,color,fontFamily,margin,padding})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
            <ContentEditable
        html={text} 
        onChange={e => 
          setProp(props =>props.text)
        } 
        tagName="p"
        style={{fontSize:fontSize+'px',margin,fontFamily,padding,color}}
      />
        </div>
        
        </>
    )
}

export default Text


const TextSettings = () => {
  const { actions: {setProp}, fontSize } = useNode((node) => ({
    fontSize: node.data.props.fontSize
  }));

  return (
    
    <Input 
      value={fontSize || 12}
      onChange={(e)=>setProp(props => props.fontSize = e.target.value)}/>
    
  )
}


Text.craft = {
  props:{
    fontSize:12,
    color:"#000000",
    paddingLeft:0,
    paddingRight:0,
    paddingTop:0,
    paddingBottom:0,
    marginTop:0,
    marginBottom:0,
    marginLeft:0,
    marginRight:0,
    backgroundColor:"transparent"
  },
  related: {
    settings: TextSettings
  }  
}