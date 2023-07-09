const {generateActions} = require('utils');

export const CHECKOUT_DETAILS = generateActions('CHECKOUT_DETAILS');
export const SEND_PAYMENT_CHECKOUT_DETAILS = generateActions(
	'SEND_PAYMENT_CHECKOUT_DETAILS'
);
export const CREATE_INTENT = generateActions('CREATE_INTENT');
export const REVALIDATE_REFERENCE = generateActions('REVALIDATE_REFERENCE');
