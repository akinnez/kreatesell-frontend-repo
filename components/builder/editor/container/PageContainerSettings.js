import React from 'react'
import { useNode } from '@craftjs/core'
import { Collapse, Divider } from 'antd'
import { BoxModel,ColorPicker,Uploader } from '../../forms'

const { Panel } = Collapse
const PageContainerSettings = ()=>{

    const { actions: {setProp}, backgroundImage,backgroundColor,
    paddingTop,paddingRight,paddingBottom,paddingLeft,marginTop,marginRight,marginBottom,
marginLeft } = useNode((node) => ({
        backgroundImage: node.data.props.backgroundImage,
        backgroundColor: node.data.props.backgroundColor,
        paddingTop: node.data.props.paddingTop,
        paddingRight: node.data.props.paddingRight,
        paddingBottom: node.data.props.paddingBottom,
        paddingLeft: node.data.props.paddingLeft,
        marginLeft: node.data.props.marginLeft,
        marginTop: node.data.props.marginTop,
        marginBottom: node.data.props.marginBottom,
        marginRight: node.data.props.marginRight,
      }));


    return(
        <div>
           <Collapse bordered={false} expandIconPosition="right" defaultActiveKey={['1']}>
            <Panel header="Section Background" key="1">
                <ColorPicker value={backgroundColor} onChange={(e)=>setProp(props=>props.backgroundColor = e)}/>
                <Uploader value={backgroundImage} onChange={(e)=>setProp(props=>props.backgroundImage = e)}/>
                <Divider />
                <BoxModel label="Padding"
                    top={paddingTop} right={paddingRight} 
                    bottom={paddingBottom} left={paddingLeft}
                    onChangeBottom={(e)=>setProp(props=>props.paddingBottom=e)}
                    onChangeLeft={(e)=>setProp(props=>props.paddingLeft=e)}
                    onChangeTop={(e)=>setProp(props=>props.paddingTop=e)}
                    onChangeRight={(e)=>setProp(props=>props.paddingRight=e)}
                    />
                    <Divider />
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
        </div>
    )
}

export default PageContainerSettings