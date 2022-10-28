import {Input, Button, FormError} from '../';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import {ForgotPasswordSchema} from '../../validation';
import {isAnEmpytyObject} from '../../utils';
import {InitiatePasswordReset} from '../../redux/actions';
import {useSelector} from 'react-redux';
import styles from '../../public/css/ForgotPassword.module.scss';

export const ForgotPasswordForm = () => {
	const router = useRouter();
	const initiatePasswordReset = InitiatePasswordReset();

	const {loading} = useSelector((state) => state.auth);

	const initialValues = {
		username: '',
	};

	const handleSubmit = (data) => {
		initiatePasswordReset(data, () => {
			//temporary fix top track user email on reset password page
			localStorage.setItem('userEmail', data.username);
			router.push('/forgot-password/token');
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ForgotPasswordSchema,
		validateOnChange: false,
	});

	return (
		<div className={styles.body}>
			{!isAnEmpytyObject(formik.errors) && (
				<FormError errors={formik.errors} />
			)}

			<form
				onSubmit={formik.handleSubmit}
				autoComplete="off"
				className={styles.container}
			>
				<Input
					label="Email"
					name="username"
					placeholder="Enter your Email "
					onChange={formik.handleChange}
				/>

				<Button
					text="Reset password"
					bgColor="primaryBlue"
					loading={loading}
				/>
			</form>

			<div className={styles.footer}>
				Already have an account?{' '}
				<Link href="/login">
					<a>Login here</a>
				</Link>{' '}
			</div>
		</div>
	);
};