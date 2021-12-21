import React from 'react'
import EmailSetting from './EmailSetting'
import Password from './Password'
import TwoFactor from './2Fa'


const Index = ()=>{
    return(
        <>
        <EmailSetting />
        <TwoFactor />
        <Password />
        </>
    )
}

export default Index