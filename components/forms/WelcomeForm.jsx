/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Input, FormError, Select } from "../";
import {
	StoreNameSchema,
	BusinessNameSchema,
	CountrySchema,
} from "../../validation";
import styles from "../../public/css/Welcome.module.scss";
import { isAnEmpytyObject } from "../../utils";
import { GetCountries, StoreOnboarding } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const WelcomeForm = () => {
	const router = useRouter();
	const getCountries = GetCountries();
	const storeOnboarding = StoreOnboarding();
	const [step, setStep] = useState(1);

	const { countries } = useSelector((state) => state.utils);
	const { loading } = useSelector((state) => state.store);

	useEffect(() => {
		getCountries();
	}, []);

	const initialValues = {
		Brand_Name: "",
		Store_Name: "",
		Country_Id: "",
	};

	const handleSubmit = async (data) => {
		if (step === 1) {
			setStep(2);
		} else if (step === 2) {
			setStep(3);
		} else if (step === 3) {
			/**Submit Action goes here */
			let formData = new FormData();
			for (let value in data) {
				formData.append(value, data[value]);
			}

			await storeOnboarding(formData, () => {
				router.push("/account/dashboard/kreator");
			});
		}
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema:
			step === 1
				? CountrySchema
				: step === 2
				? BusinessNameSchema
				: StoreNameSchema,
		validateOnChange: false,
	});

	const { setFieldValue } = formik;

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
				{step === 1 && `1. Select your country`}
				{step === 2 &&
					`2. Your Business Name - will be displayed on your store`}
				{step === 3 && `3.  What would you like your store username to be? `}
			</p>

			{step === 1 && (
				<div className={styles.selectCont}>
					<Select
						arrowIconColor="#0072EF"
						placeholder="Select Country"
						options={countries?.map((e) => ({ label: e.name, value: e.id }))}
						className={styles.selectStyle}
						height="3.375rem"
						name="Country_Id"
						onChange={(e) => setFieldValue("Country_Id", e.value)}
					/>
				</div>
			)}

			{step === 2 && (
				<Input
					placeholder="Enter name here ... "
					name="Brand_Name"
					className={styles.input}
					onChange={formik.handleChange}
				/>
			)}

			{step === 3 && (
				<Input
					placeholder="Enter name here ... "
					name="Store_Name"
					className={styles.input}
					onChange={formik.handleChange}
				/>
			)}

			<Button
				type={step === 3 ? "submit" : "click"}
				text={step === 3 ? "Submit" : "Continue"}
				bgColor="primaryBlue"
				className={styles.button}
				loading={loading}
			/>
		</form>
	);
};
