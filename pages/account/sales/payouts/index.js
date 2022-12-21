import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Image from 'next/image';

import {useSelector} from 'react-redux';
import {Modal, Tabs} from 'antd';
import {useFormik} from 'formik';

import AuthLayout from 'components/authlayout';
import Spinner from 'components/Spinner';
import Payouts from 'components/Payouts/components/Payouts';
import BankAccountDetails from 'components/Payouts/components/BankAccountDetails';
import Wallet from 'components/Payouts/components/Wallet';
import {
	showToast,
	ErrorOutline,
	ChangePasswordModalIcon,
	SuccessCheck,
} from 'utils';
import styles from 'public/css/PayoutsPage.module.scss';
import {PasswordInput, Button} from '../../../../components';
import {createPasswordSchema} from '../../../../validation';
import {ResetPassword} from '../../../../redux/actions';

const {TabPane} = Tabs;

const PayoutsPage = () => {
	const [tab, setTab] = useState('1');
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	const {store, loading} = useSelector((state) => state.store);
	const {bank_details: bankDetails, wallet_details_dtos: walletInfo} = store;

	const handleClick = (key) => {
		setTab(key);
	};

	useEffect(() => {
		if (router.query.redirect) {
			showToast(
				'You have already set up your payout bank account',
				'info'
			);
		}
	}, [router.query.redirect]);

	useEffect(() => {
		if (
			store?.user?.is_social_login &&
			store?.user?.is_required_to_set_password
		) {
			setShowModal(true);
		}
	}, [store]);

	return (
		<AuthLayout>
			<Head>
				<title>KreateSell | Payouts</title>
			</Head>
			{loading ? (
				<Spinner />
			) : (
				<Tabs
					activeKey={tab}
					onTabClick={handleClick}
					centered
					className={styles.tabs}
				>
					<TabPane tab="Payouts" key="1">
						<Payouts
							bankDetails={bankDetails}
							handleClick={handleClick}
						/>
					</TabPane>
					<TabPane tab="Bank Account Details" key="2">
						<BankAccountDetails bankDetails={bankDetails} />
					</TabPane>
					<TabPane tab="Wallet" key="3">
						<Wallet
							bankDetails={bankDetails}
							walletInfo={walletInfo}
							storeLoading={loading}
						/>
					</TabPane>
				</Tabs>
			)}
			<AddPasswordModal {...{showModal, setShowModal}} />
		</AuthLayout>
	);
};

const AddPasswordModal = ({showModal = true, setShowModal}) => {
	const {user} = useSelector((state) => state.auth);

	const resetPassword = ResetPassword();

	const initialValues = {
		username: '',
		password: '',
		confirm_password: '',
	};

	const [isSuccessful, setIsSuccessful] = useState(false);

	const handleSubmitFn = (values) => {
		resetPassword(values, () => {
			setTimeout(() => {
				setIsSuccessful(true);
			}, 500);
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmitFn,
		validationSchema: createPasswordSchema,
		validateOnChange: false,
	});
	const {errors, handleSubmit, /*handleChange,*/ setFieldValue, values} =
		formik;
	useEffect(() => {
		if (user) {
			setFieldValue('username', user?.email);
		}
	}, [user]);

	return (
		<>
			<Modal
				title={null}
				footer={null}
				visible={showModal}
				centered
				maskClosable={false}
				closable={false}
				style={{textAlign: 'center'}}
				className={`${styles.addPasswordModal}`}
				width={700}
			>
				<>
					{!isSuccessful ? (
						<>
							<Image alt="icon" src={ChangePasswordModalIcon} />
							<form
								onSubmit={handleSubmit}
								autoComplete="off"
								className={`mt-5`}
							>
								<h5>Set Up Password</h5>
								<p className={`mb-5`}>
									Your account does not have a password,
									please create one now and have unrestricted
									access.
								</p>
								{!!errors.confirm_password && (
									<div className={`${styles.error} flex`}>
										<Image
											alt="error icon"
											src={ErrorOutline}
										/>
										<p className="mb-0">
											Passwords do not match. Ensure you
											input the same password in both
											boxes.
										</p>
									</div>
								)}
								<PasswordInput
									label="Enter Password"
									name="password"
									placeholder="****************"
									onChange={(e) => {
										const val = e.target.value || '';
										setFieldValue('password', val.trim());
										// handleChange(e);
									}}
									value={values.password}
									className={`mb-0`}
									isError={!!errors.password}
								/>
								<PasswordInput
									label="Confirm Password"
									name="confirm_password"
									placeholder="****************"
									// onChange={handleChange}
									onChange={(e) => {
										const val = e.target.value || '';
										setFieldValue(
											'confirm_password',
											val.trim()
										);
									}}
									className={`mb-0`}
									isError={!!errors.confirm_password}
								/>
								<br />
								<Button
									type="submit"
									text="Save Password"
									bgColor="primaryBlue"
									loading={false}
									className={`${styles.buttonSubmit}`}
								/>
							</form>
						</>
					) : (
						<>
							<Image alt="success icon" src={SuccessCheck} />
							<h3 className={`mt-5`}>
								Password has been successfully set
							</h3>
							<p className={`mb-4`}>
								Your account is now secure and protected.
							</p>
							<Button
								type="button"
								text="Continue"
								bgColor="primaryBlue"
								loading={false}
								className={`${styles.buttonSubmit}`}
								onClick={() => setShowModal(false)}
							/>
						</>
					)}
				</>
			</Modal>
			<style>
				{`
          .ant-modal-body {
            padding: 2rem 3rem;
          }
          .ant-input:placeholder-shown{
            
          }
        `}
			</style>
		</>
	);
};

export default PayoutsPage;
