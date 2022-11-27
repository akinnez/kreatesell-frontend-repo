import {useState, useEffect} from 'react';
import axios from 'axios';

import {currencyOptions} from 'components/account-dashboard/partials';

const useLocation = () => {
	// const [position, setPosition] = useState(null);
	const [countryDetails, setCountryDetails] = useState({
		ip: '',
		countryName: '',
		countryCode: '',
		city: '',
		timezone: '',
		currency: '',
	});
	const [loading, setLoading] = useState(true);

	const getGeoInfo = () => {
		axios
			.get('https://ipapi.co/json/')
			.then((response) => {
				let data = response.data;
				let allowed = currencyOptions.some(
					(currency) => currency.value === data.currency
				);
				setCountryDetails({
					ip: '',
					countryName: '',
					countryCode: '',
					city: '',
					timezone: '',
					currency: '',
				});
				// we want to check if the data.currency is part of the allowed currencies for
				if (allowed) {
					setCountryDetails({
						...countryDetails,
						ip: data.ip,
						countryName: data.country_name,
						countryCode: data.country_calling_code,
						city: data.city,
						timezone: data.timezone,
						currency: data.currency,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		// if ('geolocation' in navigator) {
		// 	navigator.geolocation.getCurrentPosition(function (position) {
		// 		setPosition(position);
		// 		// console.log("Latitude is :", position.coords.latitude);
		// 		// console.log("Longitude is :", position.coords.longitude);
		// 	});
		// } else {
		// 	console.log('Not Available');
		// }
		getGeoInfo();
	}, []);

	// return {position};
	return {countryDetails, countryDetailsLoading: loading};
};

export default useLocation;
