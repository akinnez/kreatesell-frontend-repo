import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';

import styles from '../../../../public/css/storeName-product-id.module.scss';
import PreviewHeader from 'components/Preview/PreviewHeader';
import {GetProductByIDNotAut} from 'redux/actions';
import PreviewContent from 'components/Preview/PreviewContent';
import {ConvertCurrency, GetStoreCheckoutCurrencies} from 'redux/actions';
import {PoweredByKS} from 'components/PoweredByKs';
import useLocation from 'hooks/useLocation';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundaryComponent';

export default function PreviewProduct() {
	const router = useRouter();

	const {countryDetails, countryDetailsLoading: loading} = useLocation();

	const {
		product: {
			store_dto,
			check_out_details,
			default_currency,
			product_price_type,
		},
	} = useSelector((state) => state.product);
	const {storeCheckoutCurrencies} = useSelector((state) => state.store);

	const {convertedCurrency, loading: currencyConverterLoading} = useSelector(
		(state) => state.currencyConverter
	);

	// currency selected from the currency dropdown
	const [activeCurrency, setActiveCurrency] = useState('');

	const [formattedCurrencies, setFormattedCurrencies] = useState([]);
	const [productStatus, setProductStatus] = useState('idle');

	const [targetCurrency, setTargetCurrency] = useState('');

	// this is the product details for a product whose price has been defined by
	// kreator and is also the active currency selected
	// for "fixed price"
	const [alreadyDefinedPrice, setAlreadyDefinedPrice] = useState(null);
	const [alreadyDefinedOriginalPrice, setAlreadyDefinedOriginalPrice] =
		useState(null);

	// prices for "pay what you want"
	const [suggestedPrice, setSuggestedPrice] = useState(null); //predefined suggested price for a particular currency
	const [minimumPrice, setMinimumPrice] = useState(null); //predefined minimum price for a particular currency

	const getProductByID = GetProductByIDNotAut();
	const convertCurrency = ConvertCurrency();
	const getStoreCheckoutCurrencies = GetStoreCheckoutCurrencies();

	const storename = store_dto?.store_name;

	/////////////////////////////////////////////////////////////////////////////
	//  API REQUESTS MADE WHEN COMPONENT MOUNTS
	/////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (router.query.id) {
			getProductByID(
				router.query.id,
				(res) => {
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

	/////////////////////////////////////////////////////////////////////////////
	//  ON MOUNT API REQUESTS ENDS HERE
	/////////////////////////////////////////////////////////////////////////////

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
	useEffect(() => {
		if (targetCurrency && check_out_details?.length > 0) {
			handleCurrencyConversion(targetCurrency);
		}
	}, [targetCurrency, check_out_details?.length]);

	//TODO: Convert currency based off of user's location
	useEffect(() => {
		if (countryDetails?.currency) {
			setTargetCurrency(countryDetails?.currency);
		}
	}, [countryDetails?.currency]);

	const handleCurrencyConversion = (toCurrency) => {
		const data = {
			amount: 0,
			from_currency_name: default_currency?.currency,
			to_currency_name: toCurrency,
		};
		// WIP: This is for only fixed price
		//TODO: Do for pay what you want
		if (product_price_type?.toLowerCase() === 'fixed price') {
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
			// if there is a predefined selling price
			if (sellingIndex !== -1) {
				setAlreadyDefinedPrice(check_out_details[sellingIndex]);
				convertCurrency(
					data,
					() => console.log('success'),
					() => console.log('error')
				);
			} else if (toCurrency) {
				setAlreadyDefinedPrice(null);
				setAlreadyDefinedOriginalPrice(null);
				convertCurrency(
					data,
					() => console.log('success'),
					() => console.log('error')
				);
			}
		} else if (product_price_type?.toLowerCase() === 'pay what you want') {
			let minimumIndex = check_out_details.findIndex(
				(detail) =>
					detail?.currency_name === toCurrency &&
					detail?.price_indicator === 'Minimum'
			);
			let suggestedIndex = check_out_details.findIndex(
				(detail) =>
					detail?.currency_name === toCurrency &&
					detail?.price_indicator === 'Suggested'
			);
			if (minimumIndex !== -1) {
				setMinimumPrice(check_out_details[minimumIndex]);
				convertCurrency(
					data,
					() => console.log('success'),
					() => console.log('error')
				);
			} else if (toCurrency) {
				//there is no predefined minimum or suggested price for the particular currency
				setMinimumPrice(null);
				setSuggestedPrice(null);
				convertCurrency(
					data,
					() => console.log('success'),
					() => console.log('error')
				);
			}
		}
	};

	// WIP: Meta tag for product page
	const formatDataForMetaTag = (data) => {
		//
		const MetaDataObj = {
			data: {
				url: ``,
				title: '',
				keywords: '',
				name: '',
				description: '',
				image: '',
				siteName: '',
			},
			title: '',
			keywords: '',
			description: '',
		};

		return MetaDataObj;
		// data:{
		//   url:'',title:'', keywords:'', name:'', description: '', image:'', siteName:''
		// }
		// title, keywords, description
	};

	if (!router.query.id) {
		return null;
	}

	return (
		<>
			<div
				className={styles.container}
				style={{
					background: '#e5e5e5',
					minHeight: '100vh',
				}}
			>
				<PreviewHeader
					id={router.query.id}
					showNavLinks={false}
					countryDetails
					countryDetailsLoading={loading}
					{...{formattedCurrencies, setActiveCurrency}}
				/>
				<ErrorBoundary
					resetErrorBoundary={() =>
						router.reload(window.location.pathname)
					}
				>
					<PreviewContent
						{...{
							alreadyDefinedPrice,
							alreadyDefinedOriginalPrice,
							productStatus,
							minimumPrice,
						}}
					/>
				</ErrorBoundary>
				<PoweredByKS {...{storename}}/>
			</div>
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const {query} = context;
// 	try {
// 		const {data} = await axios.get(
// 			`${process.env.BASE_URL}v1/kreatesell/product/get/${query?.id}`
// 		);
// 		return {
// 			props: {
// 				data,
// 			},
// 		};
// 	} catch (error) {
// 		console.error('Error fetching data:', error);
// 		return {
// 			props: {
// 				data: null,
// 			},
// 		};
// 	}
// }
