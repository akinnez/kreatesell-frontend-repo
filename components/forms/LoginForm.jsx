import {useEffect} from 'react';

import {
	Input,
	Button,
	Checkbox,
	FormError,
	PasswordInput,
	FormSuccess,
} from '../';
import {useFormik} from 'formik';
import Link from 'next/link';
import {LoginSchema} from '../../validation';
import {isAnEmpytyObject, showToast} from '../../utils';
import {Login, GetStoreDetails} from '../../redux/actions';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import styles from '../../public/css/Login.module.scss';
import {dataLayerTrackingLink} from 'utils/googleTagManger';

export const LoginForm = () => {
	const login = Login();
	const getStoreDetails = GetStoreDetails();
	const router = useRouter();

	const {loading} = useSelector((state) => state.auth);

	const initialValues = {
		username: '',
		password: '',
	};

	const handleSubmit = (data) => {
		// //* temp by pass
		//  router.push('/account/dashboard');
		/**Login endpoint is called with data */

		login(
			data,
			(res) => {
				//call the tracking link after login action is being dispatched
				dataLayerTrackingLink(`'event':'complete_login'`);
				if (
					Object.keys(router.query).length > 0 &&
					Object.keys(router.query).includes('next')
				) {
					return router.replace(router.query.next);
				}
				if (
					Object.keys(router.query).length > 0 &&
					Object.keys(router.query).includes('showpricing') &&
					Boolean(router.query?.showpricing)
				) {
					return router.push(
						'/account/kreator/settings?activeTab=billing'
					);
				}
				if (
					res?.message
						?.toLowerCase()
						.includes(`kindly verify token sent to your email`)
				) {
					return router.push({
						pathname: '/verify-account',
						query: {email: res?.data?.email},
					});
				}
				if (
					res?.message
						?.toLowerCase()
						.includes(`has not been confirmed`)
				) {
					return router.push('/resend-email');
				}
				if (!res?.user?.business_name || !res?.user?.shop_name) {
					return router.push('/welcome');
				}
				getStoreDetails();
				return router.replace('/account/dashboard');
			},
			(err) => {
				if (
					err?.message
						?.toLowerCase()
						.includes(`has not been confirmed`)
				) {
					return router.push('/resend-email');
				}
				// if (err?.error && err?.error?.toLowerCase().includes(`has been de-activated`)) {
				// 	return err?.error;
				// }
			}
		);
	};

	//trigger the datalayer tracking link for user verification events, wrap it in a useffect
	useEffect(() => {
		if (router.query.verified) {
			dataLayerTrackingLink(`'event':'email_verified_true'`);
			return;
		}
		return () => {};
	}, []);

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: LoginSchema,
		validateOnChange: false,
	});

	const {errors} = formik;

	const handleKeyPress = (event) => {
		if (event.key === ' ') {
			event.preventDefault();
		}
	};

	return (
		<>
			{!isAnEmpytyObject(errors) && <FormError errors={errors} />}
			{router.query.verified && (
				<FormSuccess
					message={`Your account has been successfully verified. 
Please login below...`}
				/>
			)}
			<form onSubmit={formik.handleSubmit} autoComplete="off">
				<Input
					label="Email or Phone number"
					name="username"
					placeholder="Enter your Email or Phone number"
					onChange={formik.handleChange}
				/>

				<PasswordInput
					label="Password"
					name="password"
					placeholder="Enter your Password"
					onChange={formik.handleChange}
					className={styles.password}
					onKeyPress={handleKeyPress}
				/>

				<div className={styles.terms}>
					<div className={styles.checkbox}>
						<Checkbox
							name="rememberMe"
							onChange={formik.handleChange}
						/>
						<p>Remember Me</p>
					</div>

					<Link href="/forgot-password">
						<a>Forgot Password?</a>
					</Link>
				</div>

				<Button
					type="submit"
					text="Login"
					bgColor="primaryBlue"
					loading={loading}
				/>
			</form>
			<div className={styles.footer}>
				Don’t have an account?{' '}
				<Link href="/signup">
					<a>Get Started</a>
				</Link>{' '}
			</div>
		</>
	);
};
