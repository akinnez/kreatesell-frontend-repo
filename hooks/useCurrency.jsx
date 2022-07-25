import React, {useMemo} from 'react'
import { useSelector } from "react-redux";

const useCurrency = () => {
  const { countries } = useSelector((state) => state.utils);
  const countriesCurrency = useMemo(()=> countries?.filter(country=> country.currency_id !== null), [countries]);

  const filterdWest = useMemo(()=> {
    const cn = ['Benin Republic', 'Burkina Faso', 'Togo', 'Ghana', 'Mali', 'Senegal', 'Ivory Coast']
    return countries.filter(c => cn.includes(c.name))
  }, [countries])

  const filteredCentral = useMemo(()=> {
    const cn = ['Chad', 'Cameroon', 'Gabon']
    return countries.filter(c => cn.includes(c.name))
  }, [countries])
  
  return {countriesCurrency, filterdWest, filteredCentral};
}

export default useCurrency;