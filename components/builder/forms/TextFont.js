import React from 'react'
import {Select,Row,Col} from 'antd'

const TextFont = ({fontSize,onChangeFontSize=()=>{}})=>{

    return(
        <>
        <label>Text Font</label>
        <Row>
            <Col span={18} className="leftselectgroup">
                <Select size="large" options={[{label:"Times New Roman", value:"Times New Roman"}]}/>
            </Col>
            <Col span={6} className="rightselectgroup">
                <Select size="large" value={fontSize} onChange={(e)=>onChangeFontSize(e)} 
                    options={[{label:72, value:72},{label:42, value:42},{label:38, value:38},{label:28, value:28},{label:24, value:24},
                        {label:20, value:20},{label:18, value:18},{label:16, value:16},
                        {label:14, value:14},{label:12, value:12},{label:10, value:10}]}/>
            </Col>
        </Row>
        </>
    )
}

export default TextFont