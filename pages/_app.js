import React from 'react'
import "antd/dist/antd.css";
import '../public/css/global.scss'


const App = ({Component,pageProps})=>{


    return <Component {...pageProps}/>
}

export default App