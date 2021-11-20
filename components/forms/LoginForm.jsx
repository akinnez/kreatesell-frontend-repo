import { Input, Button, Checkbox, FormError, PasswordInput } from "../";
import { useFormik } from "formik";
import Link from "next/link";
import { LoginSchema } from "../../validation";
import { isAnEmpytyObject } from "../../utils";
import { Login, GetStoreDetails } from "../../redux/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "../../public/css/Login.module.scss";

export const LoginForm = () => {
	const login = Login();
	const getStoreDetails = GetStoreDetails();
	const router = useRouter();

	const { loading } = useSelector((state) => state.auth);

	const initialValues = {
		username: "",
		password: "",
	};

	const handleSubmit = (data) => {
		/**Login endpoint is called with data */
		login(
			data,
			(res) => {
				if (
					res?.message
						?.toLowerCase()
						.includes(`kindly verify token sent to your email`)
				) {
					return router.push({
						pathname: "/verify-account",
						query: { email: res?.data?.email },
					});
				}
				if (res?.message?.toLowerCase().includes(`has not been confirmed`)) {
					return router.push("/resend-email");
				}
				if (!res?.user?.business_name || !res?.user?.shop_name) {
					return router.push("/welcome");
				}
				getStoreDetails();
				return router.push("/account/dashboard");
			},
			(err) => {
				if (err?.message?.toLowerCase().includes(`has not been confirmed`)) {
					return router.push("/resend-email");
				}
			}
		);
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: LoginSchema,
		validateOnChange: false,
	});

	const { errors } = formik;

	return (
		<>
			{!isAnEmpytyObject(errors) && <FormError errors={errors} />}

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
				/>

				<div className={styles.terms}>
					<div className={styles.checkbox}>
						<Checkbox name="rememberMe" onChange={formik.handleChange} />
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
				Don’t have an account?{" "}
				<Link href="/signup">
					<a>Get Started</a>
				</Link>{" "}
			</div>
		</>
	);
};
