import {useFormik} from 'formik';
import styles from './CreateCouponForm.module.scss';
import style from '../../public/css/AllProducts.module.scss';
import {TextInput} from '../../components/inputPack';
import {CreateCouponSchema} from '../../validation/CreateCoupon.validation';
import {Radio} from 'antd';
import {useState, useEffect, useMemo} from 'react';
import {Input, Switch, Select, Button} from 'antd';
import {useSelector} from 'react-redux';
import {GetCouponProducts} from 'redux/actions';
import Image from 'next/image';
import {ErrorIcon} from 'utils';
import {CreateCoupon, GetCoupons} from 'redux/actions';
import {useRouter} from 'next/router';

export const pathName = typeof window !== 'undefined' && window;

export const EditCouponForm = () => {
	const [isAllProduct, setIsAllProduct] = useState();
	const [productData, setProductData] = useState([]);
	const [isApplied, setIsApplied] = useState(false);
	const {couponProducts} = useSelector((state) => state.product);
	const {loading, coupons} = useSelector((state) => state.coupon);

	const {store} = useSelector((state) => state.store);
	const router = useRouter();
	const getCouponProducts = GetCouponProducts();
	const createCoupon = CreateCoupon();
	const getCoupon = GetCoupons();

	const couponId = pathName.localStorage?.getItem('couponId');

	const updateCouponData = coupons.filter(
		(item) => item.coupons.id == couponId
	);

	const [isPercentage, setIsPercentage] = useState(
		updateCouponData[0]?.coupons?.is_percentage
	);
	const [isLimited, setIsLimited] = useState(
		updateCouponData[0]?.coupons?.is_coupon_limited
	);
	const [isUsage, setIsUsage] = useState(
		updateCouponData[0]?.coupons?.is_usage_limited_per_customer
	);

	const isdefaultRadioValue =
		updateCouponData[0]?.coupons?.is_for_all_product;

	const initialValues = {
		coupon_settings: {
			coupon_code: '',
			is_coupon: true,
			start_date: '',
			// is_for_all_product: true
			end_date: '',
			fixed_amount_value:
				updateCouponData[0]?.coupons?.fixed_amount_value || '',
			// product_id: '',
			percentage_value:
				updateCouponData[0]?.coupons?.percentage_value || '',
			is_percentage: true,
			is_fixed_amount: false,
			is_coupon_limited: false,
			no_of_frequency:
				updateCouponData[0]?.coupons?.no_of_frequency || '',
			is_usage_limited: false,
			no_of_usage: updateCouponData[0]?.coupons?.no_of_usage || '',
			is_apply_to_recurring: false,
		},
		action: 'e',
		coupon_id: couponId || 0,
		isBasicPlan: false,
	};
	const handleSubmit = (data) => {
		// if (data?.coupon_settings.is_for_all_product) {
		// 	delete data.coupon_settings.product_id;
		// }
		if (data?.coupon_settings.is_percentage) {
			delete data.coupon_settings.fixed_amount_value;
		} else if (data.coupon_settings.is_fixed_amount) {
			delete data.coupon_settings.percentage_value;
		}
		if (!data.coupon_settings.is_coupon_limited) {
			delete data.coupon_settings.no_of_frequency;
		}
		if (!data.coupon_settings.is_usage_limited) {
			delete data.coupon_settings.no_of_usage;
		}
		if (!data.coupon_settings.start_date) {
			delete data.coupon_settings.start_date;
			const day = new Date().toISOString();
			data.coupon_settings.start_date = day;
		}
		if (!data.coupon_settings.end_date) {
			const day = new Date(
				new Date().getTime() + 5 * 24 * 60 * 60 * 1000
			).toISOString();
			data.coupon_settings.end_date = day;
		}
		delete data.isBasicPlan;
		createCoupon(data, () =>
			router.push('/account/kreator/products/coupons')
		);
	};

	// const productList = useMemo(
	// 	() =>
	// 		productData?.map((item) => ({
	// 			value: item?.id,
	// 			label: item?.product_name,
	// 		})),
	// 	[productData]
	// );

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: CreateCouponSchema,
		validateOnChange: false,
	});
	const {errors, values, setFieldValue} = formik;
	const {
		coupon_code,
		fixed_amount_value,
		no_of_usage,
		no_of_frequency,
		percentage_value,
		start_date,
		end_date,
	} = values.coupon_settings;
	// const handleRadioChange = (e) => {
	// 	if (e.target.value === true) {
	// 		setFieldValue('coupon_settings.is_for_all_product', true);
	// 		setFieldValue('coupon_settings.product_id', 0);
	// 		setIsAllProduct(true);
	// 		return;
	// 	}
	// 	setFieldValue('coupon_settings.is_for_all_product', false);
	// 	setIsAllProduct(false);
	// };
	useEffect(() => {
		getCouponProducts();
		getCoupon();
		setFieldValue(
			'coupon_settings.coupon_code',
			updateCouponData[0]?.coupons?.coupon_code
		);
	}, []);

	useEffect(() => {
		setProductData(couponProducts);
	}, [couponProducts]);

	useEffect(() => {
		setFieldValue('coupon_settings.is_apply_to_recurring', isApplied);
	}, [isApplied]);

	useEffect(() => {
		if (updateCouponData.length > 0) {
			setFieldValue(
				'coupon_settings.coupon_code',
				updateCouponData[0]?.coupons?.coupon_code
			);
			// setFieldValue('coupon_settings.is_coupon', '');
			setFieldValue(
				'coupon_settings.start_date',
				updateCouponData[0]?.coupons?.start_date
			);
			setFieldValue(
				'coupon_settings.end_date',
				updateCouponData[0]?.coupons?.end_date
			);
			setFieldValue(
				'coupon_settings.fixed_amount_value',
				updateCouponData[0]?.coupons?.fixed_amount_value
			);
			setFieldValue(
				'coupon_settings.percentage_value',
				updateCouponData[0]?.coupons?.percentage_value
			);
			setFieldValue(
				'coupon_settings.is_percentage',
				updateCouponData[0]?.coupons?.is_percentage
			);
			setFieldValue(
				'coupon_settings.is_fixed_amount',
				updateCouponData[0]?.coupons?.is_fixed_amount
			);
			setFieldValue(
				'coupon_settings.is_coupon_limited',
				updateCouponData[0]?.coupons?.is_coupon_limited
			);
			setFieldValue(
				'coupon_settings.no_of_frequency',
				updateCouponData[0]?.coupons?.number_of_usages
			);
			setFieldValue(
				'coupon_settings.is_usage_limited',
				updateCouponData[0]?.coupons?.is_usage_limited_per_customer
			);
			setFieldValue(
				'coupon_settings.no_of_usage',
				updateCouponData[0]?.coupons?.number_of_customer_usages
			);
			setFieldValue(
				'coupon_settings.is_apply_to_recurring',
				updateCouponData[0]?.coupons?.can_be_on_recurring_payment
			);
			setFieldValue('action', 'e');
			setFieldValue('coupon_id', updateCouponData[0]?.coupons?.id);
			setIsPercentage(updateCouponData[0]?.coupons?.is_percentage);
			setIsLimited(updateCouponData[0]?.coupons?.is_coupon_limited);
			setIsUsage(
				updateCouponData[0]?.coupons?.is_usage_limited_per_customer
			);

			// setFieldValue('isBasicPlan', '');
		}
	}, [updateCouponData.length]);

	useEffect(() => {
		if (Object.keys(store).length > 0) {
			const {user} = store;
			if (user.user_plan === 'Basic') {
				setFieldValue('isBasicPlan', true);
			}
			return () => {
				setFieldValue('isBasicPlan', false);
			};
		}
	}, [store]);

	return (
		<div className={`px-0 lg:px-8 ${styles.container}`}>
			<div className="flex flex-col items-start">
				<h1
					className={`font-bold text-center text-2xl ${styles.title}`}
				>
					Update your coupon
				</h1>
				<h3
					className={
						style.lightGrey +
						` font-semibold text-center text-base ${styles.subtitle}`
					}
				>
					Make little tweaks to change how your coupon is used.
				</h3>
			</div>
			<form
				onSubmit={formik.handleSubmit}
				className={styles.formContent + ' flex flex-col'}
			>
				<div className="">
					<TextInput
						type="text"
						label="Coupon Code"
						labelExtra=" Letters and Numbers only!."
						style={{width: '100%'}}
						// placeholder={updateCouponData[0]?.coupons?.coupon_code}
						name="coupon_settings.coupon_code"
						disabled
						onChange={(e) =>
							setFieldValue(
								'coupon_settings.coupon_code',
								e?.toUpperCase()
							)
						}
						value={values?.coupon_settings?.coupon_code}
					/>
				</div>
				<div className="flex flex-col mt-8">
					<h2 className={`font-semibold text-base ${styles.labelV2}`}>
						Apply Coupon to
					</h2>
					<div className="flex items-center">
						<Radio.Group
							defaultValue={
								isdefaultRadioValue === true ? true : false
							}
							// onChange={handleRadioChange}
						>
							<Radio
								className={styles.radioContent}
								value={true}
								disabled
								// checked={isAllProduct ? true : false}
							>
								All Products
							</Radio>
							<Radio
								className={styles.radioContent}
								value={false}
								disabled
								// checked={!isAllProduct ? true : false}
							>
								Choose Specific Product
							</Radio>
						</Radio.Group>
					</div>

					<Select
						showSearch
						optionFilterProp="children"
						name="product_id"
						placeholder={
							updateCouponData[0]?.coupons?.product_name ||
							'All products'
						}
						disabled
						// onChange={(e) =>
						// 	setFieldValue('coupon_settings.product_id', e)
						// }
						// filterOption={(input, option) => {
						// 	return option.label
						// 		.toLowerCase()
						// 		.includes(input.toLowerCase());
						// }}
						// disabled={isAllProduct ? true : false}
						// options={productList}
						className={styles.selectField}
					/>
				</div>

				<div className="flex flex-col mt-5">
					<h2 className={`font-semibold text-base ${styles.labelV2}`}>
						Coupon Type
					</h2>
					<div className="flex">
						<div className="col-3">
							<Radio
								className={styles.radioContent}
								onClick={() => {
									setIsPercentage(true);
									setFieldValue(
										'coupon_settings.is_percentage',
										true
									);
									setFieldValue(
										'coupon_settings.is_fixed_amount',
										false
									);
								}}
								checked={isPercentage ? true : false}
							>
								Percentage Off
							</Radio>
							<div className={styles.inputGroup + ' w-full mt-2'}>
								<Input
									type="number"
									name="coupon_settings.percentage_value"
									onChange={formik.handleChange}
									disabled={!isPercentage ? true : false}
									value={
										values?.coupon_settings
											?.percentage_value
									}
									// placeholder={
									// 	updateCouponData[0]?.coupons
									// 		?.percentage_value || '0'
									// }
									// value={percentage_value}
								/>
							</div>
						</div>
						<div className="col-3 ml-8">
							<Radio
								className={styles.radioContent}
								onClick={() => {
									setIsPercentage(false);
									setFieldValue(
										'coupon_settings.is_percentage',
										false
									);
									setFieldValue(
										'coupon_settings.is_fixed_amount',
										true
									);
								}}
								checked={!isPercentage ? true : false}
							>
								Amount Off
							</Radio>
							<div className={styles.inputGroup + ' w-full mt-2'}>
								<Input
									type="number"
									// placeholder={
									// 	updateCouponData[0]?.coupons
									// 		?.fixed_amount_value || '0'
									// }
									name="coupon_settings.fixed_amount_value"
									value={
										values?.coupon_settings
											?.fixed_amount_value
									}
									disabled={isPercentage ? true : false}
									onChange={formik.handleChange}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={`flex items-center mt-8 mb-3 ${styles.wrap}`}>
					<div className={`pt-1 w-full flex items-center`}>
						<h2 className={styles.label}>From</h2>
						<div className={styles.inputGroup /*+"  w-3/5"*/}>
							<Input
								type="datetime-local"
								name="coupon_settings.start_date"
								onChange={formik.handleChange}
								value={values?.coupon_settings.start_date}
							/>
						</div>
					</div>
					<div className={`pt-1 w-full flex items-center`}>
						<h2 className={styles.label}>To</h2>
						<div
							className={`${styles.inputGroup} ${styles.group2} `}
						>
							<Input
								type="datetime-local"
								name="coupon_settings.end_date"
								onChange={formik.handleChange}
								value={values?.coupon_settings.end_date}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col mt-8">
					<h2 className="font-semib5old text-base">
						Limit the Frequency of the Coupon
					</h2>
					<div className="flex items-center mt-2 mb-4">
						<div>
							<Radio
								className={styles.radioContent}
								onClick={() => {
									setIsLimited(false);
									setFieldValue(
										'coupon_settings.is_coupon_limited',
										false
									);
								}}
								checked={!isLimited ? true : false}
							>
								Unlimited
							</Radio>
						</div>
						<div className="ml-5">
							<Radio
								className={styles.radioContent}
								onClick={() => {
									setIsLimited(true);
									setFieldValue(
										'coupon_settings.is_coupon_limited',
										true
									);
								}}
								checked={isLimited ? true : false}
							>
								Limited
							</Radio>
						</div>
					</div>
					<div className={styles.inputGroup + ' w-full mt-2'}>
						<h2 className="text-lg text-base-black-100">
							Number of Times
						</h2>
						<Input
							// type="number"
							// placeholder={
							// 	updateCouponData[0]?.coupons
							// 		?.number_of_usages || '0'
							// }
							label="Number of Times"
							disabled={!isLimited ? true : false}
							name="coupon_settings.no_of_frequency"
							value={values?.coupon_settings?.no_of_frequency}
							onChange={formik.handleChange}
						/>
					</div>
				</div>
				<div className="flex flex-col mt-8">
					<h2 className="font-semibold text-base">
						Limit the Usage per Customer
					</h2>
					<div className="flex items-center mb-4">
						<div>
							<Radio
								className={styles.radioContent}
								onClick={() => {
									setIsUsage(false);
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
								className={styles.radioContent}
								onClick={() => {
									setIsUsage(true);
									setFieldValue(
										'coupon_settings.is_usage_limited',
										true
									);
								}}
								checked={isUsage ? true : false}
							>
								Coupon can be used how many times by a customer
							</Radio>
						</div>
					</div>
					<div className={styles.inputGroup + ' w-full mt-2'}>
						<h2 className="text-lg text-base-black-100">
							Number of times coupon can be used per customer
						</h2>
						<Input
							type="number"
							// placeholder={
							// 	updateCouponData[0]?.coupons
							// 		?.number_of_customer_usages || '0'
							// }
							name="coupon_settings.no_of_usage"
							value={values?.coupon_settings.no_of_usage}
							disabled={isUsage ? false : true}
							onChange={formik.handleChange}
						/>
					</div>
				</div>
				<div className={styles.switchContent}>
					<h2 className={styles.label}>
						Also apply the Discount when the SUBSCRIPTION is renewed
						for any membership digital product(s) bought with the
						coupon
					</h2>
					<span className="flex items-center gap-3">
						<Switch
							onChange={(e) => setIsApplied((value) => !value)}
						/>{' '}
						<h3 className="mb-0">{isApplied ? 'ON' : 'OFF'}</h3>
					</span>
				</div>
				<div className="my-2">
					{Object.keys(errors).length > 0 &&
						Object.entries(errors).map((items, index) => {
							if (typeof items[1] === 'string') {
								return (
									<div
										key={index}
										className={
											styles.errorContent + ' h-10'
										}
									>
										<div
											style={{
												width: '25px',
												height: '25px',
											}}
										>
											<Image
												width={100}
												height={100}
												src={ErrorIcon}
												alt="error"
											/>
										</div>
										<h2 className="text-base font-medium ">
											{items[1]}
										</h2>
									</div>
								);
							}
							for (let values in items[1]) {
								return (
									<div
										key={index}
										className={
											styles.errorContent + ' h-10'
										}
									>
										<div
											style={{
												width: '25px',
												height: '25px',
											}}
										>
											<Image
												width={100}
												height={100}
												src={ErrorIcon}
												alt="error"
											/>
										</div>
										<h2 className="text-base font-medium ">
											{items[1][values]}
										</h2>
									</div>
								);
							}
						})}
				</div>
				<div className={styles.submitBtn}>
					<Button
						label="Save"
						type="primary"
						loading={loading}
						htmlType="submit"
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};
