import {useState, useEffect} from 'react';
import {Button, Input} from 'components';
import {Switch} from 'antd';
import styles from './Settings.module.scss';
import {useSelector} from 'react-redux';
import {
	GetStoreDetails,
	UpdateStoreSettings,
	UpdateCTAButton,
} from 'redux/actions';
import {RenderIf, _getMyStoreDetails, _getMyStoreUserDetails} from 'utils';
import {showToast} from 'utils';

const StoreSettings = () => {
	const getStoreDetails = GetStoreDetails();
	const updateStoreSettings = UpdateStoreSettings();
	const updateCTAButton = UpdateCTAButton();
	const store = _getMyStoreDetails();
	const userDetails = _getMyStoreUserDetails();

	const {loading} = useSelector((state) => state.store);

	// console.log("store  = ", store?.cta_button);
	const defaultCTA = store?.cta_button;
	// console.log(store);

	

	// console.log(userDetails, 'storeeee');

	const [userStoreSettings, setUserStoreSettings] = useState(() => ({
		enable_disable_tax: store?.customer_pay_tax,
		is_enable_product_cross_sell: store?.is_enable_product_cross_sell,
		is_enable_powered_by_kreatesell: store?.is_powered_by_kreatesell,
	}));

	const [taxValue, setTaxValue] = useState(store?.custom_tax_amount);
	const [errorTax, setErrorTax] = useState(false);

	const {
		enable_disable_tax,
		is_enable_product_cross_sell,
		is_enable_powered_by_kreatesell,
	} = userStoreSettings;

	// console.log(
	// 	is_enable_powered_by_kreatesell,
	// 	'is_enable_powered_by_kreatesellis_enable_powered_by_kreatesell'
	// );

	const [ctaBtnValue, setCtaBtnValue] = useState({
		option: 'store',
		cta_button: defaultCTA || '',
	});

	const handleCTAButton = (e) => {
		e.preventDefault();
		if (errorTax) {
			showToast('Input a valid tax percentage', 'error');
			return;
		}
		const data = {
			option_id: store.store_id,
			option: 'store',
			cta_button: ctaBtnValue?.cta_button || '',
			store_settings: {
				set_context: is_enable_product_cross_sell,
				set_enable_tax: enable_disable_tax,
				custom_tax_amount: taxValue,
				powered_by_kreatesell: is_enable_powered_by_kreatesell,
			},
		};
		!enable_disable_tax && delete data.store_settings.custom_tax_amount;

		updateCTAButton(data, () => {
			getStoreDetails();
		});
	};

	useEffect(() => {
		getStoreDetails();
	}, []);

	useEffect(() => {
		if (taxValue) {
			if ((Number(taxValue) && taxValue < 1) || taxValue > 100) {
				setErrorTax(true);
			} else {
				setErrorTax(false);
			}
		}
	}, [taxValue]);

	const handleChange = (event) => {
		const newValue = event.currentTarget.value;
		if (!isNaN(newValue)) {
			setTaxValue(newValue);
		}
	};

	return (
		<form
			className="bg-white rounded-lg px-3 lg:px-0 py-6 lg:py-0"
			onSubmit={handleCTAButton}
		>
			<div>
				<h3 className="text-black-100 font-medium text-2xl">
					Store Settings
				</h3>
				<p className="text-sm text-base-gray-200 lg:hidden">
					Enable store settings here.
				</p>
			</div>
			<div className="lg:productBorder w-full lg:w-9/12">
				<p className="text-black-100 text-sm md:text-base mb-0">
					Store Checkout Button CTA (Call To Action)
					<>
						{ctaBtnValue?.cta_button?.length === 10 && (
							<span className={styles.charLimit}>
								10 characters limit reached!
							</span>
						)}
					</>
				</p>
				<div className="w-full lg:w-1/2">
					<Input
						placeholder="Checkout Page CTA Button"
						height="small"
						value={ctaBtnValue?.cta_button}
						onChange={(e) => {
							setCtaBtnValue((value) => ({
								...value,
								cta_button: e.target.value,
							}));
						}}
						required
						maxLength={10}
					/>
				</div>
				<p className="text-base-gray-200 text-xs">
					Customize your CTA button with best action requests. i.e. I
					want this! (Kindly leave it blank to use the default BUY NOW
					button.)
				</p>
			</div>

			<div className="flex justify-between items-center w-full lg:w-2/4 pt-4 mt-4">
				<div className="text-black-100 text-base">
					{/* Enable products cross-sell on store product page */}
					Enable cross sell for your buyers
				</div>
				<div className="flex pb-4 md:pb-0">
					<Switch
						checked={userStoreSettings.is_enable_product_cross_sell}
						id="cross_sell"
						onChange={async () => {
							setUserStoreSettings((value) => ({
								...value,
								is_enable_product_cross_sell:
									!value.is_enable_product_cross_sell,
							}));

							// await updateStoreSettings(userStoreSettings, () => {
							// 	getStoreDetails();

							// 	if (!is_enable_product_cross_sell) {
							// 		showToast('Cross-sell activated', 'info');
							// 	} else {
							// 		showToast(
							// 			"Cross-sell deactivated. Buyers won't see your other products!",
							// 			'info'
							// 		);
							// 	}
							// });
						}}
					/>
					<span className="pl-6 text-black-100">
						{userStoreSettings?.is_enable_product_cross_sell
							? 'ON'
							: 'OFF'}
					</span>
				</div>
			</div>
			<p className="text-base-gray-200 text-xs pt-2">
				Switch on to enable cross sell, buyers will get to see other
				products from your store listings when it is on.
			</p>

			<div className="flex justify-between items-center w-full lg:w-2/4 pt-4">
				<div className="text-black-100 text-base">
					Enable Tax on buyer’s checkout
				</div>
				<div className="flex">
					<Switch
						checked={userStoreSettings.enable_disable_tax}
						id="enable_disable_tax"
						onChange={async () => {
							setUserStoreSettings((value) => ({
								...value,
								enable_disable_tax: !value.enable_disable_tax,
							}));
							// await updateStoreSettings(userStoreSettings, () => {
							// 	getStoreDetails();

							// 	if (!enable_disable_tax) {
							// 		showToast(
							// 			'Activated. Fees will now be paid by buyers!',
							// 			'info'
							// 		);
							// 	} else {
							// 		showToast(
							// 			'Deactivated. You now pay the fees!',
							// 			'info'
							// 		);
							// 	}
							// });
						}}
					/>
					<span className="pl-6 text-black-100">
						{userStoreSettings.enable_disable_tax ? 'ON' : 'OFF'}
					</span>
				</div>
			</div>
			<p className="text-base-gray-200 text-xs pt-2">
				By Switching on, your buyers will be responsible for the payment
				of any tax fee imposed by KreateSell.
			</p>
			<RenderIf condition={enable_disable_tax}>
				<>
					<div className="flex justify-between w-6/12 mt-5 items-center">
						<p className="mb-0">Set Custom Tax Amount</p>
						<div
							className={`${styles.affilateInput}`}
							style={{
								width: '155.5px',
							}}
						>
							<Input
								placeholder="Enter Amount"
								type="number"
								height="small"
								// max={100}
								// min={1}
								// maxLength={3}
								value={taxValue}
								onChange={handleChange}
								required={userStoreSettings.enable_disable_tax}
								containerstyle={styles.marginBottomSm}
								className={errorTax && styles.borderRed}
								// containerStyle={{marginBottom: 0}}
								// errorMessage={
								// 	true && 'Tax amount must be between 1 & 100'
								// }
							/>
							<span className={errorTax && styles.errorSpan}>
								%
							</span>
						</div>
					</div>
					<RenderIf condition={errorTax}>
						<div className="flex justify-end w-6/12 items-center">
							<p
								className={`${styles.errorSpan} mb-0 pl-2`}
								style={{
									width: '155.5px',
								}}
							>
								Invalid tax amount
							</p>
						</div>
					</RenderIf>
				</>
			</RenderIf>

			<div className="flex items-center">
				<div className="flex justify-between items-center w-full lg:w-2/4 pt-4 mt-4">
					<div className="text-black-100 text-base">
						Disable Powered by KreateSell
					</div>
					<div className="flex pb-4 md:pb-0">
						<Switch
							checked={
								userStoreSettings.is_enable_powered_by_kreatesell
							}
							disabled={userDetails?.user_plan !== 'Business'}
							id="disable_powered_by_kreatesell"
							onChange={async () => {
								setUserStoreSettings((value) => ({
									...value,
									is_enable_powered_by_kreatesell:
										!value.is_enable_powered_by_kreatesell,
								}));
							}}
						/>
						<div className="pl-6 text-black-100">
							{userStoreSettings?.is_enable_powered_by_kreatesell
								? 'ON'
								: 'OFF'}
						</div>
					</div>
				</div>
				<div className="ml-4 mt-3 bg-green-500 text-white py-1 px-2 uppercase">
					Business
				</div>
			</div>
			<p className="text-base-gray-200 text-xs pt-2">
				Add more personalization to your store by turning off powered by
				kreatesell from the footer of your store and product pages.
			</p>

			<div className="hidden lg:block mt-8 w-1/5">
				<Button
					text="Save Changes"
					bgColor="blue"
					className={styles.btnStyle}
					loading={loading}
					onClick={handleCTAButton}
				/>
			</div>

			<div className="mt-8 w-4/12 lg:hidden">
				<Button
					text="Save Changes"
					bgColor="blue"
					className={styles.btnStyle}
					loading={loading}
					onClick={handleCTAButton}
				/>
			</div>
		</form>
	);
};

export default StoreSettings;
