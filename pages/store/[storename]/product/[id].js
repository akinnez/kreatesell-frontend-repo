import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import styles from '../../../../public/css/storeName-product-id.module.scss';
import {useSelector} from 'react-redux';
import PreviewHeader from 'components/Preview/PreviewHeader';
import {AuthGetProductById, GetProductByIDNotAut} from 'redux/actions';
import PreviewContent from 'components/Preview/PreviewContent';
import {ConvertCurrency, GetStoreCheckoutCurrencies} from 'redux/actions';
import {PoweredByKS} from 'components/PoweredByKs';

export default function PreviewProduct() {
	const router = useRouter();

	const {
		product: {store_dto, check_out_details, default_currency},
	} = useSelector((state) => state.product);
	const {storeCheckoutCurrencies} = useSelector((state) => state.store);

	const [activeCurrency, setActiveCurrency] = useState('');
	const [formattedCurrencies, setFormattedCurrencies] = useState([]);
	const [productStatus, setProductStatus] = useState('idle');
	// this is the product details for a product whose price has been defined by
	// kreator and is also the active currency selected
	const [alreadyDefinedPrice, setAlreadyDefinedPrice] = useState(null);
	const [alreadyDefinedOriginalPrice, setAlreadyDefinedOriginalPrice] =
		useState(null);

	const getProductByID = GetProductByIDNotAut();
	const convertCurrency = ConvertCurrency();
	const getStoreCheckoutCurrencies = GetStoreCheckoutCurrencies();

	useEffect(() => {
		if (router.query.id) {
			getProductByID(
				router.query.id,
				(res) => {
					// console.log('successs', res.data.data.status);
					if (
						['deactivate', 'deativate'].includes(
							res.data.data.status.toLowerCase()
						)
					) {
						setProductStatus('deactivated');
						return;
					}
					setProductStatus('not-deactivated');
				},
				(status) => {
					// console.log('failed', status);
					if (status === 'failed') {
						setProductStatus('deactivated');
					}
				}
			);
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
						(t) =>
							currency.currency_id === t.currency_id ||
							currency?.currency_short_name ===
								t?.currency_short_name
					)
				);
			})
			.map((cur) => {
				return {
					...cur,
					label: cur.currency_short_name,
					value: cur?.currency_short_name,
				};
			});
		setFormattedCurrencies(currencies);
	};
	// console.log('storeCheckoutCurrencies', storeCheckoutCurrencies);
	// console.log('formattedCurrencies', formattedCurrencies);
	useEffect(() => {
		if (storeCheckoutCurrencies.length > 0) {
			formatCurrencies();
		}
	}, [storeCheckoutCurrencies.length]);

	useEffect(() => {
		if (activeCurrency) {
			handleCurrencyConversion(activeCurrency);
		}
	}, [activeCurrency]);

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
					from_currency_name: default_currency?.currency,
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
				from_currency_name: default_currency?.currency,
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
				className={styles.container}
				style={{
					// position: 'absolute',
					background: '#e5e5e5',
					minHeight: '100vh',
					// left: 0,
					// top: 0,
					// width: '100%',
				}}
			>
				<PreviewHeader
					id={router.query.id}
					showNavLinks={false}
					{...{formattedCurrencies, setActiveCurrency}}
				/>
				<PreviewContent
					{...{
						alreadyDefinedPrice,
						alreadyDefinedOriginalPrice,
						productStatus,
					}}
				/>
				<PoweredByKS />
			</div>
		</>
	);
}
