import React, {useState,useEffect} from 'react'
import ProductCurrency from './ProductCurrency'
import CustomerCurrency from './CustomerCurrency'
import ApiService from '../../utils/axios'
import Loader from '../loader'

import useCurrency from 'hooks/useCurrency';



const Index = ()=>{

    const [state, setState] = useState()
    const [loading, setLoading] = useState(false)
    const {countriesCurrency, filterdWest, filteredCentral} = useCurrency();

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
            <ProductCurrency list={state} {...{filteredCentral, filterdWest, countriesCurrency}}/>
            <CustomerCurrency list={state} {...{filteredCentral, filterdWest, countriesCurrency}}/>
            </>
        }
    
        </>
    )
}

export default Index