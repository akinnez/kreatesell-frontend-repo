import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "components";
import { useFormik } from "formik";
import { CreateEditDomain, SetDomainScreen, GetDomains } from "redux/actions";
import { CreateDomainSchema } from "validation";
import { _prependHttp } from "utils";
import styles from "../Domain.module.scss";

export const CreateDomain = () => {
	const setDomainScreen = SetDomainScreen();
	const createDomain = CreateEditDomain();
	const getDomains = GetDomains();

	const { loading } = useSelector((state) => state.domain);
	const [domainName, setDomainName] = useState("");

	const initialValues = {
		domain_name: "",
		is_kreate_sell_url: false,
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
		setFieldValue("domain_name", _prependHttp({ url: domainName }));
	}, [domainName]);

	return (
		<div>
			<form
				className="productBorder mt-4 bg-white rounded-lg"
				onSubmit={formik.handleSubmit}
			>
				<div className="flex items-center">
					<h3 className="text-black-100 font-medium text-xl lg:text-2xl">
						Custom Store Domain
					</h3>
					<div className="bg-base-green-100 ml-2 p-1 text-base-white-100 font-medium mb-2">
						BUSINESS
					</div>
				</div>

				<div className="text-base-gray-200 text-sm">
					If you own a domain name , you can overwrite the default
					KreateSell.com domain by pointing your preferred domain to your
					KreateSell store. You can also use a subdomain like
					buy.yourdomain.com. Your custom domain should point directly to a
					CNAME of KreateSell. <a href="#">Learn More</a>
				</div>

				<div className="pt-3">
					<p className="text-black-100">Domain URL</p>
					<div className="bg-base-white-200 px-4 pt-2 flex items-center w-full lg:w-9/12">
						<div className="pr-6 text-base-gray pb-2">https://</div>
						<div className="w-4/5">
							<Input
								height="small"
								name="domain_name"
								placeholder="olumidejohn"
								onChange={(e) => setDomainName(e.target.value)}
								errorMessage={errors.domain_name}
							/>
						</div>
					</div>
					<p className="text-base-gray-200 text-xs py-2">
						Enter your customized domain name here,
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
