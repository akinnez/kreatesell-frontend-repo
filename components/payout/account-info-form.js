import React, { useState, useEffect } from "react";
import style from "./Index.module.scss";
import {
	Modal,
	DatePicker,
	Space,
	Form,
	Input as AntInput,
	message,
} from "antd";
import { Button, Input, Select } from "../form-input";
import { useSelector, useDispatch } from "react-redux";
import { getBanks } from "../../redux/actions/utilityActions";
import ApiService from "../../utils/axios";
import { toast } from "react-toastify";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";
import FlutterWave from "../../utils/flutterwave";

const BankModal = ({ open, onClose = () => {} }) => {
	const [loading, setLoading] = useState({
		banks: false,
		countries: false,
		save: false,
	});

	const { data } = useSWR("v1/kreatesell/store/me", fetcher);
	const [banks, setBanks] = useState([]);
	const [country, setCountry] = useState([]);

	const [form] = Form.useForm();

	const handleBank = (id) => {
		setLoading({ ...loading, banks: true });
		form.setFieldsValue({ bank_id: "" });
		setBanks([]);
		ApiService.request(
			"get",
			`v1/kreatesell/utils/get-banks/${id}`,
			(res) => {
				setLoading({ ...loading, banks: false });
				const bank = res?.data?.list_of_banks?.map(({ id, name }) => ({
					label: name,
					value: id,
				}));
				setBanks(bank);
			},
			(error) => {
				setLoading({ ...loading, banks: false });
			}
		);
	};

	const handleSubmit = (info) => {
		setLoading({ ...loading, save: true });
		ApiService.request(
			"post",
			"v1/kreatesell/payment/bank-details",
			(res) => {
				toast.success("Account info saved successfully");
				setLoading({ ...loading, save: false });
				onClose(false);
			},
			(error) => {
				setLoading({ ...loading, save: false });
				toast.error(error?.message);
			},
			info
		);
	};

	useEffect(() => {
		form.setFieldsValue({
			bank_id: data?.bank_details?.bank_id
				? parseInt(data?.bank_details?.bank_id)
				: "",
			country_id: data?.bank_details?.country_id
				? parseInt(data?.bank_details?.country_id)
				: "",
			account_number: data?.bank_details?.account_number,
			account_name: data?.bank_details?.account_name,
		});

		// ApiService.request('get','v1/kreatesell/store/me',
		// ({data})=>{
		//     data?.bank_details?.country_id ? handleBank(parseInt(data?.bank_details?.country_id)):null
		//     // form.setFieldsValue({
		//     //     bank_id:data?.bank_details?.bank_id ? parseInt(data?.bank_details?.bank_id):'',
		//     //     country_id:data?.bank_details?.country_id ? parseInt(data?.bank_details?.country_id):'',
		//     //     account_number:data?.bank_details?.account_number,
		//     //     account_name:data?.bank_details?.account_name,
		//     // })
		// })
	}, [data]);

	const handleAccountNumber = (accountNumber) => {
		if (accountNumber.length == 10) {
			const bank = form.getFieldValue("bank_id");

			const hide = message.loading("Validating account...", 0);
			ApiService.request(
				"post",
				"v1/kreatesell/payment/validate-account",
				(res) => {
					hide();
				},
				(error) => {
					hide();
					// setLoading({...loading, save:false})
					toast.error(error?.message);
				},
				{
					account_number: accountNumber,
					account_bank: bank,
				}
			);
		}
	};

	useEffect(() => {
		ApiService.request(
			"get",
			"v1/kreatesell/utils/get-countries",
			({ data }) => {
				const countries = data?.list_of_countries?.map(({ id, name }) => ({
					label: name,
					value: id,
				}));
				setCountry(countries);
			}
		);
	}, []);

	useEffect(() => {
		if (data) {
			handleBank(parseInt(data?.bank_details?.country_id));
		}
	}, [data]);

	return (
		<>
			<Modal
				title=""
				footer={null}
				width={600}
				className={style.modal}
				closable={false}
				visible={open}
				onCancel={() => onClose()}
				bodyStyle={{ padding: "30px 60px" }}
			>
				<h3 className={style.title}>Provide your Bank details</h3>
				<p className={style.sub_title}>We pay your funds to this account</p>
				<Form layout="vertical" form={form} onFinish={handleSubmit}>
					<Select
						size="large"
						label="Select Country"
						list={country}
						onChange={(e) => handleBank(e)}
						placeholder="Select country"
						name="country_id"
						rules={[{ required: true, message: "Country is important" }]}
					/>

					<Select
						size="large"
						label="Select Bank"
						loading={loading?.banks}
						list={banks}
						name="bank_id"
						placeholder="Select bank"
						rules={[{ required: true, message: "Bank is important" }]}
					/>

					<Input
						size="large"
						label="Account Number"
						placeholder="Enter account number"
						type="number"
						name="account_number"
						onKeyUp={(e) => handleAccountNumber(e.target.value)}
						rules={[{ required: true, message: "Account Number is important" }]}
					/>

					<Input
						size="large"
						label="Account Name"
						placeholder="Enter account name"
						name="account_name"
						disabled
						rules={[{ required: true, message: "Account Name is important" }]}
					/>

					<div className={style.alert}>
						<p>
							<b>Be careful</b>
							<br />
							Make sure your account details are correct before proceeding. We
							will not be held liable for failed transactions resulting from
							incorrect bank details.
						</p>
					</div>
					<Input
						size="large"
						label="Enter Current password"
						placeholder="********"
						type="password"
						name="password"
						rules={[{ required: true, message: "Password is important" }]}
					/>

					<Form.Item>
						<div className={style.btn_wrapper}>
							<p>Finished adding your account details?</p>
							<Button
								htmlType="submit"
								loading={loading?.save}
								label="Save Bank Info"
								type="primary"
							/>
						</div>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default BankModal;
