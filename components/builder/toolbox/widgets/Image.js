import React from 'react'
import { useNode } from '@craftjs/core'
import styled from "styled-components";
import { Collapse,Divider,Input,Row,Col } from 'antd';
import {Uploader,BoxModel,MyInput} from '../../forms'




const Image = ({src,altText,width,height,marginBottom,marginTop,marginRight,marginLeft})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      
           <img
            ref={ref=>connect(drag(ref))} 
            src={src} alt={altText}
            style={{
                width:width+'px',
                height:height+'px',
                marginBottom:marginBottom+'px',
                marginTop:marginTop+'px',
                marginRight:marginRight+'px',
                marginLeft:marginLeft+'px',
            }}/>           

    )
}

export default Image

const {Panel} = Collapse
const ImageSettings = ()=>{

    const { actions: {setProp},width,height,src,altText,marginTop,marginRight,marginBottom,
    marginLeft } = useNode((node) => ({
        src: node.data.props.src,
        backgroundColor: node.data.props.backgroundColor,
        altText: node.data.props.altText,
        marginLeft: node.data.props.marginLeft,
        marginTop: node.data.props.marginTop,
        marginBottom: node.data.props.marginBottom,
        marginRight: node.data.props.marginRight,
        height: node.data.props.height,
        width: node.data.props.width,
      }));

    return(
        <Collapse bordered={false} expandIconPosition="right" defaultActiveKey={['1']}>
            <Panel header="Image Source" key="1">
                
                <Uploader value={src} onChange={(e)=>setProp(props=>props.src = e)}/>
                <Row style={{marginTop:20}}>
                        <Col span={24}>
                            <label>Embed from a URL</label>
                         <Input placeholder="Paste image url here"  onChange={(e)=>setProp(props=>props.src = e.target.value)}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col span={24}>
                            <label>Alternative text</label>
                         <Input placeholder="Enter alternative text" value={altText}  onChange={(e)=>setProp(props=>props.altText = e.target.value)}/>
                        <span>It appears in place of a video or image that doesn't load. It's also read out loud by screen readers.</span>
                        </Col>
                    </Row>
                
                    <Divider />
                    <Row gutter={10} style={{margin:'20px 0'}}>
                        <Col span={12}>
                            <MyInput label="Width" value={width} onChange={(e)=>setProp(props=>props.width = e)}/>
                        </Col>
                        <Col span={12}>
                            <MyInput label="Height" value={height} onChange={(e)=>setProp(props=>props.height = e)}/>
                        </Col>
                    </Row>

                <BoxModel label="Margin"
                    top={marginTop} right={marginRight} 
                    bottom={marginBottom} left={marginLeft}
                    onChangeBottom={(e)=>setProp(props=>props.marginBottom=e)}
                    onChangeLeft={(e)=>setProp(props=>props.marginLeft=e)}
                    onChangeTop={(e)=>setProp(props=>props.marginTop=e)}
                    onChangeRight={(e)=>setProp(props=>props.marginRight=e)}
                    />
                   
                    
            </Panel>
            </Collapse>
    )
}

Image.craft = {
    props:{
        width:100,
        height:100,
        marginBottom:0,
        marginLeft:0,
        marginRight:0,
        marginTop:0,
        altText:''
    },
    related:{
        settings:ImageSettings
    }
}


