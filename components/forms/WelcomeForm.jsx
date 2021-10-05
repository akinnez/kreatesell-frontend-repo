/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useFormik } from "formik";
import { Button, Input, FormError } from "../";
import { StoreNameSchema, BusinessNameSchema } from "../../validation";
import styles from "../../public/css/Welcome.module.scss";
import { isAnEmpytyObject } from "../../utils";
import { WelcomeStoreOnboarding } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const WelcomeForm = () => {
	const router = useRouter();
	const welcomeStoreOnboarding = WelcomeStoreOnboarding();
	const [step, setStep] = useState(1);

	const { loading } = useSelector((state) => state.store);

	const initialValues = {
		Brand_Name: "",
		Store_Name: "",
	};

	const handleSubmit = async (data) => {
		if (step === 1) {
			setStep(2);
		} else if (step === 2) {
			await welcomeStoreOnboarding(data, () => {
				router.push("/account/dashboard");
			});
		}
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
				{step === 1 && `Tell us a little about <br /> yourself`}
				{step === 2 && `Here is what your store link looks like`}
			</h5>
			<h5 className={styles.webTitle}>
				{step === 1 && `Tell us a little about yourself`}
				{step === 2 && `Here is what your store link looks like`}
			</h5>
			<p className={styles.subTitle}>
				{step === 1 &&
					`Now that you're all signed up, let's personalize your store.`}
				{step === 2 && `Take time to verify `}
			</p>

			{!isAnEmpytyObject(formik.errors) && <FormError errors={formik.errors} />}

			<p className={styles.label}>
				{step === 1 &&
					`1. Your Business Name - will be displayed on your store`}
				{step === 2 && `2. Personalize your store link.`}
			</p>

			{step === 1 && (
				<Input
					placeholder="Enter name here ... "
					name="Brand_Name"
					className={styles.input}
					onChange={formik.handleChange}
				/>
			)}

			{step === 2 && (
				<div className="mb-12">
					<Input
						placeholder="Enter name here ... "
						name="Store_Name"
						className={styles.input}
						onChange={formik.handleChange}
					/>

					{formik.values.Store_Name && (
						<span className={styles.storePreviewLink}>
							{`https://kreatesell.com/${formik.values.Store_Name}`}
						</span>
					)}
				</div>
			)}

			<Button
				type={step === 2 ? "submit" : "click"}
				text={step === 2 ? "Start Selling" : "Continue"}
				bgColor="primaryBlue"
				className={styles.button}
				loading={loading}
			/>
		</form>
	);
};
