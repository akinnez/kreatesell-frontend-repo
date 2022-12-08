import React from 'react';

import {ConvertCurrency} from 'redux/actions';

const useConvertRates = (from_currency_name, convertedCurrency) => {
	const convertCurrency = ConvertCurrency();
	function handleCurrencyConversion() {
		if (convertedCurrency && from_currency_name) {
			const data = {
				amount: 0,
				from_currency_name: from_currency_name,
				to_currency_name: convertedCurrency,
			};
			convertCurrency(
				data,
				() => console.log('success'),
				() => console.log('error')
			);
		}
	}
	const getCurrency = (priceOrName) => {
		if (priceOrName === 'price') {
			return convertedCurrency?.buy_rate * price;
		}
	};
	return {handleCurrencyConversion, getCurrency};
};

export default useConvertRates;

// setSubPriceType
// setSubscriptionMode
