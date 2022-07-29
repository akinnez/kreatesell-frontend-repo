import React, {useMemo, useState, useEffect} from 'react'
import { useSelector } from "react-redux";

import ApiService from "utils/axios";
import Loader from "components/loader";

const useCurrency = () => {
  const [allowedCurrencies, setAllowedCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { countries } = useSelector((state) => state.utils);
  
  useEffect(()=>{
    setLoading(true)
    ApiService.request(
        'GET',
        'v1/kreatesell/utils/allowed-currencies',
        (res)=>{
            setLoading(false)
            const item = res?.data?.currencies?.map(({id,short_name})=>({label:short_name,value:id}))
            setAllowedCurrencies(item)
        }),
        (err)=>{
          setLoading(false)
          console.log("err is", err);
        }
},[])


  const countriesCurrency = useMemo(()=> {
    if(allowedCurrencies.length>0){
      return countries?.filter(country=> {
        return allowedCurrencies.some(allowedCurrency => {
          return country.currency_id === allowedCurrency.value
        })
      })
    }
  }, [countries, allowedCurrencies.length]);

  // console.log("countries", countries.filter((ctr)=> ctr.currency === "GMD"))
  // console.log("countriesCurrency", countriesCurrency);
  const filterdWest = useMemo(()=> {
    const cn = ['Benin Republic', 'Burkina Faso', 'Togo', 'Ghana', 'Mali', 'Senegal', 'Ivory Coast']
    return countries.filter(c => cn.includes(c.name))
  }, [countries])

  const filteredCentral = useMemo(()=> {
    const cn = ['Chad', 'Cameroon', 'Gabon']
    return countries.filter(c => cn.includes(c.name))
  }, [countries])
  
  return {countriesCurrency, filterdWest, filteredCentral, loading};
}

export default useCurrency;