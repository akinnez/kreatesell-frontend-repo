import React from "react";
import style from './Index.module.scss'
import { useNode,Element } from '@craftjs/core'
import { Input,Collapse,Select  } from 'antd'
import {ColorPicker,BoxModel} from '../../forms'






export const SingleColumnSection = ()=>{
    const {connectors:{connect,drag}} = useNode()
    return(
        <div ref={ref=>connect(drag(ref))}>
            <div className={style.row}>
                <Element is={Col} id="col1" canvas/>
            </div>
        </div> 
    )
}

export const TwoColumnSection = ()=>{
    const {connectors:{connect,drag}} = useNode()
    return(
        <div ref={ref=>connect(drag(ref))}>
            <div className={style.row}>
                <Element is={Col} id="col1" canvas/>
                <Element is={Col} id="col2" canvas/>
            </div>
        </div> 
    )
}

export const ThreeColumnSection = ()=>{
    const {connectors:{connect,drag}} = useNode()
    return(
        <div ref={ref=>connect(drag(ref))}>
            <div className={style.row}>
                <Element is={Col} id="col1" canvas/>
                <Element is={Col} id="col2" canvas/>
                <Element is={Col} id="col3" canvas/>
            </div>
        </div> 
    )
}

export const FourColumnSection = ()=>{
    const {connectors:{connect,drag}} = useNode()
    return(
        <div ref={ref=>connect(drag(ref))}>
            <div className={style.row}>
                <Element is={Col} id="col1" canvas/>
                <Element is={Col} id="col2" canvas/>
                <Element is={Col} id="col3" canvas/>
                <Element is={Col} id="col4" canvas/>
            </div>
        </div> 
    )
}


const Col = ({children,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    backgroundColor
    })=>{
    const { connectors: {connect} } = useNode();
    return(
        <div ref={connect} className={style.col}
            style={{
                marginTop:marginTop+'px',
                marginRight:marginRight+'px',
                marginLeft:marginLeft+'px',
                marginBottom:marginBottom+'px',
                paddingTop:paddingTop+'px',
                paddingBottom:paddingBottom+'px',
                paddingLeft:paddingLeft+'px',
                paddingRight:paddingRight+'px',
                backgroundColor:backgroundColor
            }}>
            {children}
        </div>
    )
}

const {Panel} = Collapse
const ColSettings = ()=>{
    const { actions: {setProp}, 
    backgroundColor,paddingTop,paddingRight,paddingBottom,paddingLeft,
    marginTop,marginBottom,marginLeft,marginRight } = useNode((node) => ({
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

    return(
        <Collapse bordered={false} defaultActiveKey={["1"]} ghost={false} expandIconPosition="right">
            <Panel header="Column Background" key="1">
                <ColorPicker value={backgroundColor} label="Color" onChange={(e)=>setProp(props=>props.backgroundColor = e)}/>
            </Panel>
            <Panel header="Padding" key="2">
                <BoxModel 
                    top={paddingTop}
                    bottom={paddingBottom}
                    right={paddingRight}
                    left={paddingLeft}
                    onChangeTop={(e)=>setProp(props=>props.paddingTop = e)}
                    onChangeRight={(e)=>setProp(props=>props.paddingRight = e)}
                    onChangeBottom={(e)=>setProp(props=>props.paddingBottom = e)}
                    onChangeLeft={(e)=>setProp(props=>props.paddingLeft = e)}
                    />
            </Panel>
            <Panel header="Margin" key="3">
                <BoxModel 
                    top={marginTop}
                    bottom={marginBottom}
                    right={marginRight}
                    left={marginLeft}
                    onChangeTop={(e)=>setProp(props=>props.marginTop = e)}
                    onChangeRight={(e)=>setProp(props=>props.marginRight = e)}
                    onChangeBottom={(e)=>setProp(props=>props.marginBottom = e)}
                    onChangeLeft={(e)=>setProp(props=>props.marginLeft = e)}
                    />
            </Panel>
        </Collapse>
    )
}


Col.craft = {
    name:"Column",
    props:{
        marginTop:0,
        marginRight:0,
        marginBottom:0,
        marginLeft:0,
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:0,
        paddingRight:0,
        backgroundColor:"#ffffff00"
    },
    related: {
        settings: ColSettings
      }  
}
