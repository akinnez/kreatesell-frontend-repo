import React from 'react';
import ProductCurrency from './ProductCurrency';
import CustomerCurrency from './CustomerCurrency';
import Loader from '../loader';

import useCurrency from 'hooks/useCurrency';

const Index = () => {
	const {countriesCurrency, filterdWest, filteredCentral, loading} =
		useCurrency();

	// console.log("countriesCurrency", countriesCurrency)
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<ProductCurrency
						{...{
							filteredCentral,
							filterdWest,
							countriesCurrency,
							loading,
						}}
					/>
					<CustomerCurrency
						{...{
							filteredCentral,
							filterdWest,
							countriesCurrency,
							loading,
						}}
					/>
				</>
			)}
		</>
	);
};

export default Index;
