import { Layout, Input, Button, Checkbox } from "components";
import Image from "next/image";
import Link from "next/link";
import { FacebookBtn, GoogleBtn } from "assets";
import styles from "./Signup.module.scss";

const Signup = () => {
	return (
		<Layout>
			<div className={styles.signup}>
				<div className={styles.formContainer}>
					<div className={styles.form}>
						<h5 className={styles.formTitle}>
							Get started with a free account
						</h5>

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

						<form>
							<Input
								label="Email or Phone number"
								name="email"
								placeholder="Enter your Email or Phone number"
								errorMessage="Email is required"
							/>
							<Input
								label="Password"
								name="email"
								placeholder="Create Password"
								errorMessage="Email is required"
							/>
							<div className={styles.captcha}>captcha</div>

							<div className={styles.terms}>
								<Checkbox />
								<p>I agree to terms & conditions</p>
							</div>
							<Button text="Sign up" bgColor="primaryBlue" />
						</form>

						<div className={styles.footer}>
							Already have an account?{" "}
							<Link href="/login">
								<a>Login</a>
							</Link>{" "}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Signup;
