import axios from '../../utils/axios'
import * as types from '../types'
import { useDispatch } from 'react-redux'
import { showToast } from '../../utils'

export const GetCountries = () => {
  const dispatch = useDispatch()
  return (successCallback, errorCallback) => (
    dispatch({ type: types.GET_COUNTRIES.REQUEST }),
    axios.request(
      `get`,
      `v1/kreatesell/utils/get-countries`,
      (res) => {
        dispatch({
          type: types.GET_COUNTRIES.SUCCESS,
          payload: res?.data?.list_of_countries,
        })
        successCallback?.()
      },
      (err) => {
        dispatch({ type: types.GET_COUNTRIES.FAILURE, payload: err })
        errorCallback?.()
      },
    )
  )
}
export const GetAllowedCurrencies = () => {
  const dispatch = useDispatch()
  return (successCallback, errorCallback) => (
    dispatch({ type: types.GET_CURRENCIES.REQUEST }),
    axios.request(
      'GET',
      'v1/kreatesell/utils/allowed-currencies',
      (res) => {
        // console.log("currency res.data", res.data);
        dispatch({
          type: types.GET_CURRENCIES.SUCCESS,
          payload: res?.data?.currencies,
        })
        successCallback?.()
      },
      (err) => {
        dispatch({ type: types.GET_CURRENCIES.FAILURE, payload: err })
        errorCallback?.()
      },
    )
  )
}

export const GuestSubscription = () => {
  const dispatch = useDispatch()
  return (data, successCallback, errorCallback) => (
    dispatch({ type: types.GUEST_SUBSCRIPTION.REQUEST }),
    axios.request(
      `post`,
      `v1/kreatesell/utils/subscribe`,
      (res) => {
        dispatch({
          type: types.GUEST_SUBSCRIPTION.SUCCESS,
          payload: res?.data,
        })
        successCallback?.()
      },
      (err) => {
        dispatch({ type: types.GUEST_SUBSCRIPTION.FAILURE, payload: err })
        showToast(err?.message, 'error')
        errorCallback?.()
      },
      data,
    )
  )
}

export const countriesRequest = () => ({
  type: types.GET_COUNTRIES.REQUEST,
})

export const countriesSuccess = (countries) => ({
  type: types.GET_COUNTRIES.SUCCESS,
  payload: countries,
})

export const bankSuccess = (data) => ({
  type: types.GET_BANKS_SUCCESS,
  payload: { [data.id]: data.banks },
})
