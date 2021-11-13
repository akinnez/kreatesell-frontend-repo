import React from 'react'
import { useNode } from '@craftjs/core'
import { Collapse,Row,Col,Select } from 'antd';
import {MyInput,ColorPicker, BoxModel} from '../../forms'

const Line = ()=>{
    return(
        <div style={{height:1, backgroundColor:"#BFBFBF", margin:"10px 0 20px 0"}}/>
    )
}
const Divider = ({
    width,
    borderStyle,
    borderWidth,
    borderColor,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight
})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
        <div ref={ref=>connect(drag(ref))}>
           <div 
            style={{
                width:width+'%',
                borderTopWidth:borderWidth+'px',
                borderTopColor:borderColor,
                borderTopStyle:borderStyle,
                marginTop:marginTop+'px',
                marginLeft:marginLeft+'px',
                marginRight:marginRight+'px',
                marginBottom:marginBottom+'px'
            }}/>         
        </div>
        
        </>
    )
}

export default Divider

const {Panel} = Collapse
const DividerSettings = ()=>{
    const { actions: {setProp},
    width,borderStyle,borderWidth,borderColor,marginTop,marginBottom,marginLeft,marginRight } = useNode((node) => ({
        width: node.data.props.width,
        borderStyle: node.data.props.borderStyle,
        borderWidth: node.data.props.borderWidth,
        borderColor: node.data.props.borderColor,
        marginTop: node.data.props.marginTop,
        marginBottom: node.data.props.marginBottom,
        marginLeft: node.data.props.marginLeft,
        marginRight: node.data.props.marginRight
    }));

    return(
            <div>
                <Line />
                <Row gutter={10}>
                    <Col span={12}>
                        <MyInput label="Border" value={borderWidth} 
                        onChange={(e)=>setProp(props=>props.borderWidth=e)}/>
                    </Col>
                    <Col span={12}>
                        <ColorPicker  value={borderColor} 
                            onChange={(e)=>setProp(props=>props.borderColor = e)}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                <Select 
                    value={borderStyle}
                    onChange={(e)=>setProp(props=>props.borderStyle = e)}
                    options={[
                    {label:"----------------------------Dash", value:"dashed"},
                    {label:"..................................................Dot", value:"dotted"},
                    {label:"____________________________Solid", value:"solid"},
                ]}/>
                </Col></Row>
               
                <Row>
                    <Col span={24}>
                        <MyInput label="Width" value={width}
                            onChange={(e)=>setProp(props=>props.width = e)}
                         style={{width:100}}/>
                    </Col>
                </Row>
                
                <Line />
                <Row gutter={10}>
                    <Col span={24} >
                        <p>Margin</p>
                        <BoxModel top={marginTop} right={marginRight}
                            left={marginLeft} bottom={marginBottom}
                            onChangeBottom={(e)=>setProp(props=>props.marginBottom = e)}
                            onChangeTop={(e)=>setProp(props=>props.marginTop = e)}
                            onChangeRight={(e)=>setProp(props=>props.marginRight = e)}
                            onChangeLeft={(e)=>setProp(props=>props.marginLeft = e)}
                            />
                    </Col>
                </Row>
        </div>
    )
}



Divider.craft = {
    name:"Divider",
    props:{
        width:100,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#000000",
        marginTop:0,
        marginBottom:0,
        marginRight:0,
        marginLeft:0
    },
    related:{
        settings:DividerSettings
    }
}