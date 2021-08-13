/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useFormik } from "formik";
import { Button, Input, FormError } from "../";
import { StoreNameSchema, BusinessNameSchema } from "../../validation";
import styles from "../../public/css/Welcome.module.scss";
import { isAnEmpytyObject } from "../../utils";

export const WelcomeForm = () => {
	const [step, setStep] = useState(1);

	const initialValues = {
		businessName: "",
		storeName: "",
	};

	const handleSubmit = () => {
		if (step === 1) {
			setStep(2);
		}
		/**Submit Action goes here */
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: step === 1 ? BusinessNameSchema : StoreNameSchema,
		validateOnChange: false,
	});

	return (
		<form
			className={styles.welcome}
			onSubmit={formik.handleSubmit}
			autoComplete="off"
		>
			<h5 className={styles.mobileTitle}>
				Tell us a little about <br /> yourself
			</h5>
			<h5 className={styles.webTitle}>Tell us a little about yourself</h5>
			<p className={styles.subTitle}>
				Now that you're all signed up, let's personalize your store.
			</p>

			{!isAnEmpytyObject(formik.errors) && <FormError errors={formik.errors} />}

			<p className={styles.label}>
				{step === 1 &&
					`1. Your Business Name - will be displayed on your store`}
				{step === 2 && `2.  What would you like your store username to be? `}
			</p>

			{step === 1 && (
				<Input
					placeholder="Enter name here ... "
					name="businessName"
					className={styles.input}
					onChange={formik.handleChange}
				/>
			)}

			{step === 2 && (
				<Input
					placeholder="Enter name here ... "
					name="storeName"
					className={styles.input}
					onChange={formik.handleChange}
				/>
			)}

			<Button
				type={step === 1 ? "click" : "submit"}
				text="Continue"
				bgColor="primaryBlue"
				className={styles.button}
			/>
		</form>
	);
};
