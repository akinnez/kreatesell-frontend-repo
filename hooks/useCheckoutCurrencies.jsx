import {useMemo, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

// TODO: Make this hook cache currencies
const useCheckoutCurrency = () => {
	const [loading, setLoading] = useState(false);
	const {countries} = useSelector((state) => state.utils);
	const {storeCheckoutCurrencies, loading: storeCheckoutCurrenciesLoading} =
		useSelector((state) => state.store);

	const countriesCurrency = useMemo(() => {
		if (storeCheckoutCurrencies.length > 0) {
			return countries.filter((country) => {
				return storeCheckoutCurrencies.some((checkoutCurrency) => {
					// there are some countries spending USD and are not US
					// to prevent duplication of USD being stored
					if (
						checkoutCurrency.currency_short_name === 'USD' &&
						country.short_name === 'US'
					) {
						return true;
					}
					return (
						country.id === checkoutCurrency.country_id &&
						checkoutCurrency.currency_short_name !== 'USD' &&
						!['XOF', 'XAF'].includes(
							checkoutCurrency.currency_short_name
						)
					);
				});
			});
		}
		return [];
	}, [countries, storeCheckoutCurrencies.length]);

	// console.log(
	// 	'country',
	// 	countries.find((ctr) => ctr.short_name === 'TZ')
	// );
	// console.log('storeCheckoutCurrencies', storeCheckoutCurrencies);
	// console.log('countriesCurrency', countriesCurrency);
	// allowed currencies: {label:"",value:""}

	const filterdWest = useMemo(() => {
		if (storeCheckoutCurrencies.length > 0) {
			return countries?.filter((country) => {
				return storeCheckoutCurrencies.some((checkoutCurrency) => {
					return (
						country.id === checkoutCurrency.country_id &&
						['XOF'].includes(checkoutCurrency.currency_short_name)
					);
				});
			});
		}
		return [];
	}, [countries.length, storeCheckoutCurrencies.length]);

	const filteredCentral = useMemo(() => {
		if (storeCheckoutCurrencies.length > 0) {
			return countries?.filter((country) => {
				return storeCheckoutCurrencies.some((checkoutCurrency) => {
					return (
						country.id === checkoutCurrency.country_id &&
						['XAF'].includes(checkoutCurrency.currency_short_name)
					);
				});
			});
		}
		return [];
	}, [countries.length, storeCheckoutCurrencies.length]);

	return {
		countriesCurrency,
		filterdWest,
		filteredCentral,
		loading,
		storeCheckoutCurrenciesLoading,
	};
};

export default useCheckoutCurrency;
