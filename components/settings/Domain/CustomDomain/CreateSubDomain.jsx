import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "components";
import { useFormik } from "formik";
import { CreateEditDomain, SetDomainScreen, GetDomains } from "redux/actions";
import { CreateDomainSchema } from "validation";
import { _prependKreateSell } from "utils";
import styles from "../Domain.module.scss";

export const CreateSubDomain = () => {
	const setDomainScreen = SetDomainScreen();
	const createDomain = CreateEditDomain();
	const getDomains = GetDomains();

	const { loading } = useSelector((state) => state.domain);
	const [domainName, setDomainName] = useState("");

	const initialValues = {
		domain_name: "",
		is_kreate_sell_url: true,
	};

	const handleSubmit = (data) => {
		createDomain(data, () => {
			getDomains();
			setDomainScreen(2);
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: CreateDomainSchema,
		validateOnChange: false,
	});

	const { errors, setFieldValue } = formik;

	useEffect(() => {
		setFieldValue("domain_name", _prependKreateSell({ url: domainName }));
	}, [domainName]);

	return (
		<div>
			<form
				className="productBorder mt-4 bg-white rounded-lg"
				onSubmit={formik.handleSubmit}
			>
				<div className="flex items-center">
					<h3 className="text-black-100 font-medium text-xl lg:text-2xl">
						Custom Store Subdomain
					</h3>
					<div className="bg-base-green-100 ml-2 p-1 text-base-white-100 font-medium mb-2">
						BUSINESS
					</div>
				</div>

				<div className="text-base-gray-200 text-sm">
					This is your free KreateSell store URL. If you change this subdomain,
					your store URL will be updated to the new set subdomain..
				</div>

				<div className="pt-3">
					<p className="text-black-100">Subdomain</p>
					<div className="bg-base-white-200 px-4 pt-2 flex items-center w-full lg:w-9/12">
						<div className="pr-6 text-base-gray pb-2">Kreatesell.com/</div>
						<div className="w-4/5">
							<Input
								height="small"
								placeholder="olumidejohn"
								name="domain_name"
								errorMessage={errors.domain_name}
								onChange={(e) => setDomainName(e.target.value)}
							/>
						</div>
					</div>
					<p className="text-base-gray-200 text-xs py-2">
						Enter your customized subdomain name here,
					</p>
				</div>

				<div className="w-2/5 md:w-4/12 lg:w-1/6">
					<Button
						text="Save"
						bgColor="blue"
						className={styles.btnStyle}
						loading={loading}
					/>
				</div>
			</form>
		</div>
	);
};
