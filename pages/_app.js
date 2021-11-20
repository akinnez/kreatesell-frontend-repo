import React from 'react'
import "antd/dist/antd.css";
import '../public/css/global.scss'
import store from '../redux/store'
import { Provider } from 'react-redux'


const App = ({Component,pageProps})=>{
    return <Provider store={store}><Component {...pageProps}/></Provider>
}

export default App