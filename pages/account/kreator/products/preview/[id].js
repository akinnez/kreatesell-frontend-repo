import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {useSelector} from 'react-redux';

import PreviewHeader from 'components/Preview/PreviewHeader';
import {
	AuthGetProductById,
	ConvertCurrency,
	GetStoreCheckoutCurrencies,
} from 'redux/actions';
import PreviewContent from 'components/Preview/PreviewContent';
import AuthLayout from '../../../../../components/authlayout';
import styles from '../../../../../components/Preview/PreviewHeader.module.scss';
import {PoweredByKS} from 'components/PoweredByKs';
import useLocation from 'hooks/useLocation';

// export default function PreviewProduct ({id}){
export default function PreviewProduct() {
	const router = useRouter();
	const getProductByID = AuthGetProductById();

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

	const storename = store_dto?.store_name;

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

	const convertCurrency = ConvertCurrency();
	const getStoreCheckoutCurrencies = GetStoreCheckoutCurrencies();

	useEffect(() => {
		if (router.query.id) {
			getProductByID(
				router.query.id,
				(res) => {
					if (
						['deactivate', 'deativate'].includes(
							res?.data?.data?.status.toLowerCase()
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

	if (!router.query.id) {
		return null;
	}


	return (
		<AuthLayout>
			<div
				style={{
					position: 'absolute',
					background: '#e5e5e5',
					left: 0,
					top: 0,
					width: '100%',
				}}
				className={styles.previewPageContainer}
			>
				<PreviewHeader id={router.query.id} isPreviewMain={true} />
				<PreviewContent
					{...{
						alreadyDefinedPrice,
						alreadyDefinedOriginalPrice,
						productStatus,
						minimumPrice,
					}}
				/>
				<PoweredByKS {...{storename}}/>  
			</div>
		</AuthLayout>
	);
}

// export async function getServerSideProps({query: {id}}){
//     return {
//         props: {
//             id
//         }
//     }
// }
