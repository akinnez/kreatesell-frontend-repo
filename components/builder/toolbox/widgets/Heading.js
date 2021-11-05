import React from 'react'
import { useNode } from '@craftjs/core'
import {Collapse  } from 'antd'
import ContentEditable from 'react-contenteditable'
import {TextFont,GroupFormat,TextFormat,ColorPicker,BoxModel} from '../../forms'


const Heading = ({
  text,
  fontSize,
  fontFamily,
  color,
  lineHeight,
  backgroundColor,
  paddingBottom,
  paddingTop,
  paddingLeft,
  paddingRight,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight
})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
            <ContentEditable
            html={text} 
            onChange={e =>setProp(props=>props.text =e.target.value)
            } 
        tagName="h1"
        style={{
          fontSize:fontSize+'px',
          fontFamily:fontFamily,
          color:color,
          lineHeight:lineHeight,
          backgroundColor:backgroundColor,
          paddingBottom:paddingBottom+'px',
          paddingLeft:paddingLeft+'px',
          paddingTop:paddingTop+'px',
          paddingRight:paddingRight+'px',
          marginTop:marginTop+'px',
          marginBottom:marginBottom+'px',
          marginLeft:marginLeft+'px',
          marginRight:marginRight+'px',
        }}
      />
        </div>
        

        </>
    )
}

export default Heading

const {Panel} = Collapse
const HeadingSettings = () => {
  const { actions: {setProp}, 
    fontSize,color,lineHeight,backgroundColor,paddingTop,paddingRight,paddingBottom,paddingLeft,
    marginTop,marginBottom,marginLeft,marginRight } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
    lineHeight: node.data.props.lineHeight,
    backgroundColor: node.data.props.backgroundColor,
    paddingTop: node.data.props.paddingTop,
    paddingRight: node.data.props.paddingRight,
    paddingBottom: node.data.props.paddingBottom,
    paddingLeft: node.data.props.paddingLeft,
    marginLeft: node.data.props.marginLeft,
    marginRight: node.data.props.marginRight,
    marginBottom: node.data.props.marginBottom,
    marginTop: node.data.props.marginTop,
  }));

  return (
    <Collapse bordered={false} defaultActiveKey={["1"]} ghost={false} expandIconPosition="right">
      <Panel header="Font Styles" key="1">
        <TextFont fontSize={fontSize} 
          onChangeFontSize={(e)=>setProp(props=>props.fontSize = e)}/>
        <GroupFormat />
        <TextFormat label="Text Color" lineHeight={lineHeight} onChangeLineHeight={(e)=>setProp(props => props.lineHeight = e)} defaultColor="#000000" color={color} onChangeColor={(e)=>setProp(props=>props.color = e)} />
      </Panel>
      <Panel header="Text Background" key="2">
        <ColorPicker label="Background Color" defaultColor="#ffffff00" value={backgroundColor} onChange={(e)=>setProp(props=>props.backgroundColor = e)}/>
      </Panel>
      <Panel header="Padding" key="3">
        <BoxModel top={paddingTop} right={paddingRight} bottom={paddingBottom} left={paddingLeft} 
          onChangeBottom={(e)=>setProp(props=>props.paddingBottom = e)}
          onChangeTop={(e)=>setProp(props=>props.paddingTop = e)}
          onChangeRight={(e)=>setProp(props=>props.paddingRight = e)}
          onChangeLeft={(e)=>setProp(props=>props.paddingLeft = e)}
          />
      </Panel>
      <Panel header="Margin" key="4">
        <BoxModel top={marginTop} right={marginRight} bottom={marginBottom} left={marginLeft} 
          onChangeBottom={(e)=>setProp(props=>props.marginBottom = e)}
          onChangeTop={(e)=>setProp(props=>props.marginTop = e)}
          onChangeRight={(e)=>setProp(props=>props.marginRight = e)}
          onChangeLeft={(e)=>setProp(props=>props.marginLeft = e)}
          />
      </Panel>
    </Collapse>
    
  )
}


Heading.craft = {
  name:"Heading",
  props:{
    fontSize:24,
    fontFamily:"",
    color:"#000000",
    backgroundColor:"#ffffff00",
    lineHeight:1,
    paddingLeft:0,
    paddingRight:0,
    paddingTop:0,
    paddingBottom:0,
    marginTop:0,
    marginBottom:0,
    marginLeft:0,
    marginRight:0
  },
  related: {
    settings: HeadingSettings
  }  
}