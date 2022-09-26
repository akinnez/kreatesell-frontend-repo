import { useMemo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import useSWR from 'swr'

import ApiService from 'utils/axios'
import Loader from 'components/loader'

// TODO: Make this hook cache currencies
const useCheckoutCurrency = () => {
  const [allowedCurrencies, setAllowedCurrencies] = useState([])
  const [loading, setLoading] = useState(false)
  const { countries } = useSelector((state) => state.utils)
  const {
    storeCheckoutCurrencies,
    loading: storeCheckoutCurrenciesLoading,
  } = useSelector((state) => state.store)

  useEffect(() => {}, [storeCheckoutCurrencies.length])

  const countriesCurrency = useMemo(() => {
    if (storeCheckoutCurrencies.length > 0) {
      return countries?.filter((country) => {
        return storeCheckoutCurrencies.some((checkoutCurrency) => {
          return (
            country.currency_id === checkoutCurrency.currency_id &&
            !['XOF', 'XAF'].includes(checkoutCurrency.currency_short_name)
          )
        })
      })
    }
    return []
  }, [countries, storeCheckoutCurrencies.length])

  // allowed currencies: {label:"",value:""}

  const filterdWest = useMemo(() => {
    if (storeCheckoutCurrencies.length > 0) {
      return countries?.filter((country) => {
        return storeCheckoutCurrencies.some((checkoutCurrency) => {
          return (
            country.id === checkoutCurrency.country_id &&
            ['XOF'].includes(checkoutCurrency.currency_short_name)
          )
        })
      })
    }
    return []
  }, [countries.length, storeCheckoutCurrencies.length])

  const filteredCentral = useMemo(() => {
    if (storeCheckoutCurrencies.length > 0) {
      return countries?.filter((country) => {
        return storeCheckoutCurrencies.some((checkoutCurrency) => {
          return (
            country.id === checkoutCurrency.country_id &&
            ['XAF'].includes(checkoutCurrency.currency_short_name)
          )
        })
      })
    }
    return []
  }, [countries.length, storeCheckoutCurrencies.length])

  return {
    countriesCurrency,
    filterdWest,
    filteredCentral,
    loading,
    allowedCurrencies,
  }
}

export default useCheckoutCurrency
