import axios from 'axios';
import {isAnEmpytyObject, showToast} from 'utils';
import {bankSuccess, updateStore} from 'redux/actions';
import axiosApi from 'utils/axios';

const getData = (dataSet, id) => dataSet.find((item) => item.id === id);

export const isValidCB = (bankDetails) => {
	if (bankDetails) return true;

	return false;
};

export const paypalCB = (bankDetails) => {
	if (
		bankDetails &&
		// bankDetails.country_id !== '1' &&
		// bankDetails.country_id !== '72' &&
		[187, 188, -10].includes(bankDetails.country_id)
	) {
		return true;
	}

	return false;
};

export const banksCB = (bankDetails, banksByCountryId) => {
	if (bankDetails && !isAnEmpytyObject(banksByCountryId)) {
		return banksByCountryId[bankDetails.country_id];
	}

	return [];
};

export const createAccount = ({
	data,
	hideModal,
	showSuccessModal,
	dispatchObj,
	dispatch,
	actions,
}) => {
	axiosApi.request(
		'post',
		`${process.env.BASE_URL}v1/kreatesell/payment/bank-details`,
		(res) => {
			showSuccessModal();
			hideModal();
			dispatch(updateStore(dispatchObj));
		},
		(err) => {
			showToast(err.message, 'error');
			actions.setSubmitting(false);
		},
		data
	);
};

export const countryHandler = async ({
	value,
	formik,
	setPaypal,
	banksByCountryId,
	setBanks,
	setBanksLoading,
	dispatch,
	countries,
	setIsNigerian,
}) => {
	console.log(value, 'valuess');
	formik.setFieldValue('country', value);
	let tempValue = value;
	// change this to only US and UK
	const {short_name} = countries.find((country) => {
		// if value is rest of the world, make it USA's payload
		if (value === -10) tempValue = 188;
		return country?.id === tempValue;
	});

	if (tempValue === 1) {
		setIsNigerian(true);
	} else {
		setIsNigerian(false);
	}

	// US UK and canada are 187 188 34
	if (![187, 188, 34].includes(tempValue)) {
		setPaypal(false);

		if (tempValue in banksByCountryId) {
			setBanks(banksByCountryId[tempValue]);
		} else {
			setBanksLoading(true);

			const banksResponse = await axiosApi.request(
				'get',
				`${process.env.BASE_URL}v1/kreatesell/payment/banks/${short_name}`,
				(res) => {
					// console.log('response is', res);
					return res.data;
				}
			);

			// v1/kreatesell/payment/banks/{countryshortname}
			// console.log('banksResponse', banksResponse);

			// const banksData = banksResponse.data.list_of_banks
			const banksData = banksResponse.data;

			setBanks(banksData);
			dispatch(bankSuccess({id: tempValue, banks: banksData}));
			setBanksLoading(false);
		}
	} else {
		setPaypal(true);
	}
};

export const bankHandler = (value, formik, form) => {
	formik.setFieldValue('bank', value);
};

export const accountNumberHandler = (e, formik, form) => {
	const {value} = e.target;
	const index = value.length - 1;
	const lastCharacter = value.charAt(index);

	if (!/\d/.test(lastCharacter)) {
		const characters = value.slice(0, value.length - 1);

		form.setFieldsValue({account_number: characters});
		formik.setFieldValue('account_number', characters);
		return;
	}

	formik.handleChange(e);
};

export const validateAccountOnBlur = ({
	actNoState,
	formik,
	form,
	banks,
	setValidating,
	// setIsValid,
}) => {
	if (!actNoState) return;
	formik.handleChange(actNoState);
	// only validate if country is Nigeria
	const bankId = formik.values.bank;
	const accountNumber = formik.values.account_number.trim();
	// console.log('bankId', bankId);
	// console.log('banks', banks);
	// console.log(
	// 	'getData(banks, bankId)?.bank_code',
	// 	getData(banks, bankId)?.bank_code
	// );
	// console.log('getData(banks, bankId)?.code', getData(banks, bankId)?.code);
	// only validate if country is Nigeria
	if (formik.values.country === 1) {
		if (!accountNumber || !bankId) return;

		setValidating(true);
		// setIsValid(true);

		axiosApi.request(
			'post',
			`${process.env.BASE_URL}v1/kreatesell/payment/validate-account`,
			(res) => {
				setValidating(false);

				if (res.status === 'error') {
					showToast(
						res.message ||
							'Invalid account number, please check again',
						'warn'
					);
					// setIsValid(false);
					return;
				}

				formik.setFieldValue('account_name', res.data.account_name);
				form.setFieldsValue({account_name: res.data.account_name});
			},
			() => {
				setValidating(false);
				// setIsValid(false);
				showToast('Unable to verify bank account number', 'error');
			},
			{
				account_number: accountNumber,
				account_bank:
					getData(banks, bankId)?.bank_code ||
					getData(banks, bankId)?.code,
			}
		);
	}
};

// export const validateIsmobileMoney =  (value) => {
//    console.log(value, 'lopopopop')
//    return value?.value
// }

// export const validateIsmobileMoney = (value) => {
// 	console.log(value,'vaaaaa')
// 	return value
// }

export const createSubmitHandler = ({
	dispatch,
	countries,
	banks,
	hideModal,
	showSuccessModal,
}) => {
	return (values, actions) => {
		const country = getData(countries, values.country);

		if (values.country === 1) {
			const bank = getData(banks, values.bank);
			axiosApi.request(
				'post',
				`${process.env.BASE_URL}v1/kreatesell/payment/validate-account`,
				(res) => {
					if (res.status === 'error') {
						actions.setFieldError('account_number', res.message);
						actions.setFieldTouched('account_number', true, false);
						actions.setSubmitting(false);
						return;
					}

					const data = {
						country_id: values.country,
						bank_id: values.bank,
						account_number: values.account_number.trim(),
						account_name: values.account_name.trim(),
						password: values.password,
						bank_type: values.bank_type,
					};

					const dispatchObj = {
						bank_name: bank.name,
						bank_id: `${values.bank}`,
						country_id: `${values.country}`,
						country_name: country.name,
						account_name: values.account_name.trim(),
						account_number: values.account_number.trim(),
						bank_type: values.bank_type,
					};

					createAccount({
						data,
						hideModal,
						showSuccessModal,
						dispatchObj,
						dispatch,
						actions,
					});
				},
				() => {
					actions.setFieldError(
						'account_number',
						'Unable to verify bank account number'
					);
					actions.setFieldTouched('account_number', true, false);
					actions.setSubmitting(false);
				},
				{
					account_number: values.account_number.trim(),
					account_bank: bank.code || bank.bank_code,
				}
			);
		} else if (
			values.country === 187 ||
			values.country === 188 ||
			values.country === 34
		) {
			const data = {
				country_id: values.country === -10 ? 188 : values.country,
				account_number: values.paypal_email.trim(),
				account_name: values.paypal_email.trim(),
				password: values.password,
			};

			const dispatchObj = {
				bank_name: 'Paypal',
				bank_id: '194',
				country_id: `${values.country === -10 ? 188 : values.country}`,
				country_name: country.name,
				account_name: values.paypal_email.trim(),
				account_number: values.paypal_email.trim(),
			};

			createAccount({
				data,
				hideModal,
				showSuccessModal,
				dispatchObj,
				dispatch,
				actions,
			});
		} else {
			const bank = getData(banks, values.bank);
			console.log(bank, 'nnnn');
			console.log(bank?.name, ' bank?.name bank?.name');
			const data = {
				country_id: values.country,
				account_number: values.account_number.trim(),
				account_name: values.account_name.trim(),
				password: values.password,
				bank_type: values.bank_type,
				bank_id: values?.bank,
			};

			const dispatchObj = {
				bank_name: bank?.name,
				bank_id: values?.bank,
				country_id: values.country,
				country_name: country.name,
				account_name: values.account_name.trim(),
				account_number: values.account_number.trim(),
				bank_type: values.bank_type,
			};

			createAccount({
				data,
				hideModal,
				showSuccessModal,
				dispatchObj,
				dispatch,
				actions,
			});
		}
	};
};
