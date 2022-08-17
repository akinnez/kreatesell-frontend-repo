import * as types from '../types'

const initialState = {
  loading: false,
  checkoutDetails: {},
  intent: '', //client Secret
}

const CheckoutReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SEND_PAYMENT_CHECKOUT_DETAILS.REQUEST:
    case types.CREATE_INTENT.REQUEST:
      return { ...state, loading: true }

    case types.SEND_PAYMENT_CHECKOUT_DETAILS.SUCCESS:
    case types.SEND_PAYMENT_CHECKOUT_DETAILS.FAILURE:
      return { ...state, loading: false, ...payload }

    case types.CREATE_INTENT.SUCCESS:
      return { ...state, loading: false, intent: payload }

    case types.CREATE_INTENT.FAILURE:
      return { ...state, loading: false }

    case types.CHECKOUT_DETAILS.REQUEST:
      return { ...state, loading: false, checkoutDetails: payload }

    default:
      return state
  }
}

export default CheckoutReducer
