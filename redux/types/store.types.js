import { generateActions } from '../../utils'

export const GET_STORE_DETAILS = generateActions('GET_STORE_DETAILS')
export const ONBOARDING_SETUP = generateActions('ONBOARDING_SETUP')
export const WELCOME_STORE_ONBOARDING = generateActions(
  'WELCOME_STORE_ONBOARDING',
)
export const STORE_SETTINGS = generateActions('STORE_SETTINGS')
export const UPDATE_STORE_CTA_BUTTON = generateActions(
  'UPDATE_STORE_CTA_BUTTON',
)
export const LIST_SINGLE_STORE_PRODUCT = generateActions(
  'LIST_SINGLE_STORE_PRODUCT',
)

export const UPDATE_STORE_DETAILS = 'UPDATE_STORE_DETAILS'
export const UPDATE_STORE_CURRENCY = generateActions('UPDATE_STORE_CURRENCY')
export const GET_STORE_CURRENCY = generateActions('GET_STORE_CURRENCY')
export const GET_STORE_CHECKOUT_CURRENCY = generateActions(
  'GET_STORE_CHECKOUT_CURRENCY',
)
export const UPDATE_STORE_CHECKOUT_CURRENCY = generateActions(
  'UPDATE_STORE_CHECKOUT_CURRENCY',
)

export const GET_SALES_STATISTICS = generateActions("GET_SALES_STATISTICS"); 
export const GET_AFFILIATES_SALES_STATISTICS = generateActions("GET_AFFILIATES_SALES_STATISTICS");
