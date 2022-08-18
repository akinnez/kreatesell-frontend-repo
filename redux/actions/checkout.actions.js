import axios from '../../utils/axios'
import * as types from '../types'
import { useDispatch } from 'react-redux'
import { showToast } from 'utils'

export const SendPaymentCheckoutDetails = () => {
  const dispatch = useDispatch()
  return (paymentDetails, successCallback, errorCallback) => (
    dispatch({ type: types.SEND_PAYMENT_CHECKOUT_DETAILS.REQUEST }),
    axios.request(
      `post`,
      `v1/kreatesell/payment/checkout`,
      (res) => {
        dispatch({
          type: types.SEND_PAYMENT_CHECKOUT_DETAILS.SUCCESS,
          // payload: res?.data?.listing_status,
        })
        showToast(res?.message, 'info')
        successCallback?.()
      },
      (err) => {
        dispatch({
          type: types.SEND_PAYMENT_CHECKOUT_DETAILS.FAILURE,
          payload: err,
        })
        showToast(err?.message, 'error')
        errorCallback?.()
      },
      paymentDetails,
    )
  )
}

export const CreateIntent = () => {
  const dispatch = useDispatch()
  return (items, successCallback, errorCallback) => {
    dispatch({
      type: types.CREATE_INTENT.REQUEST,
    })
    axios.request(
      `get`,
      ``,
      (res) => {
        dispatch({
          type: types.CREATE_INTENT.SUCCESS,
          payload: res?.data,
        })
        showToast(res?.message, 'info')
        successCallback?.()
      },
      (err) => {
        dispatch({
          type: types.CREATE_INTENT.FAILURE,
          payload: err,
        })
        showToast(err?.message, 'error')
        errorCallback?.()
      },
      items,
    )
  }
}

export const SetCheckoutDetails = () => {
  const dispatch = useDispatch()
  return (checkoutDetails, successCallback, errorCallback) =>
    dispatch({
      type: types.CHECKOUT_DETAILS.REQUEST,
      payload: checkoutDetails,
    })
}
