import React,{useState} from 'react'
import Container from '../../sidebar/menu/Container'
import {Tabs,Input,Form} from 'antd'



const SeoPreview = ({title,description})=>{

    return(
        <>
        <div className="preview-wrapper">
            <span className="seo-title">{title || "Title"}</span>
            <p style={{color:"#8C8C8C"}}>https://kreatsell.com/</p>
            <p>{description || "Your description will appear here. Edit it below."}</p>
        </div>
        <style jsx>{`
            .preview-wrapper{
                background: #F5F5F5;
                border: 1px solid #0072EF;
                border-radius: 8px;
                margin: 4px 0px;
                padding:10px 16px;
            }

            .seo-title{
                color:#69C0FF;
                font-size:12px;
                line-height:26px;
                display:inline-block;
            }
        
        `}</style>
        </>
    )
}


const Notice = ()=>{

    return(
        <>
        <div className="notice-wrapper">
            <p className="notice-title">Notice</p>
            <span>
            Please note that we do not provide support for this section. Any non-tracking code placed in the above areas may cause major problems with your Page. For troubleshooting, please use the support and documentation provided by your analytics service provider.
            </span>
        </div>
        <style jsx>{`
            .notice-wrapper{
                padding: 8px 8px 8px 16px;
                min-height: 154px;
                margin: 16px 0px;
                background: rgba(255, 77, 79, 0.05);
            }

            .notice-title{
                color:#FF5C00;
                font-size:16px;
                font-weight:500;
                margin-bottom:5px
            }

            .notice-wrapper span{
                color:#FF5C00;
                font-size:12px;
            }
        `}</style>
        </>
    )
}


const {TabPane} = Tabs
const {Item} = Form
const Settings = ({open,onClose=()=>{},title})=>{
    const [state, setState] = useState(null)
    

    return(
        <Container open={open} onClose={()=>onClose()} title="Page Settings">
           
            <Form layout="vertical">
            <Tabs defaultActiveKey="1">
            <TabPane tab="SEO" key="1">
            <SeoPreview title={state?.title} description={state?.description}/>
                <Item label="SEO Page Title" name="title">
                    <Input placeholder="Title" onChange={(e)=>setState({...state,title:e.target.value})}/>
                    <span className="dsc">Aim to keep this under 70 characters.</span>
                </Item>
                <Item label="SEO Page Description" name="description">
                    <Input.TextArea rows={5} placeholder="Enter your description here"
                     onChange={(e)=>setState({...state,description:e.target.value})} />
                    <span className="dsc">Aim to keep this between 50 and 160 characters.</span>
                </Item>
                <Item label="SEO Page Keywords" name="keyword">
                    <Input />
                    <span className="dsc">Separate keywords by commas.</span>
                </Item>
            </TabPane>
            <TabPane tab="ANALYTICS" key="2">
                <span className="dsc" style={{marginBottom:20, display:"inline-block"}}>This section enables you to gather data by pasting tracking code from the analytics service providers of your choice (e.g. Google Analytics, Facebook Pixel)</span>
                <Item label="Google Analytics Tracking ID">
                    <Input placeholder="Ex: UA-123456-0"/>
                    <span className="dsc">The Google Analytics Profile ID for your tracking code.</span>
                </Item>
                <Item label="Head Section Tracking Code">
                    <Input.TextArea rows={5} />
                </Item>
                <Item label="Immediately after the opening <body> tag">
                    <Input.TextArea rows={5} />
                </Item>
                <Item label="Immediately before the closing </body> tag">
                    <Input.TextArea rows={5} />
                </Item>
                <Notice />
            </TabPane>
            </Tabs>
          </Form>
        </Container>
    )
}

export default Settings