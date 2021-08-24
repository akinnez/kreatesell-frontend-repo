import React,{useEffect,useState} from 'react'
import {Layout} from 'antd'
import Sidebar from './sidebar'
import Logo from './logo'
import Nav from './header'
import {Spin} from 'antd'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getCountries } from '../../redux/actions/utilityActions'
import { getStore } from '../../redux/actions/store.actions'
import ApiService from '../../utils/axios'


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
    const [isloading, setLoading] = useState(true)
    const { Header, Footer, Sider, Content } = Layout
    const dispatch = useDispatch()
    
useEffect(()=>{
    ApiService.request(
        'get',
        'v1/kreatesell/utils/get-countries',
        (res) => {
            const countries = res?.data?.list_of_countries?.map(({id,name})=>({label:name,value:id}))
            dispatch(getCountries(countries))
        
      },
      (err) => {
          console.log("GetCountries error --->", err);
          dispatch({ type: types.GET_COUNTRIES.FAILURE, payload: err });
          errorCallback?.();
      }
    )
},[])

useEffect(()=>{
        
    ApiService.request(
        'get',
        'v1/kreatesell/store/me',
        ({data}) => {
            setLoading(false)
          dispatch(getStore({bank_details:data?.bank_details,completed:data?.percentage_completed,...data?.store_details}))
           // successCallback?.();
        },
      
    )
},[])
   

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
                <div style={{padding:"0 15px"}}>
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
                    {loading || isloading ? <Loader />:children}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
	)
}

export default Index