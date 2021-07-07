import { Input, Button, Checkbox } from "components";
import { useFormik } from "formik";
import Link from "next/link";
import { LoginSchema } from "./Login.validation";
import styles from "./Login.module.scss";

export const LoginForm = () => {
	const initialValues = {
		email: "",
		password: "",
	};

	const handleSubmit = () => {};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: LoginSchema,
		validateOnChange: false,
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit} autoComplete="off">
				<Input
					label="Email or Phone number"
					name="email"
					placeholder="Enter your Email or Phone number"
					onChange={formik.handleChange}
					errorMessage={formik?.errors?.email}
				/>

				<Input
					label="Password"
					name="password"
					placeholder="Enter your Password"
					onChange={formik.handleChange}
					errorMessage={formik?.errors?.password}
					containerStyle={styles.password}
				/>

				<div className={styles.terms}>
					<div className={styles.checkbox}>
						<Checkbox name="rememberMe" onChange={formik.handleChange} />
						<p>Remember Me</p>
					</div>

					<Link href="forgot-password">
						<a>Forget Password?</a>
					</Link>
				</div>

				<Button text="Login" bgColor="primaryBlue" />
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
