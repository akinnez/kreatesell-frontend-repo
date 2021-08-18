import React from 'react'
import {Layout} from 'antd'
import Sidebar from './sidebar'
import Logo from './logo'
import Nav from './header'
import {Spin} from 'antd'
import { ToastContainer } from 'react-toastify'


const Loader = ()=>{

    return(
        <>
        <div className="loader">
            <Spin size="large"/>
            <p>Please wait...</p>
        </div>

        <style jsx>{`
            .loader{
                display:flex;
                align-items:center;
                justify-content:center;
                height:100%;
                flex-direction:column;
            }
        
        `}</style>
        </>
    )
}

const Index = ({loading,children})=>{
    const { Header, Footer, Sider, Content } = Layout

	return(
		<Layout>
            <Sider width={300} 
            theme="light"
            style={{
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
            }}
            trigger={null}
            breakpoint="lg"
            collapsedWidth={0}>
                <div style={{padding:"0 10px"}}>
                <Logo />
                <Sidebar /> 
                </div>
              
             </Sider>
            <Layout>
                <Nav />
                <Content 
                style={{backgroundColor:"rgba(245, 245, 245, 1)",
                padding:"50px 20px 10px 30px"}}>
                     <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {loading ? <Loader />:children}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
	)
}

export default Index