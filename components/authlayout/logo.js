import React from 'react'
import {Image} from 'antd'


const Logo = ()=>{

    return(
        <div style={{display:"flex",justifyContent:"center",padding:"10px", marginBottom:"10px"}}>
            <Image src="/images/logo.png" width={170}/>
        </div>
    )
}

export default Logo