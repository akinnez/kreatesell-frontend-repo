import { Layout, Input, Button, Checkbox } from "components";
import Image from "next/image";
import Link from "next/link";
import { FacebookBtn, GoogleBtn } from "assets";
import { useFormik } from "formik";
import styles from "./Login.module.scss";
import { LoginSchema } from "./Login.validation";

const Login = () => {
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
		<Layout>
			<div className={styles.login}>
				<div className={styles.formContainer}>
					<div className={styles.form}>
						<h5 className={styles.formTitle}>Login to your account</h5>

						<p className={styles.continue}>Continue with</p>

						<div className={styles.socialBtn}>
							<div className={styles.google}>
								<Image src={GoogleBtn} alt="sign up with google" />
							</div>
							<div className="cursor">
								<Image src={FacebookBtn} alt="sign up with facebook" />
							</div>
						</div>

						<div className={styles.midline}>
							<span className={styles.lineA}></span>
							<p className={styles.text}>or</p>
							<span className={styles.lineB}></span>
						</div>

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
								<Checkbox name="rememberMe" onChange={formik.handleChange} />
								<Link href="forgot-password">
									<a className={styles.forget}>Forget Password?</a>
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
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
