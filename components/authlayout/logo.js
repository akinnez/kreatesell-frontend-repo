import React from 'react'
import {Image} from 'antd'


const Logo = ()=>{

    return(
        <div style={{display:"flex",justifyContent:"center",padding:"10px 0 10px 0", marginBottom:"10px"}}>
            <Image preview={false} src="/images/logo.svg" width={170}/>
        </div>
    )
}

export default Logo