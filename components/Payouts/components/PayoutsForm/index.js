import {useState} from 'react';
import Image from 'next/image';
import {useDispatch} from 'react-redux';
import {Typography, Form, Select, Input, Button} from 'antd';
import {Formik} from 'formik';
import PayoutsFormWarning from '../PayoutsFormWarning';
import {
	accountNumberHandler,
	bankHandler,
	banksCB,
	countryHandler,
	createSubmitHandler,
	isValidCB,
	paypalCB,
	validateAccountOnBlur,
} from 'components/Payouts/utils/payoutsFormCBs';
import {PayoutFormValidator} from 'validation/PayoutForm.validation';
import styles from './index.module.scss';

const {Text} = Typography;
const {Option} = Select;

const PayoutsForm = ({
	hideModal,
	showSuccessModal,
	countries,
	banksByCountryId,
	bankDetails,
}) => {
	const [banksLoading, setBanksLoading] = useState(false);
	const [validating, setValidating] = useState(false);
	// const [isValid, setIsValid] = useState(() => isValidCB(bankDetails));
	const [paypal, setPaypal] = useState(() => paypalCB(bankDetails));
	const [banks, setBanks] = useState(() => {
		return banksCB(bankDetails, banksByCountryId);
	});

	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const submitHandler = createSubmitHandler({
		dispatch,
		countries,
		banks,
		hideModal,
		showSuccessModal,
	});

	return (
		<Formik
			initialValues={{
				country: bankDetails ? +bankDetails.country_id : 0,
				paypal_email: bankDetails?.account_name || '',
				bank: bankDetails ? +bankDetails.bank_id : 0,
				account_number: bankDetails?.account_number || '',
				account_name: bankDetails?.account_name || '',
				password: '',
			}}
			validationSchema={PayoutFormValidator}
			onSubmit={submitHandler}
		>
			{(formik) => (
				<Form
					form={form}
					className={styles.form}
					layout="vertical"
					size="large"
					onFinish={formik.handleSubmit}
					initialValues={{
						country: formik.values.country || null,
						paypal_email: formik.values.paypal_email,
						bank: formik.values.bank || null,
						account_number: formik.values.account_number,
						account_name: formik.values.account_name,
					}}
				>
					<Form.Item
						name="country"
						label="Select Country"
						validateStatus={
							formik.touched.country &&
							formik.errors.country &&
							'error'
						}
						help={formik.touched.country && formik.errors.country}
					>
						<Select
							showSearch
							autoComplete="country"
							placeholder="Nigeria"
							onChange={(value) =>
								countryHandler({
									value,
									formik,
									setPaypal,
									banksByCountryId,
									setBanks,
									setBanksLoading,
									dispatch,
									countries,
								})
							}
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.title
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							filterSort={(optionA, optionB) =>
								optionA.title
									.toLowerCase()
									.localeCompare(optionB.title.toLowerCase())
							}
							onBlur={formik.handleBlur}
							value={formik.values.country}
							// disabled={!!bankDetails}
						>
							{countries.map((country) => (
								<Option
									key={country.id}
									value={country.id}
									className={styles.countries__options}
									title={country.name}
								>
									{country.flag && (
										<Image
											src={country.flag}
											alt={`Flag of ${country.name}`}
											width={40}
											height={30}
											className={styles.option__icon}
										/>
									)}
									&nbsp;&nbsp;
									{country.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					{paypal ? (
						<Form.Item
							name="paypal_email"
							label="PayPal Email"
							validateStatus={
								formik.touched.paypal_email &&
								formik.errors.paypal_email &&
								'error'
							}
							help={
								formik.touched.paypal_email &&
								formik.errors.paypal_email
							}
						>
							<Input
								autoComplete="off"
								type="email"
								placeholder="Enter PayPal email"
								{...formik.getFieldProps('paypal_email')}
							/>
						</Form.Item>
					) : (
						<>
							<Form.Item
								name="bank"
								label="Select Bank"
								validateStatus={
									formik.touched.bank &&
									formik.errors.bank &&
									'error'
								}
								help={formik.touched.bank && formik.errors.bank}
							>
								<Select
									showSearch
									autoComplete="bank"
									placeholder="Choose bank"
									onChange={(value) =>
										bankHandler(value, formik)
									}
									onBlur={(e) => {
										validateAccountOnBlur({
											e,
											formik,
											form,
											banks,
											setValidating,
											// setIsValid,
										});
									}}
									value={formik.values.bank}
									loading={banksLoading}
									disabled={banksLoading}
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(
												optionB.children.toLowerCase()
											)
									}
								>
									{banks.map((bank) => (
										<Option key={bank.id} value={bank.id}>
											{bank.name}
										</Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								name="account_number"
								label="Account Number"
								validateStatus={
									formik.touched.account_number &&
									formik.errors.account_number &&
									'error'
								}
								help={
									formik.touched.account_number &&
									formik.errors.account_number
								}
							>
								<Input
									autoComplete="off"
									placeholder="Enter account number"
									onChange={(e) =>
										accountNumberHandler(e, formik, form)
									}
									onBlur={(e) => {
										validateAccountOnBlur({
											e,
											formik,
											form,
											banks,
											setValidating,
											// setIsValid,
										});
									}}
									value={formik.values.account_number}
								/>
							</Form.Item>
							<Form.Item
								name="account_name"
								label="Account Name"
								validateStatus={
									formik.touched.account_name &&
									formik.errors.account_name
										? 'error'
										: validating
										? 'validating'
										: 'success'
								}
								hasFeedback={validating}
								help={
									formik.touched.account_name &&
									formik.errors.account_name
								}
							>
								<Input
									autoComplete="off"
									placeholder="Enter account name"
									// disabled={isValid}
									{...formik.getFieldProps('account_name')}
								/>
							</Form.Item>
						</>
					)}
					<PayoutsFormWarning />
					<Form.Item
						name="password"
						label="Enter Your Current Password"
						validateStatus={
							formik.touched.password &&
							formik.errors.password &&
							'error'
						}
						help={formik.touched.password && formik.errors.password}
					>
						<Input
							type="password"
							autoComplete="new-password"
							placeholder="****************"
							{...formik.getFieldProps('password')}
						/>
					</Form.Item>
					<div className={styles.text}>
						<Text>Finished adding your account details?</Text>
					</div>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={formik.isSubmitting}
						>
							{bankDetails ? 'Edit' : 'Save'} Bank Info
						</Button>
					</Form.Item>
				</Form>
			)}
		</Formik>
	);
};

export default PayoutsForm;
