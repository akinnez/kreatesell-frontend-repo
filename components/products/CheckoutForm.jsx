import { Percentage, Radio } from 'components/inputPack';
import { Switch, Form, Input, Button, Select } from 'antd';
import styles from './Checkout.module.scss';
// import { Select } from 'components/form-input';
import { useState, useEffect, useCallback, useRef } from 'react';
import { CloudUpload, FileDelete, FileZip, Audio, Video, showToast } from 'utils';
import Image from 'next/image';
import { useFormik } from 'formik';
// import {showToast} from '../../utils';
// import { Select } from "components/select/Select";
import { useSelector } from 'react-redux';
import {
	AuthGetProductById,
	GetBillingInterval,
	CreateProduct,
	SetProductTab,
	GetStoreCurrencies,
} from 'redux/actions';
import { useUpload } from 'hooks';
import useStoreCurrency from 'hooks/useStoreCurrencies';
import CustomCheckoutSelect from './CustomCheckout';
import { useRouter } from 'next/router';
import { transformToFormData } from 'utils';

import axios from 'axios';

export const CheckoutForm = ({
	ctaBtnText,
	priceType,
	setCtaBtnText,
	defaultCurrency,
}) => {
	/**
	 * PriceType Values
	 * FixedPrice: 1
	 * Pay What You Want: 2
	 * Installment Payment: 3
	 * Make It Free: 4
	 */

	const getStoreCurrencies = GetStoreCurrencies();
	const getProductByID = AuthGetProductById();
	const getBillingInterval = GetBillingInterval();
	const createProduct = CreateProduct();
	const setProductTab = SetProductTab();
	const { store } = useSelector((state) => state.store);
	const router = useRouter();

	const { product, billingInterval, loading } = useSelector(
		(state) => state.product
	);

	const productType =
		product?.product_details?.product_type?.product_type_name;

	const [productID] = useState(product?.product_details?.kreasell_product_id);

	const isOriginalPrice = product?.product_details?.is_show_compare_price;

	// console.log("product = ", product?.product_details?.kreasell_product_id);
	// setProductID(product?.product_details?.kreasell_product_id);

	// if (product) {
	//   setProductID(product?.product_details?.kreasell_product_id);
	// }
	const [errorForNotMatchedCurrency, setErrorForNotMatchedCurrency] =
		useState(false);
	const [progress, setProgress] = useState(0);
	const [isLimited, setIsLimited] = useState(false);

	const [compareToPrice, setCompareToPrice] = useState(
		isOriginalPrice || false
	);
	const [applyCoupon, setApplyCoupon] = useState(false);
	const [isCouponDiabled, setIsCouponDisabled] = useState(true);
	const [couponType, setCouponType] = useState(0);
	const [frequencyType, setFrequencyType] = useState(0);
	const [billingFrequency, setBillingFrequency] = useState(0);
	const [billed, setBilled] = useState(false);
	const [customBillingDuration, setCustomBillingDuration] = useState('');
	const [duration, setDuration] = useState('custom');

	const [usageType, setUsageType] = useState(0);
	const [promotionalMaterial, setPromotionalMaterial] = useState([]);
	const [frequencyOptions, setFrequencyOptions] = useState([]);
	const [numberOfInputs, setNumberOfInputs] = useState(1);
	const [inputsArray, setInputsArray] = useState([]);
	const [initialPayment, setInitialPayment] = useState([]);
	const [firstPayment, setFirstPayment] = useState([]);
	const [secondPayment, setSecondPayment] = useState([]);
	const [thirdPayment, setThirdPayment] = useState([]);
	const [billingIntervalDuration, setBillingIntervalDuration] = useState(7);
	const [initialBillingInput, setInitialBillingInput] = useState(0);
	const [custombillingInterval, setCustomBillingInterval] = useState(0);
	const [isBasic, setIsBasic] = useState(true);
	const [isApplied, setIsApplied] = useState(false);
	const [isUsage, setIsUsage] = useState(false);
	const [isGreaterthanSug, setIsGreaterThanSug] = useState(false);

	const mounted = useRef(null);
	const { Option } = Select;

	// guards against price duplication
	useEffect(() => {
		if (!mounted.current) {
			mounted.current = 0;
		}
		return () => {
			mounted.current = null;
		};
	}, []);

	useEffect(() => {
		if (Object.keys(store).length > 0) {
			const { user } = store;
			if (user.user_plan === 'Business') {
				setIsCouponDisabled(false);
			} else {
				setIsCouponDisabled(true);
			}
			return () => {
				setIsCouponDisabled(true);
			};
		}
	}, [store]);

	const [couponVariance, setCouponVariance] = useState({
		isPercentage: true,
		is_fixed_amount: false,
	});
	// Fixed Price Inputs
	const [fixedSellingPrice, setFixedSellingPrice] = useState([]);
	const [fixedOriginalPrice, setFixedOriginalPrice] = useState([]);
	const [savedFixedOriginalPrice, setSavedFixedOriginalPrice] =
		useState(fixedOriginalPrice);

	// Pay What You Want
	const [minimumPrice, setMinimumPrice] = useState([]);
	const [suggestedPrice, setSuggestedPrice] = useState([]);

	// Settings Controlled Inputs
	const [allowAffiliateMarket, setAllowAffiliateMarket] = useState(false);
	const [afiliatePercentage, setAfiliatePercentage] = useState(0);
	const [uploadPromotionalMaterial, setUploadPromotionalMaterial] =
		useState(false);
	const [limitProductSale, setLimitProductSale] = useState(false);
	const [numberOfLimit, setNumberOfLimit] = useState(0);
	const [showTotalSales, setShowTotalSales] = useState(false);
	const [buyerPaysTransactionFee, setBuyerPaysTransactionFee] =
		useState(false);

	const [totalSelling, setTotalSelling] = useState([]);
	const mapNumberToArray = (number) => {
		const arrayNumbers = [];
		for (let i = 0; i < number; i++) {
			arrayNumbers.push(i);
		}
		return arrayNumbers;
	};
	const handleBillingIntervalChange = (e) => {
		setInitialBillingInput(e);
		setCustomBillingInterval(e * billingIntervalDuration);
	};

	const { selectedStoreCurrencies, storeCurrenciesLoading } =
		useStoreCurrency();

	const [formattedStoreCurrencies, setFormattedStoreCurrencies] = useState(
		[]
	);

	useEffect(() => {
		setCustomBillingInterval(initialBillingInput * billingIntervalDuration);
	}, [billingIntervalDuration]);

	// for the promotional content
	const [file, setFile] = useState();

	const { preview, getRootProps, getInputProps, mainFile, deleteFile } =
		useUpload({
			setFileChange: setPromotionalMaterial,
			// should accept rar and zip
			fileType: 'image',
		});

	// console.log("product = ", product);

	const durationOptions = [
		{ label: 'Daily', value: 'aaily' },
		{ label: 'Weekly', value: 'weekly' },
		{ label: 'Monthly', value: 'monthly' },
		{ label: 'Every 3 Months', value: 'every_3_Months' },
		{ label: 'Every 6 Months', value: 'every_6_Months' },
		{ label: 'Yearly', value: 'yearly' },
		{ label: 'Custom', value: 'custom' },
	];

	const billedEveryDuration = [
		{ label: 'Days(s)', value: 'days' },
		{ label: 'Weeks(s)', value: 'weeks' },
		{ label: 'Month(s)', value: 'months' },
	];

	const customBillingIntervals = [
		{ label: 'Day(s)', value: 1 },
		{ label: 'Week(s)', value: 7 },
		{ label: 'Month(s)', value: 30 },
	];
	const mappedBillingInterval = billingInterval?.map((billing) => ({
		label: billing.billing_types,
		value: billing.billing_durations,
	}));

	const paymentFrequencyOptions = async () => {
		let opt = [];
		for (let i = 1; i < 10; i++) {
			opt.push(i);
			const values = opt.map((item) => ({ label: item, value: item }));
			setFrequencyOptions(values);
		}
	};

	useEffect(() => {
		paymentFrequencyOptions();
	}, []);

	useEffect(() => {
		getBillingInterval();
	}, []);

	useEffect(() => {
		setFieldValue(
			'Promotional_Items.Allow_Promotional_Items',
			uploadPromotionalMaterial
		);
		if (mainFile.length > 0) {
			setFieldValue('Promotional_Items.PromotionalFiles', [
				...mainFile.map((file) => (file.url ? file.url : file.file)),
			]);
		}
	}, [mainFile, uploadPromotionalMaterial]);

	useEffect(() => {
		setInputsArray(mapNumberToArray(numberOfInputs));
	}, [numberOfInputs]);

	const createCustomCurrencyField = (array) => {
		let title = '';
		let field = [];
		let setField = () => { };
		return array.map((value, index) => {
			switch (value) {
				case 0:
					title = 'Initial Payment at Checkout';
					field = initialPayment;
					setField = setInitialPayment;
					break;
				case 1:
					title = 'Second Payment';
					field = firstPayment;
					setField = setFirstPayment;
					break;
				case 2:
					title = 'Third Payment';
					field = secondPayment;
					setField = setSecondPayment;
					break;
				case 3:
					title = 'Fourth Payment';
					field = thirdPayment;
					setField = setThirdPayment;
					break;
			}

			return (
				<div key={index} className="mt-4">
					<CustomCheckoutSelect
						field={field}
						title={title}
						setField={setField}
						{...{
							formattedStoreCurrencies,
						}}
					/>
				</div>
			);
		});
	};
	useEffect(() => {
		if (productID) {
			// console.log("checkout mounted");
			getProductByID(productID);
			// console.log('PRODUCT = ', getProductByID(productID))
		}
	}, [productID]);

	useEffect(() => {
		if (mainFile.length > 0) {
			mainFile.map(
				async (item) => await uploadFile(item.file, setProgress)
			);
		}
	}, [mainFile]);

	async function uploadFile(file, cb) {
		const formData = new FormData();
		formData.append('upload_preset', 'kreatesell');
		formData.append('file', file);
		const options = {
			onUploadProgress: (progressEvent) => {
				const { loaded, total } = progressEvent;
				let percent = Math.floor((loaded * 100) / total);
				cb(percent);
			},
		};
		try {
			const instance = axios.create();
			delete instance.defaults.headers.common['Authorization'];
			const { data } = await instance.post(
				'https://api.cloudinary.com/v1_1/salvoagency/upload',
				formData,
				options
			);
			// console.log(data);
			setFile({
				type: data?.resource_type,
				url: data?.secure_url,
			});
		} catch (error) {
			console.log('ERROR', error);
		}
	}

	const handleDeleteFile = () => {
		deleteFile(mainFile[0].file);
	};

	useEffect(() => {
		// console.log(product)
	}, [product]);

	const populatePricingObject = (currency, price) => {
		const prices = {
			currency_value: price,
			currency_name: currency,
		};
		return prices;
	};
	const populatePricing = useCallback((array) => {
		for (let values of array) {
			switch (values.price_indicator) {
				case 'Selling':
					const registeredPrice = populatePricingObject(
						values.currency_name,
						values.price
					);
					setFixedSellingPrice((prev) => [...prev, registeredPrice]);
					break;

				//pay what you want prices

				case 'Minimum':
					const minimumPrices = populatePricingObject(
						values.currency_name,
						values.price
					);
					setMinimumPrice((prev) => [...prev, minimumPrices]);
					break;

				case 'Suggested':
					const suggestedPrices = populatePricingObject(
						values.currency_name,
						values.price
					);
					setSuggestedPrice((prev) => [...prev, suggestedPrices]);
					break;

				// * populate and show fixed original price
				case 'Original':
					const registeredOriginalPrice = populatePricingObject(
						values.currency_name,
						values.price
					);
					setFixedOriginalPrice((prev) => {
						setSavedFixedOriginalPrice([
							...prev,
							registeredOriginalPrice,
						]);
						return [...prev, registeredOriginalPrice];
					});
				//* save in here for toggle
				// fixedOriginalPrice);
				// console.log("fixedOriginalPrice from switch = ", fixedOriginalPrice);
				// localStorage.setItem(
				//   "originalPrice",
				//   JSON.stringify(fixedOriginalPrice)
				// );
				default:
					break;
			}
		}
	}, []);

	const checkArrays = (data) => {
		// console.log("Data passed to function", data);
		const arrayLists = [
			'selling_prices',
			'minimum_prices',
			'original_prices',
			'suggested_prices',
			'initial_prices',
			'installment_prices',
		];
		for (let value of arrayLists) {
			if (value in data) {
				if (typeof data[value] === 'object' && data[value].length < 1) {
					delete data[value];
				}
			}
		}
		console.log('data', data);
		return data;
	};

	// ========================================================
	const formatCurrencies = () => {
		// Checks for XOF and XAF duplicates in currency
		let newArr = selectedStoreCurrencies.filter((currency, index, self) => {
			return (
				index ===
				self.findIndex((t) => currency.currency_id === t.currency_id)
			);
		});
		setFormattedStoreCurrencies(newArr);
	};

	// useEffect for formatting currencies
	useEffect(() => {
		if (
			Array.isArray(selectedStoreCurrencies) &&
			selectedStoreCurrencies?.length > 0
		) {
			formatCurrencies();
		}
	}, [selectedStoreCurrencies.length]);

	useEffect(() => {
		// getAllowedCurrencies()
		getStoreCurrencies();
	}, []);

	// function to check that all product currencies have been defined before submission is possible
	const validateDefinedCurrencies = () => {
		setErrorForNotMatchedCurrency(false);
		if (formattedStoreCurrencies.length !== fixedSellingPrice.length) {
			setErrorForNotMatchedCurrency(true);
			return true;
		}
		const results = formattedStoreCurrencies.filter(
			({ currency: id1 }) =>
				!fixedSellingPrice.some(({ currency_name: id2 }) => id2 === id1)
		);
		if (results.length > 0) {
			setErrorForNotMatchedCurrency(true);
			return true;
		}
		return false;
	};

	// ========================================================

	const handleSubmit = (data) => {
		if (priceType === 'Fixed Price') {
			if (validateDefinedCurrencies()) {
				showToast('Please define prices for all currencies', 'error');
				return;
			}
		}
		// console.log("data from submit = ", data);
		// setProductID(productID);
		// const dataWithCompare = {
		//   ...data,
		//   is_show_compare_price: compareToPrice,
		// };

		// console.log("dataWithCompare = ", dataWithCompare);
		// console.log("Data passed to handle submit function", data);
		if (!data.enable_preorder) {
			delete data.preorder_details;
		}
		if (!data.upload_content) {
			delete data.upload_content;
			delete data.contentZipFiles;
		}
		// console.log('promotionalMaterial', promotionalMaterial);
		if (promotionalMaterial.length < 1) {
			delete data?.Promotional_Items;
		}
		if (!data.cta_button) {
			delete data.cta_button;
		}
		if (!applyCoupon) {
			delete data.coupon_settings;
			delete data.checkout;
		}
		if (!data.product_settings.allow_affiliates) {
			delete data.product_settings.affiliate_percentage_on_sales;
		}
		if (!data.is_show_compare_price) {
			delete data.is_show_compare_price;
		}
		const checkedData = checkArrays(data);

		const result = transformToFormData(checkedData);
		// console.log("result = ", result);
		createProduct(result, (res) => {
			if (productType === 'Digital Download') {
				router.push(
					`/account/kreator/products/preview/${res?.product_id}`
				);
				return;
			}
			setProductTab(2);
		});
	};

	const initialValues = {
		action: 'e',
		minimum_price: 0,
		is_minimum_price: true,
		is_show_compare_price: compareToPrice,
		pricing_type_id: 1,
		is_strike_original_price: true,
		selling_prices: [],
		original_prices: [],
		initial_prices: [],
		suggested_prices: [],
		billing_frequency: 0,
		minimum_prices: [],
		no_of_subcription_length_times: '',
		custom_billing_duration: '',
		custom_billing_interval_times: customBillingDuration,
		billing_frequency_duration: duration,

		coupon_settings: {
			coupon_code: 'string',
			is_coupon: true,
			start_date: '',
			end_date: '',
			fixed_amount_value: 0,
			percentage_value: 0,
			is_percentage: true,
			is_fixed_amount: true,
			no_of_frequency: '',
			no_of_usage: '',
			// "product_id": 0
		},
		installment_prices: [],
		Promotional_Items: {
			Allow_Promotional_Items: uploadPromotionalMaterial,
			PromotionalFiles: [],
		},
		set_price: true,
		cta_button: '',
		number_of_limited_product: 0,
		who_bear_fee: buyerPaysTransactionFee,
		product_settings: {
			allow_affiliates: allowAffiliateMarket,
			affiliate_percentage_on_sales: 0,
			is_limited_sales: limitProductSale,
			show_number_of_sales: showTotalSales,
		},
	};

	const handleSelect = (field) => (value) => {
		setDuration(value);
		setFieldValue({ [field]: value });
	};

	const handleBilledSelect = (field) => (value) => {
		setCustomBillingDuration(value);
		setFieldValue({ [field]: value });
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		// validationSchema: "",
		validateOnChange: false,
	});

	const { errors, setFieldValue, values } = formik;
	// console.log('formik values', values);

	//Updating Formik values
	useEffect(() => {
		switch (priceType) {
			case 'Fixed Price':
				return setFieldValue('pricing_type_id', 1);
			case 'Pay What You Want':
				return setFieldValue('pricing_type_id', 2);
			// case 'Installment Payment':
			// 	return setFieldValue('pricing_type_id', 3);
			case 'Make It Free':
				return setFieldValue('pricing_type_id', 4);
		}
	}, [priceType]);
	useEffect(() => {
		setFieldValue('cta_button', ctaBtnText);
		setFieldValue('selling_prices', [...fixedSellingPrice]);
		setFieldValue('is_show_compare_price', compareToPrice);
		setFieldValue('original_prices', [...fixedOriginalPrice]);
		setFieldValue(
			'product_settings.allow_affiliates',
			allowAffiliateMarket
		);
		setFieldValue(
			'product_settings.affiliate_percentage_on_sales',
			afiliatePercentage
		);
		setFieldValue(
			'Promotional_Items.Allow_Promotional_Items',
			uploadPromotionalMaterial
		);
		setFieldValue('product_settings.show_number_of_sales', showTotalSales);
		setFieldValue('who_bear_fee', buyerPaysTransactionFee);
		setFieldValue('product_settings.is_limited_sales', limitProductSale);
		setFieldValue('number_of_limited_product', +numberOfLimit);
		setFieldValue('minimum_prices', [...minimumPrice]);
		setFieldValue('suggested_prices', [...suggestedPrice]);
		setFieldValue('billing_frequency', numberOfInputs);
		setFieldValue(
			'coupon_settings.is_percentage',
			couponVariance.isPercentage
		);
		setFieldValue(
			'coupon_settings.is_fixed_amount',
			couponVariance.is_fixed_amount
		);
	}, [
		ctaBtnText,
		fixedSellingPrice,
		compareToPrice,
		fixedOriginalPrice,
		allowAffiliateMarket,
		afiliatePercentage,
		uploadPromotionalMaterial,
		showTotalSales,
		buyerPaysTransactionFee,
		limitProductSale,
		numberOfLimit,
		minimumPrice,
		suggestedPrice,
		numberOfInputs,
		couponVariance,
		setFieldValue,
	]);

	// useEffect(() => {
	// 	if (mainFile.length > 0) {
	// 		setFieldValue('promotional_items.promotional_files', mainFile);
	// 	}
	// }, [mainFile]);

	// Clear outs
	useEffect(() => {
		if (compareToPrice === false) {
			setFixedOriginalPrice([]);
		}
		if (allowAffiliateMarket === false) {
			setAfiliatePercentage(0);
		}
		if (limitProductSale === false) {
			setNumberOfLimit(0);
		}
	}, [compareToPrice, allowAffiliateMarket, limitProductSale]);

	const setAllFields = useCallback(() => {
		mounted.current += 1;
		if (product && mounted.current === 1) {
			setFieldValue(
				'product_name',
				product?.product_details?.product_name
			);
			setFieldValue(
				'product_details',
				product?.product_details?.product_details
			);
			setFieldValue(
				'product_description',
				product?.product_details?.product_description
			);
			setFieldValue(
				'enable_preorder',
				product?.product_details?.enable_preorder
			);
			setFieldValue(
				'upload_content',
				product?.product_details?.upload_content
			);
			setFieldValue(
				'product_visibility_status',
				product?.product_details?.product_visibility
			);
			setFieldValue(
				'upload_preview',
				product?.product_details?.is_preview_only
			);
			setFieldValue(
				'preorder_details.preorder_release_date',
				product?.product_details?.preoder_date
			);
			setFieldValue(
				'preorder_details.is_preorder_downloadable',
				product?.product_details?.is_preoder_downloadable ?? false
			);
			setFieldValue(
				'kreatesell_id',
				product?.product_details?.kreasell_product_id
			);
			setFieldValue(
				'product_type_id',
				product?.product_details?.product_type_id
			);
			setFieldValue('product_id', product?.product_details?.id);
			setFieldValue(
				'product_listing_status_id',
				product?.product_details?.product_listing_status
			);
			setFieldValue(
				'is_show_compare_price',
				product?.product_details?.is_show_compare_price
			);
			setFieldValue(
				'upload_content',
				product.product_details.upload_content
					? product.product_details.upload_content
					: false
			);
			// setFieldValue("product_settings.show_number_of_sales", product.product_details.is_show_number_of_sales ? product.product_details.is_show_number_of_sales : false);
			// setFieldValue("product_settings.show_number_of_sales", product.product_details.is_show_number_of_sales ? product.product_details.is_show_number_of_sales : false);

			setFieldValue(
				'cta_button',
				product.product_details.cta_button
					? product.product_details.cta_button
					: ctaBtnText
			);
			if (product?.product_details?.cta_button) {
				setCtaBtnText(product?.product_details?.cta_button);
			}
			if (product.product_details.is_show_number_of_sales) {
				setShowTotalSales(true);
			}
			if (product.product_details.who_bears_fee) {
				setBuyerPaysTransactionFee(true);
			}

			if (
				product.check_out_details &&
				product.check_out_details.length > 0
			) {
				populatePricing(product?.check_out_details);
				// setFixedOriginalPrice(fixedOriginalPrice);
			}
			if (product.product_details.is_allow_affiliate === true) {
				setAllowAffiliateMarket(true);
				setAfiliatePercentage(
					product?.product_details?.affiliate_percentage_on_sales
				);
			}
			if (product.product_details.is_limited_sales === true) {
				setLimitProductSale(true);
			}
			// if(product.)
		}
	}, [product]);

	useEffect(() => {
		if (compareToPrice) {
			setFixedOriginalPrice(savedFixedOriginalPrice);
		}
	}, [compareToPrice, fixedOriginalPrice, savedFixedOriginalPrice]);

	useEffect(() => {
		if (Object.keys(product).length > 0) {
			setAllFields();
		}
	}, [product, setAllFields]);

	const [isOpMoreThanSp, setIsOpMoreThanSp] = useState(false);
	const [noMatchingCurrency, setNoMatchingCurrency] = useState(false);

	useEffect(() => {
		// if (priceType !== 'Make It Free') return

		minimumPrice.map((item) => {
			const minPriceCurrency = item?.currency_name;
			const minPriceValue = item?.currency_value;

			const matchItem = suggestedPrice?.find((SpItem) => {
				return SpItem?.currency_name === minPriceCurrency;
			});

			if (minPriceValue > Number(matchItem?.currency_value)) {
				showToast(
					'suggested price must be greater than minimum price',
					'error'
				);
				setIsGreaterThanSug(true);
			} else {
				setIsGreaterThanSug(false);
			}
			return isGreaterthanSug;
		}, []);

		fixedOriginalPrice?.map((OpItem) => {
			//* Op = Original Price and Sp = SellingPrice
			const OpItemCurrency = OpItem?.currency_name;
			const OpItemPrice = OpItem?.currency_value;

			const matchingSpItem = fixedSellingPrice?.find((SpItem) => {
				return SpItem?.currency_name === OpItemCurrency;
			});

			if (
				fixedSellingPrice.length === 0 ||
				fixedOriginalPrice.length === 0
			) {
				setIsOpMoreThanSp(false);
			} else if (
				compareToPrice === true &&
				fixedOriginalPrice.length === 0
			) {
				setIsOpMoreThanSp(false);
			} else if (OpItemPrice > matchingSpItem?.currency_value) {
				setIsOpMoreThanSp(true);
				setNoMatchingCurrency(false);
			} else if (OpItemPrice < matchingSpItem?.currency_value) {
				setIsOpMoreThanSp(false);
				setNoMatchingCurrency(false);
			} else if (!OpItemCurrency || !matchingSpItem?.currency_name) {
				setNoMatchingCurrency(true);
				setIsOpMoreThanSp(false);
			} else {
				setIsOpMoreThanSp(false);
				setNoMatchingCurrency(false);
			}

			return isOpMoreThanSp && noMatchingCurrency;
			// console.log("isOpMore ? = ", isOpMoreThanSp);
		});
	}, [
		fixedOriginalPrice,
		fixedSellingPrice,
		isOpMoreThanSp,
		noMatchingCurrency,
		compareToPrice,
		minimumPrice,
		suggestedPrice,
	]);

	const disableButton = useCallback(() => {
		// console.log("compareToPrice = ", compareToPrice);

		if (!compareToPrice && !isOpMoreThanSp) {
			// console.log("condition 1");
			return false;
		}

		if (compareToPrice && !isOpMoreThanSp) {
			// console.log("condition 1.1");
			return true;
		}
		if (!compareToPrice && noMatchingCurrency) {
			// console.log("condition 2");
			return false;
		}
		if (!isOpMoreThanSp) {
			// console.log("condition 3");
			return true;
		}

		if (isGreaterthanSug) {
			return true;
		}
		// if (!isOpMoreThanSp) {
		// 	// console.log("condition 3");
		// 	return true;
		// }

		return false;
	}, [compareToPrice, isOpMoreThanSp, noMatchingCurrency, isGreaterthanSug]);

	// console.log("disableButton = ", disableButton());

	// console.log("showCompare is enabled = ", product?.product_details);
	return (
		<Form onFinish={formik.handleSubmit}>
			{priceType === 'Fixed Price' && (
				<div className="flex flex-col">
					<CustomCheckoutSelect
						title={'Selling Price'}
						field={fixedSellingPrice}
						setField={setFixedSellingPrice}
						error={errorForNotMatchedCurrency}
						{...{
							selectedStoreCurrencies,
							setFormattedStoreCurrencies,
							formattedStoreCurrencies,
						}}
					/>
					<p className="text-base-gray-200 text-xs pt-2">
						Set the equivalent price of your product in the
						currencies of the country you accept. You can always
						enable or disable any currency in your currency settings
						page.
					</p>
				</div>
			)}
			{priceType === 'Pay What You Want' && (
				<div className="flex flex-col">
					<div className="mt-1">
						<CustomCheckoutSelect
							title={'Minimum Amount'}
							field={minimumPrice}
							setField={setMinimumPrice}
							{...{
								formattedStoreCurrencies,
							}}
						/>
					</div>
					<div className="mt-4">
						<CustomCheckoutSelect
							title={'Suggested Amount'}
							field={suggestedPrice}
							setField={setSuggestedPrice}
							{...{
								formattedStoreCurrencies,
							}}
						/>
					</div>
				</div>
			)}

			{/* {priceType === 'Installment Payment' && (
				<div>
					<p className="text-base mb-2"></p>
					<CustomCheckoutSelect
						title={'Total Selling Price'}
						field={totalSelling}
						setField={setTotalSelling}
					/>
					<div className="mt-3 w-full">
						<p className="text-base mb-2">
							Select Frequency of payments
						</p>
						<div
							className={'w-full lg:w-1/5 ' + styles.selectBorder}
						>
							<Select
								defaultValue={numberOfInputs}
								onChange={(e) => setNumberOfInputs(e)}
								style={{width: '100%', borderRadius: '8px'}}
							>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
								<Option value="4">4</Option>
							</Select>
						</div>
					</div>
					<h2 className="font-semibold my-3 text-base">
						Type What You Want Buyers To Pay At Each Installments
					</h2>
					{createCustomCurrencyField(inputsArray)}
					<div className="mt-3 w-full">
						<h2 className="text-base font-medium mb-2">
							Interval Between Each Payment
						</h2>
						<div
							className={
								'w-full flex lg:w-2/5 ' +
								styles.billingContainer
							}
						>
							<Input
								type="number"
								onChange={(e) =>
									handleBillingIntervalChange(e.target.value)
								}
								style={{paddingLeft: '10px'}}
							/>
							<Select
								onChange={(e) => setBillingIntervalDuration(e)}
								defaultValue={customBillingIntervals[1].value}
								style={{width: '30%'}}
							>
								{customBillingIntervals &&
									customBillingIntervals.map(
										(item, index) => (
											<Option
												key={index}
												value={item.value}
											>
												{item.label}
											</Option>
										)
									)}
							</Select>
						</div>
					</div>
				</div>
			)} */}

			<div>
				{priceType === 'Fixed Price' && (
					<div
						className={
							styles.aplyCpn +
							' flex justify-between items-center mt-3 w-full pt-4'
						}
					>
						<div className={`${styles.cpnLabel}`}>
							Show Compare-To Price (Optional)
						</div>
						<div className={styles.businessCouponNoShow + ' flex'}>
							<Switch
								onChange={(e) => {
									setCompareToPrice((value) => !value);
								}}
								checked={
									// product?.product_details?.is_show_compare_price
									//   ? product?.product_details?.is_show_compare_price
									// :
									// product?.product_details?.is_show_compare_price ??
									compareToPrice
								}
							/>
							<span className={`${styles.cpnStatus}`}>
								<span className="pl-6 text-black-100 text-lg font-semibold">
									{compareToPrice ? 'ON' : 'OFF'}
								</span>
								<h3>Business</h3>
							</span>
						</div>
					</div>
				)}
				{priceType === 'Fixed Price' && compareToPrice && (
					<div className="mt-4">
						<CustomCheckoutSelect
							title={'Original price (NGN)'}
							// * buggy
							// field={fixedOriginalPrice}
							// setField={setFixedOriginalPrice}
							//* bug fix
							field={savedFixedOriginalPrice}
							setField={setSavedFixedOriginalPrice}
							withCustomFeedBack={true}
							showFeedBack={!isOpMoreThanSp}
							noMatchFound={noMatchingCurrency}
							error={errorForNotMatchedCurrency}
							{...{
								selectedStoreCurrencies,
								setFormattedStoreCurrencies,
								formattedStoreCurrencies,
							}}
						/>
					</div>
				)}

				{priceType !== 'Make It Free' && (
					<div
						className={
							styles.aplyCpn +
							' flex justify-between items-center mt-3 w-full pt-4'
						}
					>
						<div className={`${styles.cpnLabel}`}>
							Apply Coupon Code
						</div>
						<div className={styles.businessCoupon + ' flex'}>
							<Switch
								onChange={(e) => {
									setApplyCoupon((value) => !value);
								}}
								checked={applyCoupon}
								disabled={isCouponDiabled ? true : false}
							/>
							<span className={`${styles.cpnStatus}`}>
								<span className="pl-1 text-black-100 font-semibold text-lg ">
									{
										isCouponDiabled
											? 'DISABLED'
											: applyCoupon
												? 'ENABLED'
												: 'DISABLED'
										// ? 'ON'
										// 	: 'OFF'
									}
								</span>
								<h3 className="text-center">Business</h3>
							</span>
						</div>
					</div>
				)}

				{priceType !== 4 && applyCoupon && (
					<div className="my-2">
						<div className="w-full md:w-2/5">
							<Input
								placeholder="Enter coupon code"
								className={styles.ctaBtn}
								name="coupon_settings.coupon_code"
								onChange={formik.handleChange}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4 lg:grid-cols-2 w-full md:w-3/5 lg:w-3/5 xl:w-3/5 ">
							<div>
								<Radio
									value={couponType}
									content={0}
									label="Percentage(%)"
									onChange={(e) => {
										setCouponType(e);
										setCouponVariance((value) => ({
											...value,
											isPercentage: !value.isPercentage,
											is_fixed_amount:
												!value.is_fixed_amount,
										}));
									}}
									labelStyle={styles.radioLabelStyle}
								/>
								<div className="w-full">
									<Input
										placeholder="0"
										type="number"
										className={styles.ctaBtn}
										name="coupon_settings.percentage_value"
										onChange={formik.handleChange}
										disabled={
											couponVariance.isPercentage === true
												? false
												: true
										}
									/>
								</div>
							</div>

							<div>
								<Radio
									value={couponType}
									content={1}
									label="Fixed Amount(NGN)"
									onChange={(e) => {
										setCouponType(e);
										setCouponVariance((value) => ({
											...value,
											isPercentage: !value.isPercentage,
											is_fixed_amount:
												!value.is_fixed_amount,
										}));
									}}
									labelStyle={styles.radioLabelStyle}
								/>
								<div className="w-full">
									<Input
										placeholder="0"
										type="number"
										className={styles.ctaBtn}
										name="coupon_settings.fixed_amount_value"
										onChange={formik.handleChange}
										disabled={
											couponVariance.is_fixed_amount ===
												true
												? false
												: true
										}
									/>
								</div>
							</div>
						</div>

						<div className="grid gap-3 mt-4 w-full lg:w-full xl:w-3/5 grid-cols-1 lg:grid-cols-2">
							<div className="flex items-center gap-3">
								<h2 className="text-base-gray-200 mb-0 text-base font-medium">
									From
								</h2>
								<Input
									type="datetime-local"
									className={
										styles.couponDateTimeLocaleContInput
									}
									onChange={(e) => {
										setFieldValue(
											'coupon_settings.start_date',
											e.target.value
										);
									}}
								/>
							</div>

							<div className="flex items-center gap-3">
								<h2 className="text-base-gray-200 mb-0 text-base font-medium pr-5 lg:pr-0">
									To
								</h2>
								<Input
									type="datetime-local"
									className={
										styles.couponDateTimeLocaleContInput
									}
									onChange={(e) => {
										setFieldValue(
											'coupon_settings.end_date',
											e.target.value
										);
									}}
								/>
							</div>
							<div>
								<p className={styles.textMain}>
									Limit the frequency of the coupon
								</p>
								<div className={styles.couponLimit}>
									<Radio
										value={frequencyType}
										label="Unlimited"
										content={0}
										onChange={(e) => {
											setIsLimited(false);
											setFrequencyType(e);
											setFieldValue(
												'coupon_settings.is_coupon_limited',
												false
											);
										}}
										checked={!isLimited ? true : false}
										labelStyle={styles.radioLabelStyle}
									/>
									<Radio
										value={frequencyType}
										label="Limited"
										content={1}
										onChange={(e) => {
											setIsLimited(true);
											setFrequencyType(e);
											setFieldValue(
												'coupon_settings.is_coupon_limited',
												true
											);
										}}
										checked={isLimited ? true : false}
										labelStyle={styles.radioLabelStyle}
									/>
								</div>
							</div>
						</div>
						<div>
							<div className={styles.box}>
								{/* <Select
									title={'Number of Times'}
									field={fixedSellingPric
									setField={setFixedSellingPrice}
								/> */}
								<div
									className={`${styles.cpnLabel} ${styles.textMain}`}
								>
									Number of times
								</div>
								<div className="w-full md:w-4/5">
									<Input
										type="number"
										label="Number of Times"
										disabled={!isLimited ? true : false}
										name="no_of_frequency"
										// value={no_of_frequency}
										onChange={(e) =>
											setFieldValue(
												'coupon_settings.no_of_frequency',
												e.target.value
											)
										}
									/>
								</div>
							</div>
							<div>
								<p className={styles.textMain}>
									Limit the usage per customer
								</p>
								<div className={styles.usageLimit}>
									<Radio
										value={usageType}
										content={0}
										onChange={(e) => {
											setIsUsage(false);
											setUsageType(e);
											setFieldValue(
												'coupon_settings.is_usage_limited',
												false
											);
										}}
										checked={!isUsage ? true : false}
										label="Unlimited Use per customer"
										labelStyle={styles.radioLabelStyle}
									/>
									<Radio
										value={usageType}
										label="Coupon can be used how many times by a customer"
										content={1}
										onChange={(e) => {
											setIsUsage(true);
											setUsageType(e);
											setFieldValue(
												'coupon_settings.is_usage_limited',
												true
											);
										}}
										checked={isUsage ? true : false}
										labelStyle={styles.radioLabelStyle}
									/>
								</div>
							</div>
							<div
								className={
									styles.inputGroup + ' w-full md:w-3/4 mt-2'
								}
							>
								<h2 className="text-lg text-base-black-100">
									Number of times coupon can be used per
									customer
								</h2>
								<Input
									type="number"
									placeholder="1"
									name="no_of_usage"
									// value={no_of_usage}
									disabled={isUsage ? false : true}
									onChange={(e) =>
										setFieldValue(
											'coupon_settings.no_of_usage',
											e.target.value
										)
									}
								/>
							</div>
							{/* <div className={styles.box}>
								<p className={styles.textMain}>
									Number of times coupon can be used per
									customer
								</p>
								<div className="w-full md:w-3/5">
									<Select
										field={''}
										setField={''}
										defaultValue={'1'}
										placeholder="1"
										onChange={(e) => ''}
										style={{
											width: '100%',
											borderRadius: '8px',
										}}
									>
										<Option value="1">1</Option>
										<Option value="2">2</Option>
										<Option value="3">3</Option>
										<Option value="4">4</Option>
									</Select>
								</div>
							</div> */}
						</div>
						{/* <div className=" w-full md:w-4/5">
							<div className={`${styles.discount}`}>
								<div className={`${styles.settingsSubLabel}`}>
									Also apply the Discount when theeee
									SUBSCRIPTION is renewed for a membership
									digital product(s) bought with the coupon
								</div>
								<div className="flex">
									<Switch
										// onChange={(e) => {
										//
										// }}
										checked={false}
									/>
									<span className="pl-6 font-semibold text-black-100">
										{'OFF'}
									</span>
								</div>
							</div>
						</div> */}

						{/* start of implementation */}
						{/* <div className="flex flex-col mt-8">
							<h2 className="font-semib5old text-base">
								Limit the Frequency of the Coupon
							</h2>
							<div className="flex items-center mb-1">
								<div>
									<Radio
										value={frequencyType}
										label="Unlimited"
										content={0}
										onChange={(e) => {
											setIsLimited(false);
											setFrequencyType(e);
											setFieldValue(
												'coupon_settings.is_coupon_limited',
												false
											);
										}}
										checked={!isLimited ? true : false}
										labelStyle={styles.radioLabelStyle}
									></Radio>
								</div>
								<div className="ml-5">
									<Radio
										// className={styles.radioLabelStyle}
										value={frequencyType}
										label="Limited"
										content={1}
										onChange={(e) => {
											setIsLimited(true);
											setFrequencyType(e);
											setFieldValue(
												'coupon_settings.is_coupon_limited',
												true
											);
										}}
										checked={isLimited ? true : false}
										labelStyle={styles.radioLabelStyle}
									></Radio>
								</div>
							</div>
							<div className={styles.inputGroup + ' w-3/4'}>
								<h2 className="text-lg text-base-black-100">
									Number of Times
								</h2>
								<Input
									type="number"
									label="Number of Times"
									disabled={!isLimited ? true : false}
									name="no_of_frequency"
									// value={no_of_frequency}
									onChange={(e) =>
										setFieldValue(
											'coupon_settings.no_of_frequency',
											e.target.value
										)
									}
								/>
							</div>
						</div> */}

						{/* <div className="flex flex-col mt-8">
							<h2 className="font-semibold text-base">
								Limit the Usage per Customer
							</h2>
							<div className="flex items-center mb-1">
								<div>
									<Radio
										// className={styles.radioContent}
										value={usageType}
										label="Unlimited use per Customer"
										content={0}
										onChange={(e) => {
											setIsUsage(false);
											setUsageType(e);
											setFieldValue(
												'coupon_settings.is_usage_limited',
												false
											);
										}}
										checked={!isUsage ? true : false}
									>
										Unlimited use per Customer
									</Radio>
								</div>
								<div className="ml-5">
									<Radio
										// className={styles.radioContent}
										value={usageType}
										label="Coupon can be used how many times by a customer"
										content={1}
										onChange={(e) => {
											setIsUsage(true);
											setUsageType(e);
											setFieldValue(
												'coupon_settings.is_usage_limited',
												true
											);
										}}
										checked={isUsage ? true : false}
									>
										Coupon can be used how many times by a
										customer
									</Radio>
								</div>
							</div>
							<div className={styles.inputGroup + ' w-3/4 mt-2'}>
								<h2 className="text-lg text-base-black-100">
									Number of times coupon can be used per
									customer
								</h2>
								<Input
									type="number"
									placeholder="1"
									name="no_of_usage"
									// value={no_of_usage}
									disabled={isUsage ? false : true}
									onChange={(e) =>
										setFieldValue(
											'coupon_settings.no_of_usage',
											e.target.value
										)
									}
								/>
							</div>
						</div> */}

						<div className={styles.switchContent}>
							<h2 className={styles.label}>
								Also apply the Discount when the SUBSCRIPTION is
								renewed for any membership digital product(s)
								bought with the coupon
							</h2>
							<span className="flex items-center gap-3">
								<Switch
									onChange={(e) =>
										setIsApplied((value) => !value)
									}
								/>{' '}
								<h3 className="mb-0">
									{isApplied ? 'ON' : 'OFF'}
								</h3>
							</span>
						</div>
					</div>
				)}

				{productType === 'Membership' && (
					<div>
						<div className="mt-4 flex items-center">
							<h1 className="text-base">Billing Frequency</h1>
							<p className="text-gray-400 ml-4 mt-2">
								Set how frequently customers should be charged
								for this membership.
							</p>
						</div>
						{/* <Select
							placeholder='custom'
							className='w-1/2'
						/> */}
						<Select
							defaultValue="custom"
							size="large"
							className="w-1/2 text-lg mb-2 rounded-lg"
							value={duration}
							options={durationOptions}
							onChange={handleSelect(
								'billing_frequency_duration'
							)}
						/>

						{duration === 'custom' && (
							<div className="py-4 px-2 bg-gray-50 w-full">
								<h1 className="text-lg">
									Custom Billing interval
								</h1>
								<div className="flex items-center">
									<p className="text-gray-400 text-base mt-2">
										Billed Every
									</p>
									<Input
										type="number"
										placeholder="0"
										// className="w-24"
										name="custom_billing_duration"
										onChange={formik.handleChange}
										style={{
											width: '60px',
											marginLeft: '10px',
											marginRight: '5px',
										}}
									/>
									<Select
										defaultValue="days"
										className="w-24"
										options={billedEveryDuration}
										onChange={handleBilledSelect(
											'billed_every_duration_length'
										)}
									/>
								</div>
							</div>
						)}

						<div className="mt-4 flex items-center">
							<h1 className="text-base">Subscription Length</h1>
							<p className="text-gray-400 ml-4 mt-2">
								Set number of times subscribers will be charged
								for this membership.
							</p>
						</div>

						<div className="flex items-center mb-1">
							<div>
								<Radio
									value={billingFrequency}
									label="Until the subscriber cancels"
									content={0}
									onChange={(e) => {
										setBilled(false);
										setBillingFrequency(e);
										setFieldValue(
											'isUnlimited_billing',
											false
										);
									}}
									checked={!billed ? true : false}
									labelStyle={styles.radioLabelStyle}
								></Radio>
							</div>
							<div className="ml-5">
								<Radio
									// className={styles.radioLabelStyle}
									value={billingFrequency}
									label="Fixed number of payments"
									content={1}
									onChange={(e) => {
										setBilled(true);
										setBillingFrequency(e);
										setFieldValue(
											'is_fixed_number_of_payments',
											true
										);
									}}
									checked={billed ? true : false}
									labelStyle={styles.radioLabelStyle}
								></Radio>
							</div>
						</div>

						<div className={styles.inputGroup + ' w-3/4'}>
							<h2 className="text-lg text-base-black-100">
								Number of Times
							</h2>
							<Input
								type="number"
								label="no_of_subcription_length_times"
								disabled={!billed ? true : false}
								name="no_of_subcription_length_times"
								className="w-3/4"
								// value={no_of_billed_times}
								onChange={(e) =>
									setFieldValue(
										'no_of_subcription_length_times',
										e.target.value
									)
								}
							/>
						</div>
					</div>
				)}

				<h2 className={`mt-6 ${styles.settingsLabel}`}>Settings</h2>
				<div className="grey-bg bg-base-white-100 px-6 py-8 rounded-lg mt-3 lg:w-11/12">
					<div
						className={`flex justify-between items-center w-full lg:w-3/4 pt-4 `}
					>
						<div className={`${styles.settingsSubLabel}`}>
							Allow Affiliates to Market Product
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setAllowAffiliateMarket((value) => !value);
								}}
								checked={allowAffiliateMarket}
							/>
							<span className="pl-6 font-semibold text-black-100">
								{allowAffiliateMarket ? 'ON' : 'OFF'}
							</span>
						</div>
					</div>

					{allowAffiliateMarket && (
						<>
							<div className={styles.affilateUpload}>
								<div className="flex items-start justify-between">
									<h2 className="mb-0 text-base">
										{' '}
										How much percentage are you willing to
										pay affiliate
										<p
											className={`${styles.commisionAllowed
												} ${afiliatePercentage === ''
													? styles.show
													: ''
												}`}
										>
											Commission Percentage value should
											be between 1 and 100
										</p>
									</h2>
									<div className={styles.affilateInput}>
										<Input
											// type="number"
											type="tel"
											placeholder="0"
											value={afiliatePercentage}
											// pattern="/^([0-1]?[0-9]|100)$/"
											max={100}
											min={1}
											maxLength={3}
											onChange={(e) => {
												const commisionAllowed =
													e.target.value < 101 &&
														!e.target.value.startsWith(
															0
														)
														? e.target.value.replace(
															/[^0-9]/g,
															''
														)
														: '';
												setAfiliatePercentage(
													commisionAllowed
												);
											}}
										/>
										<span>%</span>
									</div>

									{/* <p
										className={`${
											styles.commisionAllowed
										} ${
											afiliatePercentage === ''
												? styles.show
												: ''
										}`}
									>
										Commission Percentage value should be
										between 1 and 100
									</p> */}
								</div>
							</div>
							<div className="flex justify-between items-center w-full lg:w-3/5 pt-4">
								<div className="text-gray-500 font-semibold">
									Upload a Promotional Material for affiliates
								</div>
								<div className="flex">
									<Switch
										onChange={(e) => {
											setUploadPromotionalMaterial(
												(value) => !value
											);
										}}
										checked={uploadPromotionalMaterial}
									/>
									<span className="pl-6 font-semibold text-black-100">
										{uploadPromotionalMaterial
											? 'ON'
											: 'OFF'}
									</span>
								</div>
							</div>

							{/* new div */}
							{mainFile.length > 0 &&
								mainFile.map((item, index) => (
									<div
										key={index}
										className={
											styles.fileUpload +
											' flex flex-col my-3'
										}
									>
										<p className="mb-3">
											{progress !== 100
												? 'Uploading'
												: 'Content Uploaded Successfully'}{' '}
											({progress && <>{progress}</>})%
										</p>
										<div
											key={index}
											className={
												styles.uploaded +
												' w-full rounded-md'
											}
										>
											{progress !== 100 && <span></span>}
											<div className="flex items-center">
												<div
													className="mr-4 flex items-center justify-center"
													style={{
														width: '48px',
														height: '48px',
														background: '#0072EF',
														borderRadius: '8px',
													}}
												>
													<Image
														src={
															item.file.type.includes(
																'video'
															)
																? Video
																: item.file.type.includes(
																	'audio'
																)
																	? Audio
																	: FileZip
														}
														alt="zip"
													/>
												</div>
												<div className="flex flex-col">
													<h2 className="mb-3 text-base font-bold">
														{item.file.name}
													</h2>
													<div className="flex justify-between pr-5">
														<p className="mb-0">{`${(
															item.file.size /
															(1024 * 1024)
														).toFixed()}MB`}</p>
														<span
															onClick={() =>
																handleDeleteFile(
																	index
																)
															}
															className={
																styles.deleteFile +
																' flex items-center justify-center cursor-pointer'
															}
														>
															<Image
																src={FileDelete}
																alt="delete"
																width={20}
																height={20}
															/>
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}

							{uploadPromotionalMaterial && (
								<div className="pt-2 w-3/5">
									<p className="text-base-gray-200 text-xs">
										Only one file is allowed to be uploaded.
										Bundle all your files into single RAR or
										ZIP file. <br /> The maximum allowed
										file size is 1GB.
									</p>

									<div
										className={`${styles.contentFileUpload
											} ${promotionalMaterial?.length > 0 &&
											styles.activeUpload
											}`}
										{...getRootProps()}
									>
										<input {...getInputProps()} />
										<Image
											src={CloudUpload}
											alt="upload image"
										/>
										<p className="hidden md:block text-primary-blue text-sm pl-4 my-auto">
											Drag and Drop or Upload your product
											files
										</p>
										<p className="md:hidden text-primary-blue text-sm pl-4 my-auto">
											Upload your product files
										</p>
									</div>
								</div>
							)}
						</>
					)}

					<div className="flex justify-between items-center w-full lg:w-3/4 pt-4">
						<div className={`${styles.settingsSubLabel}`}>
							Limit Product Sales
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setLimitProductSale((value) => !value);
								}}
								checked={limitProductSale}
							/>
							<span className="pl-6 font-semibold text-black-100">
								{limitProductSale ? 'ON' : 'OFF'}
							</span>
						</div>
					</div>

					{limitProductSale && (
						<div
							className={
								'items-center mt-2 flex justify-between pt-3 w-2/3'
							}
						>
							<h2 className="text-base-gray-200 mb-0 font-medium text-base">
								Product Sales Limit
							</h2>
							<Input
								placeholder="Enter Limit"
								onChange={(e) =>
									setNumberOfLimit(e.target.value)
								}
								value={numberOfLimit}
								className={styles.limitProductInput}
							/>
						</div>
					)}

					<div className="flex justify-between items-center w-full lg:w-3/4 pt-4">
						<div className={`${styles.settingsSubLabel}`}>
							Publicly Show Total Sales on Store Page
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setShowTotalSales((value) => !value);
								}}
								checked={showTotalSales}
							/>
							<span className="pl-6 font-semibold text-black-100">
								{showTotalSales ? 'ON' : 'OFF'}
							</span>
						</div>
					</div>

					<div className="flex justify-between items-center w-full lg:w-3/4 pt-4">
						<div className={`${styles.settingsSubLabel}`}>
							Buyer Pays for Transaction Fee
						</div>
						<div className="flex">
							<Switch
								onChange={(e) => {
									setBuyerPaysTransactionFee(
										(value) => !value
									);
								}}
								checked={buyerPaysTransactionFee}
							/>
							<span className="pl-6 font-semibold text-black-100">
								{buyerPaysTransactionFee ? 'ON' : 'OFF'}
							</span>
						</div>
					</div>
				</div>

				<div className={styles.digitalBtn}>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						// disabled={(compareToPrice && noMatchingCurrency) || !isOpMoreThanSp}
						disabled={disableButton() || isGreaterthanSug}
					>
						{productType === 'Digital Download'
							? 'Save and Preview'
							: 'Save and Continue'}
					</Button>
				</div>
			</div>
		</Form>
	);
};
