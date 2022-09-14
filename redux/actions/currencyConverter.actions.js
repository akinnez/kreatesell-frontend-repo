import axios from '../../utils/axios'
import * as types from '../types'
import { useDispatch } from 'react-redux'
import { showToast } from 'utils'

export const ConvertCurrency = () => {
  const dispatch = useDispatch()
  return (data, successCallback, errorCallback) => (
    dispatch({ type: types.CONVERT_CURRENCY.REQUEST }),
    axios.request(
      `post`,
      `v1/kreatesell/rates/convert`,
      (res) => {
        dispatch({ type: types.CONVERT_CURRENCY.SUCCESS, payload: res?.rate })
        showToast(res?.message, 'info')
        // console.log('responsse is', res)
        successCallback?.()
      },
      (err) => {
        dispatch({ type: types.CONVERT_CURRENCY.FAILURE, payload: err })
        // console.log('error is', err)
        showToast(err.message || err.message.data)
        errorCallback?.()
      },
      data,
    )
  )
}
