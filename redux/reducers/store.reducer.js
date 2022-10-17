import * as types from '../types'

const initialState = {
  loading: false,
  store: {},
  error: {},
  storeSettings: {},
  ctaBtn: {},
  singleStoreDetails: {},
  singleStoreProducts: [],
  storeCurrencies: [],
  storeCheckoutCurrencies: [],
  salesStatistics: {},
	affiliateSalesStatistics:{}
}

const StoreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ONBOARDING_SETUP.REQUEST:
    case types.WELCOME_STORE_ONBOARDING.REQUEST:
    case types.STORE_SETTINGS.REQUEST:
    case types.UPDATE_STORE_CTA_BUTTON.REQUEST:
    case types.LIST_SINGLE_STORE_PRODUCT.REQUEST:
    case types.GET_STORE_DETAILS.REQUEST:
    case types.GET_STORE_CURRENCY.REQUEST:
    case types.GET_STORE_CHECKOUT_CURRENCY.REQUEST:
    case types.UPDATE_STORE_CURRENCY.REQUEST:
    case types.UPDATE_STORE_CHECKOUT_CURRENCY.REQUEST:
      return { ...state, loading: true }
    case types.GET_SALES_STATISTICS.REQUEST:
      return { ...state, loading: true };
    case types.GET_AFFILIATES_SALES_STATISTICS.REQUEST:
      return { ...state, loading: true };

    case types.UPDATE_STORE_CURRENCY.SUCCESS:
    case types.UPDATE_STORE_CHECKOUT_CURRENCY.SUCCESS:
      return { ...state, loading: false }

    case types.ONBOARDING_SETUP.SUCCESS:
    case types.WELCOME_STORE_ONBOARDING.SUCCESS:
    case types.GET_STORE_DETAILS.SUCCESS:
      return { ...state, loading: false, store: payload }

    case types.STORE_SETTINGS.SUCCESS:
      return { ...state, loading: false, storeSettings: payload }

    case types.GET_STORE_CURRENCY.SUCCESS:
      return { ...state, loading: false, storeCurrencies: payload }

    case types.GET_STORE_CHECKOUT_CURRENCY.SUCCESS:
      return { ...state, loading: false, storeCheckoutCurrencies: payload }

    case types.UPDATE_STORE_CTA_BUTTON.SUCCESS:
      return { ...state, loading: false, ctaBtn: payload }

    case types.LIST_SINGLE_STORE_PRODUCT.SUCCESS:
      return { ...state, loading: false, ...payload }

    case types.GET_SALES_STATISTICS.SUCCESS:
      return { ...state, loading: false, salesStatistics: payload };

    case types.GET_AFFILIATES_SALES_STATISTICS.SUCCESS:
      return { ...state, loading: false, affiliateSalesStatistics: payload };

    case types.ONBOARDING_SETUP.FAILURE:
    case types.WELCOME_STORE_ONBOARDING.FAILURE:
    case types.STORE_SETTINGS.FAILURE:
    case types.UPDATE_STORE_CTA_BUTTON.FAILURE:
    case types.LIST_SINGLE_STORE_PRODUCT.FAILURE:
    case types.GET_STORE_CURRENCY.FAILURE:
    case types.GET_STORE_CHECKOUT_CURRENCY.FAILURE:
    case types.UPDATE_STORE_CURRENCY.FAILURE:
    case types.UPDATE_STORE_CHECKOUT_CURRENCY.FAILURE:
      return { ...state, loading: false, error: payload }

    case types.GET_STORE_DETAILS.FAILURE:
      return { ...state, loading: false }

    case types.UPDATE_STORE_DETAILS:
      return { ...state, store: { ...state.store, bank_details: payload } }
    case types.GET_SALES_STATISTICS.FAILURE:
      return { ...state, loading: false, error: payload };
    case types.GET_AFFILIATES_SALES_STATISTICS.FAILURE:
      return { ...state, loading: false, error: payload };

    default:
      return state
  }
}

export default StoreReducer
