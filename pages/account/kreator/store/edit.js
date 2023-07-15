import React, {useState, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import AuthLayout from '../../../../components/authlayout';
import {Row, Col, Card, Form, Input as AntInput} from 'antd';

import {
	Input,
	Dropzone,
	Button,
	FileInput,
	InputV2,
	SelectV2,
} from '../../../../components/form-input';
import style from '../../../../public/css/Store.module.scss';
import ApiService from '../../../../utils/axios';
import {toast} from 'react-toastify';
import {showToast} from 'utils';
import {GetStoreDetails} from 'redux/actions';
import {dataLayerTrackingLink} from 'utils/googleTagManger';

const Index = () => {
	const store = useSelector((state) => state.store);
	const {countries} = useSelector((state) => state.utils);
	const Router = useRouter();
	const [file, setFile] = useState({
		Profile_Picture: '',
		Cover_Picture: '',
	});

	const [loading, setLoading] = useState({
		updating: false,
		fetching: true,
	});
	const [countryCode, setCountryCode] = useState('');
	const [countryName, setCountryName] = useState('');
	const [countryId, setCountryId] = useState(null);
	const [country, setCountry] = useState('');
	const [isStoreSetUp, SetIsStorSetup] = useState(false);
	const [isFirstTimeUser, SetIsFirstTimeUser] = useState(false);
	const [form] = Form.useForm();
	const getStoreDetails = GetStoreDetails();

	const memoisedCountryData = useMemo(() => {
		if (countries && Array.isArray(countries)) {
			return countries.map((country) => ({
				...country,
				value: country.id,
			}));
		}
		return [];
	}, [countries]);

	const handleFinish = async (info) => {
		const countryCode = countries.find(
			(countryArg) =>
				countryArg?.name?.toLowerCase() === country?.toLowerCase()
		);
		if (!file?.Profile_Picture) {
			toast.error('Profile picture is required');
			return;
		}
		setLoading({...loading, updating: true});
		const formData = new FormData();
		formData.append('Brand_Name', info.Brand_Name);
		formData.append('Bio_Data', info.Bio_Data);
		formData.append('Country_Id', countryCode?.id);
		formData.append('Cover_Picture', file.Cover_Picture);
		formData.append('Profile_Picture', file.Profile_Picture);
		formData.append('Mobile_Number', info.Mobile_Number);
		formData.append('Facebook', info.Facebook);
		formData.append('Instagram', info.Instagram);
		formData.append('Linkedln', info.Linkedln);
		formData.append('Twitter', info.Twitter);
		formData.append('Store_Name', info.Store_Name);
		ApiService.request(
			'post',
			'v1/kreatesell/store/onboarding',
			({data}) => {
				setLoading({...loading, updating: false});
				toast.success('Successful');
				//trigger the data-layer form store setup-complete
				dataLayerTrackingLink(`'event':'complete_store_setup'`);
				getStoreDetails(() => {
					setTimeout(() => {
						if (Router.query?.returnTo) {
							Router.push('/account/kreator/products/create');
						} else {
							Router.push('/account/kreator/store');
						}
					}, 3000);
				});
			},
			(err) => {
				setLoading({...loading, updating: false});
				showToast(err.message, 'error');
				toast.error(err);
			},
			formData
		);
	};

	const handlePhoneCode = (countryParam) => {
		let phoneCode = countries.find(
			(country) => country.name === countryParam
		);
		// console.log('phone code', phoneCode);
		setCountryCode(phoneCode);
	};

	// prefill the country code when the user selects another country
	useEffect(() => {
		if (country) {
			handlePhoneCode(country);
		}
	}, [country]);

	// prefill the country code on page mount
	useEffect(() => {
		if (countries.length > 0 && countryId) {
			let phoneCode = countries.find(
				(country) => country.id === countryId
			);
			handlePhoneCode(phoneCode?.name);
		}
	}, [countries.length, countryId]);

	const notNull = (val) => {
		return !!val && val !== 'null';
	};

	useEffect(() => {
		ApiService.request(
			'get',
			'v1/kreatesell/store/me',
			({data}) => {
				//* user has setup store details

				// console.log('data', data);
				const {
					brand_name,
					country_name,
					mobile_number,
					store_name,
					// linked_ln,
				} = data?.store_details;

				const hasBeganSettingUpStore =
					brand_name && country_name && mobile_number && store_name;

				// && linked_ln;

				//* here
				if (hasBeganSettingUpStore) {
					SetIsStorSetup(true);
					SetIsFirstTimeUser(false);
				} else {
					SetIsFirstTimeUser(true);
				}
				setFile({
					Profile_Picture: data?.store_details?.display_picture,
					Cover_Picture: data?.store_details?.cover_page,
				});
				setCountryId(
					notNull(data?.store_details?.country_id)
						? data?.store_details?.country_id
						: ''
				);
				setCountryName(
					notNull(data?.store_details?.country_name)
						? data?.store_details?.country_name
						: ''
				);

				setCountry(
					notNull(data?.store_details?.country_name)
						? data?.store_details?.country_name
						: ''
				);

				form.setFieldsValue({
					Brand_Name: notNull(data?.store_details?.brand_name)
						? data?.store_details?.brand_name
						: '',
					Store_Name: notNull(data?.store_details?.store_name)
						? data?.store_details?.store_name
						: '',
					Bio_Data: notNull(data?.store_details?.bio_data)
						? data?.store_details?.bio_data
						: '',
					Country_Id: notNull(data?.store_details?.country_id)
						? data?.store_details?.country_id
						: '',
					Mobile_Number: notNull(data?.user?.phone_number)
						? data?.user?.phone_number
						: '',
					Facebook: notNull(data?.store_details?.facebook)
						? data?.store_details?.facebook
						: '',
					Twitter: notNull(data?.store_details?.twitter)
						? data?.store_details?.twitter
						: '',
					Instagram: notNull(data?.store_details?.instagram)
						? data?.store_details?.instagram
						: '',
					Linkedln: notNull(data?.store_details?.linked_ln)
						? data?.store_details?.linked_ln
						: '',
				});
				setLoading({...loading, fetching: false});
			},
			(err) => {
				console.log(err);
			}
		);
	}, []);

	const enableAddProduct = () => {
		// if(is)
		// SetIsStorSetup(false);
		return isFirstTimeUser ? SetIsStorSetup(false) : SetIsStorSetup(true);
	};

	const updateUiOnDelete = () => {
		setFile({...file, Cover_Picture: null});
	};

	if (loading.fetching) return null;

	return (
		<>
			<AuthLayout loading={loading.fetching}>
				<Row>
					<Col span={24}>
						<Card bordered={false} className={style.card}>
							<h3>Welcome to KreateSell</h3>
							<p>
								Fill out the fields below to complete your
								profile
							</p>
							<Form
								layout="vertical"
								form={form}
								onFinish={handleFinish}
							>
								<Dropzone
									onChange={(e) =>
										setFile({...file, Cover_Picture: e})
									}
									label="Cover"
									accept="image/*"
									name="cover"
									value={file?.Cover_Picture}
									updateUiOnDelete={updateUiOnDelete}
									extraLabel="- Add image on your cover page"
								/>
								<FileInput
									name="profile"
									value={file?.Profile_Picture}
									onChange={(e) =>
										setFile({...file, Profile_Picture: e})
									}
								/>
								<br />
								<Input
									name="Brand_Name"
									label="Name"
									extraLabel="- Your unique username or business name"
									placeholder="Brand name, Business name or Full name"
									rules={[
										{
											required: true,
											min: 4,
											message:
												'Brand name is a required field',
										},
									]}
								/>

								<InputV2
									name="Store_Name"
									label="Username"
									extraLabel="- This is your unique store link"
									prefixText="Kreatesell.com/store/"
									disabled={false}
									rules={[
										{
											required: true,
											message:
												'Store name is a required field',
										},
									]}
								/>

								<Input
									name="Bio_Data"
									CustomInput={AntInput.TextArea}
									row={5}
									label="Description"
									placeholder="Tell us more about your business. 
                            Buyers are also interested in knowing more about your business uniqueness."
									maxLength={700}
									required
								/>

								<Row gutter={{xs: 0, sm: 0, md: 8}}>
									<Col xs={24} md={12}>
										<SelectV2
											label="Country"
											size="large"
											setCountry={setCountry}
											list={memoisedCountryData}
											placeholder="Choose an option"
											name="Country_Id"
											loading={loading.fetching}
											rules={[
												{
													required: true,
													message:
														'Country is a required field',
												},
											]}
											defaultValue={countryName}
										/>
									</Col>
									<Col xs={24} md={12}>
										<Input
											addonBefore={
												countryCode?.country_code ||
												'---'
											}
											type="tel"
											label="Phone Number"
											placeholder={
												countryCode?.country_code
											}
											rules={[
												{
													required: true,
													message:
														'Valid phone number is required',
													min: 6,
													max: 14, 
												},
											]}
											name="Mobile_Number"
										/>
									</Col>
								</Row> 

								<Input
									label="Facebook"
									type="url"
									extraLabel="- link to your Facebook account"
									placeholder="https://facebook.com/"
									name="Facebook"
								/>
								<Input
									label="Instagram"
									type="url"
									extraLabel="- link to your Instagram account"
									placeholder="https://instagram.com/"
									name="Instagram"
								/>
								<Input
									label="LinkedIn"
									type="url"
									extraLabel="- link to your LinkedIn account"
									placeholder="https://linkedin.com/"
									name="Linkedln"
								/>
								<Input
									type="url"
									label="Twitter"
									extraLabel="- link to your Twitter account"
									placeholder="https://twitter.com/"
									name="Twitter"
								/>

								<h4 className={style.storeDescription}>
									Are you done setting up your store? Next
									step is putting up your first product
								</h4>
								<div className={style.submitButtons}>
									<Button
										onClick={enableAddProduct}
										className={style.outlinedBtn}
										loading={loading?.updating}
										htmlType="submit"
										label="Save and Preview"
									/>
									<Button
										disabled={!isStoreSetUp}
										type="primary"
										onClick={() =>
											Router.push(
												'/account/kreator/products/create'
											)
										}
										htmlType="button"
										label="Add Product"
									/>
								</div>
							</Form>
						</Card>
					</Col>
				</Row>
			</AuthLayout>
			<style jsx>{`
				.btn-wrapper {
					display: flex;
					gap: 15px;
					justify-content: center;
					margin-top: 10px;
				}

				.highlight {
					display: flex;
					align-items: center;
					gap: 10px;
				}

				#spacer {
					padding: 40px 190px 0 190px;
				}

				@media screen and (max-width: 600px) {
					#spacer {
						padding: 0;
					}
				}
			`}</style>
		</>
	);
};

export default Index;
