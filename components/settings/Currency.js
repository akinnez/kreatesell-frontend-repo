import React, {useState,useEffect} from 'react'
import ProductCurrency from './ProductCurrency'
import CustomerCurrency from './CustomerCurrency'
import ApiService from '../../utils/axios'
import Loader from '../loader'



const Index = ()=>{

    const [state, setState] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        ApiService.request(
            'GET',
            'v1/kreatesell/utils/allowed-currencies',
            (res)=>{
                setLoading(false)
                const item = res?.data?.currencies?.map(({id,short_name})=>({label:short_name,value:id}))
                setState(item)
            })
    },[])
    return(
        <>
        {
            loading ? <Loader />:
            <>
            <ProductCurrency list={state}/>
            <CustomerCurrency list={state}/>
            </>
        }
    
        </>
    )
}

export default Index