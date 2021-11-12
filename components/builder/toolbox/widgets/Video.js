import React from 'react'
import { useNode } from '@craftjs/core'
import { Player } from 'video-react'
import {Collapse,Row,Col,Input,Divider} from 'antd'
import {BoxModel,MyInput} from '../../forms'



const Video = ({src,width,height})=>{

    const {connectors:{connect,drag},actions:{setProp}} = useNode()

    return(
      <>
          <div ref={ref=>connect(drag(ref))} style={{display:"inline"}}>
          <Player  
            width={width}
            height={height}
            src={src}/>          
          </div>
      </>
    )
}

export default Video

const {Panel} = Collapse
const VideoSettings = ()=>{
  const { actions: {setProp},width,height,src} = useNode((node) => ({
      src: node.data.props.src,
      height: node.data.props.height,
      width: node.data.props.width,
    }));


  return(
    <Collapse bordered={false} expandIconPosition="right" defaultActiveKey={['1']}>
            <Panel header="Image Source" key="1">
                
                <Row style={{marginTop:20}}>
                        <Col span={24}>
                            <label>Video URL</label>
                         <Input placeholder="Paste image url here"
                          value={src}  
                          onChange={(e)=>setProp(props=>props.src = e.target.value)}/>
                        </Col>
                    </Row>
                   
                
                    {/* <Divider />
                    <Row gutter={10} style={{margin:'20px 0'}}>
                        <Col span={12}>
                            <MyInput label="Width" value={width} onChange={(e)=>setProp(props=>props.width = e)}/>
                        </Col>
                        <Col span={12}>
                            <MyInput label="Height" value={height} onChange={(e)=>setProp(props=>props.height = e)}/>
                        </Col>
                    </Row> */}

                
                   
                    
            </Panel>
            </Collapse>
  )
}




Video.craft ={
  props:{
    width:150,
    height:150,
    src:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  },
  related:{
    settings:VideoSettings
  }
}