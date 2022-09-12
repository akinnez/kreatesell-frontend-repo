import * as types from '../types'

const initialState = {
  loading: false,
  error: {},
  convertedCurrency: {},
}

const CurrencyConverterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CONVERT_CURRENCY.REQUEST:
      return { ...state, loading: true }

    case types.CONVERT_CURRENCY.SUCCESS:
      return { ...state, loading: false, error: {}, convertedCurrency: payload }

    case types.CONVERT_CURRENCY.FAILURE:
      return { ...state, loading: false, error: payload }

    default:
      return state
  }
}

export default CurrencyConverterReducer
