import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';
import PreviewHeader from 'components/Preview/PreviewHeader';
import {GetProductByID} from 'redux/actions';
import PreviewContent from 'components/Preview/PreviewContent';
import {ConvertCurrency, GetStoreCheckoutCurrencies} from 'redux/actions';
import {PoweredByKS} from 'components/PoweredByKs';
// export default function PreviewProduct ({id}){
export default function PreviewProduct() {
	const router = useRouter();

	const {
		product: {store_dto, check_out_details},
	} = useSelector((state) => state.product);
	const {storeCheckoutCurrencies} = useSelector((state) => state.store);
	const [activeCurrency, setActiveCurrency] = useState({});
	const [formattedCurrencies, setFormattedCurrencies] = useState([]);

	// this is the product details for a product whose price has been defined by
	// kreator and is also the active currency selected
	const [alreadyDefinedPrice, setAlreadyDefinedPrice] = useState(null);
	const [alreadyDefinedOriginalPrice, setAlreadyDefinedOriginalPrice] =
		useState(null);

	const getProductByID = GetProductByID();
	const convertCurrency = ConvertCurrency();
	const getStoreCheckoutCurrencies = GetStoreCheckoutCurrencies();

	useEffect(() => {
		if (router.query.id) {
			getProductByID(router.query.id);
		}
	}, [router.query.id]);

	useEffect(() => {
		if (!!store_dto?.store_id) {
			getStoreCheckoutCurrencies(store_dto?.store_id);
		}
	}, [store_dto?.store_id]);

	const formatCurrencies = () => {
		// remove duplicate values (XOF and XAF) from the array
		const currencies = storeCheckoutCurrencies
			?.filter((currency, index, self) => {
				return (
					index ===
					self.findIndex(
						(t) => currency.currency_id === t.currency_id
					)
				);
			})
			.map((cur) => {
				return {
					...cur,
					label: cur.currency_short_name,
					value: cur?.currency_id,
				};
			});
		setFormattedCurrencies(currencies);
	};

	useEffect(() => {
		if (storeCheckoutCurrencies.length > 0) {
			formatCurrencies();
		}
	}, [storeCheckoutCurrencies.length]);

	useEffect(() => {
		if (activeCurrency?.label) {
			handleCurrencyConversion(activeCurrency?.label);
		}
	}, [activeCurrency?.currency_id]);
	// console.log('check_out_details', check_out_details)
	const handleCurrencyConversion = (toCurrency) => {
		let sellingIndex = check_out_details.findIndex(
			(detail) =>
				detail?.currency_name === toCurrency &&
				detail?.price_indicator === 'Selling'
		);
		let originalIndex = check_out_details.findIndex(
			(detail) =>
				detail?.currency_name === toCurrency &&
				detail?.price_indicator === 'Original'
		);
		if (sellingIndex !== -1) {
			setAlreadyDefinedPrice(check_out_details[sellingIndex]);
			if (originalIndex === -1) {
				setAlreadyDefinedOriginalPrice(null);
				const data = {
					amount: 0,
					from_currency_name: 'NGN', //NGN for now till we get the base currency
					to_currency_name: toCurrency,
				};
				convertCurrency(
					data,
					() => console.log('success'),
					() => console.log('error')
				);
			} else {
				setAlreadyDefinedOriginalPrice(
					check_out_details[originalIndex]
				);
			}
		} else if (toCurrency) {
			setAlreadyDefinedPrice(null);
			setAlreadyDefinedOriginalPrice(null);
			const data = {
				amount: 0,
				from_currency_name: 'NGN', //NGN for now till we get the base currency
				to_currency_name: toCurrency,
			};
			convertCurrency(
				data,
				() => console.log('success'),
				() => console.log('error')
			);
		}
	};

	if (!router.query.id) {
		return null;
	}

	return (
		<>
			<div
				style={{
					position: 'absolute',
					background: '#e5e5e5',
					left: 0,
					top: 0,
					width: '100%',
				}}
			>
				<PreviewHeader
					id={router.query.id}
					showNavLinks={false}
					{...{formattedCurrencies, setActiveCurrency}}
				/>
				<PreviewContent
					{...{alreadyDefinedPrice, alreadyDefinedOriginalPrice}}
				/>
				<PoweredByKS />
			</div>
		</>
	);
}
