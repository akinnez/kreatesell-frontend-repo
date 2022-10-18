import {useMemo, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

// TODO: Make this hook cache currencies
const useStoreCurrency = () => {
	const {countries} = useSelector((state) => state.utils);
	const {storeCurrencies, loading: storeCurrenciesLoading} = useSelector(
		(state) => state.store
	);

	useEffect(() => {}, [storeCurrencies.length]);

	const selectedStoreCurrencies = useMemo(() => {
		if (storeCurrencies.length > 0) {
			return countries?.filter((country) => {
				return storeCurrencies.some((storeCurrency) => {
					return country.short_name === storeCurrency.country;
				});
			});
		}
		return [];
	}, [countries, storeCurrencies.length]);

	return {
		selectedStoreCurrencies,
		storeCurrenciesLoading,
	};
};

export default useStoreCurrency;
