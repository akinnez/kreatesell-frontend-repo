import React, {useMemo, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import ApiService from 'utils/axios';
import Loader from 'components/loader';

// TODO: Make this hook cache currencies
const useCurrency = () => {
	const [allowedCurrencies, setAllowedCurrencies] = useState([]);
	const [loading, setLoading] = useState(false);
	const {countries} = useSelector((state) => state.utils);

	useEffect(() => {
		setLoading(true);
		ApiService.request(
			'GET',
			'v1/kreatesell/utils/allowed-currencies',
			(res) => {
				setLoading(false);
				const item = res?.data?.currencies?.map(
					({id, short_name, is_payable}) => ({
						label: short_name,
						value: id,
						is_payable,
					})
				);
				setAllowedCurrencies(item);
			}
		),
			(err) => {
				setLoading(false);
				console.log('err is', err);
			};
	}, []);

	// without XAF and XOF
	const countriesCurrency = useMemo(() => {
		if (allowedCurrencies.length > 0) {
			return countries?.filter((country) => {
				return allowedCurrencies.some((allowedCurrency) => {
					// there are some countries spending USD and are not US
					// to prevent duplication of USD being stored
					if (
						allowedCurrency.label === 'USD' &&
						country.short_name === 'US'
					) {
						return true;
					}
					return (
						country.currency_id === allowedCurrency.value &&
						allowedCurrency.label !== 'USD' &&
						!['XOF', 'XAF'].includes(allowedCurrency.label)
					);
				});
			});
		}
		return [];
	}, [countries, allowedCurrencies.length]);

	const allAllowedCurrencies = useMemo(() => {
		if (allowedCurrencies.length > 0) {
			return countries?.filter((country) => {
				return allowedCurrencies.some((allowedCurrency) => {
					// there are some countries spending USD and are not US
					// to prevent duplication of USD being stored
					if (
						allowedCurrency.label === 'USD' &&
						country.short_name === 'US'
					) {
						return true;
					}
					return (
						country.currency_id === allowedCurrency.value &&
						allowedCurrency.label !== 'USD'
					);
				});
			});
		}
		return [];
	}, [countries, allowedCurrencies.length]);

	const filterdWest = useMemo(() => {
		return countries.filter((c) => c.currency === 'XOF');
	}, [countries]);

	const filteredCentral = useMemo(() => {
		const cn = ['Chad', 'Cameroon', 'Gabon'];
		return countries.filter((c) => cn.includes(c.name));
	}, [countries]);
	// console.log('countriesCurrency', countriesCurrency)
	// console.log('allowedCurrencies', allowedCurrencies);

	return {
		countriesCurrency,
		filterdWest,
		filteredCentral,
		loading,
		allowedCurrencies,
		allAllowedCurrencies,
	};
};

export default useCurrency;
