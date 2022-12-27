import {useState, useEffect} from 'react';
import Image from 'next/image';
import {
	CloudUpload,
	ErrorIcon,
	isAnEmpytyObject,
	transformToFormData,
} from 'utils';
import styles from './CreateProduct.module.scss';
import {Radio} from 'components/inputPack';
import {Switch} from 'antd';
import {useFormik} from 'formik';
import {Form, Input, Button} from 'antd';
import {
	DigitalProductSchema,
	// oneTimeSubscriptionSchema,
	oneTimeSubscriptionAndMembershipSchema,
	// membershipProductSchema,
} from 'validation';
import {
	SetProductTab,
	GetListingStatus,
	CreateProduct,
	AuthGetProductById,
	SetProductID,
} from 'redux/actions';
import {useSelector} from 'react-redux';
import {useUpload} from 'hooks';
import ImageUpload from './ImageUpload';
import ProductEditor from './ProductEditor';
import ImageError from './ImageError';
import {useRouter} from 'next/router';
import FileUpload from './FileUpload';

export const CreateProductForm = ({
	productType = 'digitalDownload',
	productTypeId,
	productId,
}) => {
	const setProductTab = SetProductTab();
	const getListingStatus = GetListingStatus();
	const createProduct = CreateProduct();
	const getProductByID = AuthGetProductById();
	const setProductID = SetProductID();
	const router = useRouter();
	const {TextArea} = Input;
	const [preOrder, setPreOrder] = useState(false);
	const [contentFiles, setContentFiles] = useState(false);
	const [isImageFilled, setIsImageFilled] = useState(false);
	const [contents, setContents] = useState('');
	/**product is for single product fetched by ID */
	const {listingStatus, loading, productID, product} = useSelector(
		(state) => state.product
	);
	const {store} = useSelector((state) => state.store);
	const [productFile, setProductFile] = useState(null);
	const [initialProduct, setInitialProduct] = useState(null);
	const filterListingStatus = (id) =>
		listingStatus?.filter((item) => item.id === id);

	const activateStatus = filterListingStatus(1);
	const deActivateStatus = filterListingStatus(2);
	const unListStatus = filterListingStatus(3);
	// const [showImageFileFeedback, setShowImageFileFeedback] = useState(false);
	const {
		mainFile: imageUploads,
		getRootProps,
		getInputProps,
		deleteFile,
		setUrl,
		setFiles,
		showImageFileFeedback,
	} = useUpload({
		fileType: 'image',
	});

	const initialValues = {
		product_name: '',
		product_description: '',
		enable_preorder: false,
		upload_content: false,
		product_visibility_status: 1,
		upload_preview: false,
		preorder_details: {
			preorder_release_date: '',
			is_preorder_downloadable: true,
		},
		// content_file_details: {
		// 	productfiles: [],
		// 	file_access_type: '',
		// 	file_type: '',
		// },
		contentZipFiles: '',
		action: !isAnEmpytyObject(product) ? 'e' : 'c',
		kreatesell_id: '',
		product_type_id: 1,
		product_listing_status_id: 0,
		product_status: 0,
		cta_button: '',
		product_id: 0,
		product_images: {
			productFiles: [],
		},
		product_details: '',
		isBasicPlan: false,
	};

	const handleSubmit = (data) => {
		// console.log('Data is', data);
		if (['oneTimeSubscription', 'membership'].includes(productType)) {
			delete data?.contentZipFiles;
			delete data?.upload_content;
			delete data?.upload_preview;
		}
		if (!data.enable_preorder) {
			delete data.preorder_details;
		}
		if (!data.upload_content) {
			delete data.contentZipFiles;
		}
		delete data.isBasicPlan;
		// console.log(data)
		const result = transformToFormData(data, 'contentZipFiles');
		createProduct(result, async () => {
			if (productId) {
				await getProductByID(productId);
			}
			setProductTab(1);
		});
	};
	const imageIsEdits = (files) => {
		const mapped = files?.map((items, i) => {
			items.isEdits = true;
			const fileMapped = {
				file: {...items, name: `image${i + 1}`},
				errors: [],
			};
			return fileMapped;
		});
		return mapped;
	};
	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema:
			productType === 'digitalDownload'
				? DigitalProductSchema
				: oneTimeSubscriptionAndMembershipSchema,
		validateOnChange: false,
	});

	const {errors, setFieldValue, values} = formik;

	useEffect(() => {
		getListingStatus();
	}, []);

	useEffect(() => {
		if (productID || productId) {
			getProductByID(productID || productId);
		}
	}, [productID, productId]);

	useEffect(() => {
		if (preOrder && store) {
			const {user} = store;
			if (user?.user_plan === 'Basic') {
				setFieldValue('isBasicPlan', true);
			} else {
				setFieldValue('isBasicPlan', false);
			}
		}
		return () => {
			setFieldValue('isBasicPlan', false);
		};
	}, [preOrder, store]);
	useEffect(() => {
		// console.log('here', product)
	}, [product]);

	useEffect(() => {
		// console.log('imageUploads = ', imageUploads);
		if (imageUploads.length >= 3) {
			setIsImageFilled(true);
			return;
		}
		return setIsImageFilled(false);
	}, [imageUploads]);

	// console.log("imageUploads = ", imageUploads);

	const findUnsupportedFileFormat = imageUploads.find((item) =>
		item?.file?.name.includes('.png')
	);
	// console.log("imageUploads = ", imageUploads);

	useEffect(() => {
		setFieldValue('product_details', contents);
		setFieldValue('product_images.productFiles', [
			...imageUploads.map((file) =>
				file.url ? file.url : file.file.filename
			),
		]);
		setFieldValue('product_type_id', productTypeId);
		setFieldValue('contentZipFiles', productFile);
	}, [productTypeId, productFile, contents, imageUploads]);

	useEffect(() => {
		if (Object.keys(product).length > 0) {
			setFieldValue(
				'product_name',
				product?.product_details?.product_name
			);
			setFieldValue(
				'product_description',
				product?.product_details?.product_description
			);
			setFieldValue(
				'enable_preorder',
				product?.product_details?.enable_preorder ?? false
			);
			setFieldValue(
				'upload_content',
				product.product_details.upload_content
					? product.product_details.upload_content
					: false
			);
			setFieldValue(
				'product_visibility_status',
				product?.product_details?.product_visibility
			);
			setFieldValue(
				'upload_preview',
				product?.product_details?.is_preview_only
			);
			setFieldValue('action', 'e');
			setFieldValue(
				'preorder_details.preorder_release_date',
				product?.product_details?.preoder_date ?? ''
			);
			setFieldValue(
				'preorder_details.is_preorder_downloadable',
				product?.product_details?.is_preoder_downloadable ?? false
			);
			setFieldValue(
				'kreatesell_id',
				product?.product_details?.kreasell_product_id
			);
			setFieldValue(
				'product_type_id',
				product?.product_details?.product_type_id
			);
			setFieldValue('product_id', product?.product_details?.id);
			setFieldValue(
				'product_listing_status_id',
				product?.product_details?.product_listing_status
			);
			setFieldValue('cta_button', product?.product_details?.cta_button);
			setFieldValue(
				'product_images.productFiles',
				...product?.product_images
					?.filter((images) => images?.file_type !== 4)
					?.map((item) => {
						const arr = item?.filename?.split(',');
						return arr.length > 0 ? [...arr] : [];
					})
			);
			if (product.product_details.enable_preorder) {
				setPreOrder(true);
			}
			setFiles(
				imageIsEdits(
					...product?.product_images
						?.filter((images) => images?.file_type !== 4)
						?.map((item) => {
							const arr = item?.filename?.split(',');
							const truc = arr?.map((item) => {
								return {
									filename: item,
								};
							});
							return truc;
						})
				)
			);
			setContents(product?.product_details?.product_details);
			if (product?.product_details.upload_content) {
				setContentFiles(product?.product_details.upload_content);
				setInitialProduct(
					product?.product_images?.filter(
						(images) => images?.file_type === 4
					)
				);
			}
			if (product?.product_price_type) {
				switch (product?.product_price_type) {
					case 'Fixed Price':
						return setFieldValue('pricing_type_id', 1);
					case 'Pay What You Want':
						return setFieldValue('pricing_type_id', 2);
					// case 'Installment Payment':
					// 	return setFieldValue('pricing_type_id', 3);
					case 'Make It Free':
						return setFieldValue('pricing_type_id', 4);
				}
			}
		}
	}, [product]);

	return (
		<div className={styles.digitalDownload}>
			<h5 className="text-primary-blue font-semibold text-2xl">
				{productType === 'digitalDownload' && 'DIGITAL DOWNLOAD'}
				{productType === 'oneTimeSubscription' &&
					'ONE-TIME SUBSCRIPTION'}
				{productType === 'membership' && 'MEMBERSHIP '}
			</h5>

			<Form
				layout="vertical"
				className="pt-3"
				onFinish={formik.handleSubmit}
			>
				<Form.Item
					label={
						<h2 className={`${styles.label2} mb-0`}>
							Name
							{values?.product_name.length === 50 && (
								<span className={styles.charLimit}>
									50 characters limit reached!
								</span>
							)}
						</h2>
					}
					className={styles.inputCont}
				>
					<Input
						placeholder="Buyers see this name on the store front page; choose a simple and catchy name, with max-length being 10!"
						className={`${styles.input}`}
						name="product_name"
						onChange={formik.handleChange}
						value={values?.product_name}
						maxLength={50}
					/>
				</Form.Item>

				<Form.Item
					label={
						<h2 className={`${styles.label2} mb-0`}>
							Product Description
						</h2>
					}
				>
					<p className="mb-2 text-xs">
						{values?.product_description.length === 700 ? (
							<span
								className={`${styles.charLimit} ${styles.normal}`}
							>
								120 words limit reached!
							</span>
						) : (
							<span>120 words only is allowed</span>
						)}
					</p>
					<TextArea
						name="product_description"
						label="Description"
						placeholder="Tell a story about your product. Buyers are also interested in knowing more about your product uniqueness"
						rows={6}
						onChange={formik.handleChange}
						value={values?.product_description}
						maxLength={700}
					/>
				</Form.Item>
				<Form.Item
					label={
						<h2 className={`${styles.label2} mb-0`}>
							More Details
						</h2>
					}
				>
					<ProductEditor
						content={contents}
						setContent={setContents}
					/>
				</Form.Item>
				<Form.Item>
					<div className="mt-4 w-full lg:w-3/4">
						<p className={styles.inputLabel}>Product Image</p>
						<div className="flex flex-col">
							<p className="text-base-gray-200 text-xs">
								This image will be displayed on your store page!
								(You can upload up to 3 images)
							</p>
							<p
								className={`text-black font-medium text-xs ${
									showImageFileFeedback
										? styles.showError
										: ''
								}`}
							>
								Allowed Files: PNG, JPG | Maximum file size: 2MB
							</p>
							{store?.user?.user_plan === 'Basic' &&
								['oneTimeSubscription', 'membership'].includes(
									productType
								) && (
									<h2 className="text-black font-medium text-md">
										User needs to upgrade to business plan
										to add product
									</h2>
								)}

							<div className="flex flex-col-reverse sm:flex-row">
								<div
									className={'relative ' + styles.uploadChart}
								>
									{isImageFilled && (
										<div className="absolute z-50 w-full h-full bg-transparent"></div>
									)}
									<div
										className={`${styles.upload} h-full px-5`}
										{...getRootProps()}
									>
										<div className={styles.uploadCont}>
											<Image
												style={{color: '#BFBFBF'}}
												src={CloudUpload}
												alt="upload image"
											/>
											<input
												disabled={
													store?.user?.user_plan ===
														'Basic' &&
													[
														'oneTimeSubscription',
														'membership',
													].includes(productType)
												}
												{...getInputProps()}
											/>
											<h5 className="lg:block text-primary-blue text-base pt-2 font-normal text-center">
												Drag & Drop Your Image Here{' '}
												<br /> -OR-
											</h5>
											<Button
												className="font-medium"
												disabled={
													isImageFilled ||
													(store?.user?.user_plan ===
														'Basic' &&
														[
															'oneTimeSubscription',
															'membership',
														].includes(productType))
														? true
														: false
												}
												type={
													isImageFilled ||
													(store?.user?.user_plan ===
														'Basic' &&
														[
															'oneTimeSubscription',
															'membership',
														].includes(productType))
														? 'default'
														: 'primary'
												}
											>
												Browse Image
											</Button>
										</div>
									</div>
								</div>
								<div
									className={
										imageUploads.length > 0
											? styles.isImage
											: styles.noImage + ' ml-3'
									}
								>
									{/* {console.log('imageUploads', imageUploads)} */}
									<ul className="flex flex-col mb-0">
										{imageUploads.map((fileWrap, indx) => {
											if (!(fileWrap.errors.length > 0)) {
												return (
													<ImageUpload
														key={indx}
														file={fileWrap.file}
														setUrl={setUrl}
														deleteFile={deleteFile}
													/>
												);
											} else {
												return (
													<ImageError
														key={indx}
														file={fileWrap.file}
														errors={fileWrap.errors}
														deleteFile={deleteFile}
													/>
												);
											}
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</Form.Item>

				<Form.Item>
					<div className="mt-6 w-full lg:w-3/4">
						{productType === 'digitalDownload' && (
							<div className="flex justify-between items-center w-full lg:w-2/4">
								<h2 className="text-black-100 font-semibold text-lg">
									Enable pre-orders
								</h2>
								<div className="flex">
									<Switch
										onChange={(e) => {
											setPreOrder((value) => !value);
											setFieldValue('enable_preorder', e);
										}}
										checked={preOrder}
									/>
									<h2 className="pl-6 font-semibold text-medium text-black-100">
										{preOrder ? 'ON' : 'OFF'}
									</h2>
								</div>
							</div>
						)}
						{preOrder && (
							<div className={styles.enablePreOrderCont}>
								<p className="text-base-gray-200">
									Release Date and Time
								</p>
								<Input
									type="datetime-local"
									label="Release date & time"
									className={styles.inputHeight}
									onChange={(e) => {
										setFieldValue(
											'preorder_details.preorder_release_date',
											e.target.value
										);
									}}
									value={
										values?.preorder_details
											?.preorder_release_date
									}
								/>
							</div>
						)}
						{productType === 'digitalDownload' && (
							<div className="flex justify-between items-center mt-5 w-full lg:w-2/4 pt-4">
								<h2 className="text-black-100 font-semibold text-lg">
									Content File
								</h2>
								<div className="flex">
									<Switch
										checked={contentFiles ? true : false}
										onChange={(e) => {
											setContentFiles((value) => !value);
											setFieldValue('upload_content', e);
										}}
									/>
									<h2 className="pl-6 font-semibold text-medium text-black-100">
										{contentFiles ? 'ON' : 'OFF'}
									</h2>
								</div>
							</div>
						)}
						{contentFiles && (
							<FileUpload
								initialFile={initialProduct}
								file={productFile}
								isToggleable={true}
								toggleValue={contentFiles}
								setFile={setProductFile}
								// onLoadCb={()=>setFieldValue('')}
							/>
						)}
					</div>
				</Form.Item>
				{/* {console.log("values.product_visibility_status", values.product_visibility_status)} */}
				<Form.Item>
					<div className="pt-4">
						<div className={styles.inputLabel}>Listing Status</div>
						<p className="text-base-gray-200 text-sm pt-2">
							Choose whether product should be available on your
							store and audience dashboard.
						</p>

						<div className="grey-bg bg-base-white-100 px-6 py-8 rounded-lg">
							<Radio
								value={values.product_listing_status_id}
								content={1}
								label="Activated"
								extralable="- Your product will go live and visible to audience for a purchase once you complete the creation of your product page"
								labelStyle={styles.radioLabel}
								extralableStyle={styles.extralableStyle}
								onChange={(e) => {
									// console.log("e is", e);
									setFieldValue(
										'product_listing_status_id',
										e || activateStatus[0]?.id
									);
								}}
							/>
							<Radio
								value={values.product_listing_status_id}
								content={2}
								label="Deactivated"
								extralable="- Nobody would be able to access or purchase this product until you activate it."
								labelStyle={styles.radioLabel}
								extralableStyle={styles.extralableStyle}
								onChange={(e) => {
									// console.log("e is", e);
									setFieldValue(
										'product_listing_status_id',
										e || deActivateStatus[0]?.id
									);
								}}
							/>
							<Radio
								value={values.product_listing_status_id}
								content={3}
								label="Unlisted"
								extralable="- Your product would not be visible on your store page but anyone with its direct link can purchase it."
								labelStyle={styles.radioLabel}
								extralableStyle={styles.extralableStyle}
								onChange={(e) => {
									// console.log("e is", e);
									setFieldValue(
										'product_listing_status_id',
										e || unListStatus[0]?.id
									);
								}}
							/>
						</div>
					</div>
				</Form.Item>
				<Form.Item>
					{Object.keys(errors).length > 0 &&
						Object.entries(errors).map((items, index) => {
							if (typeof items[1] === 'string') {
								return (
									<div
										key={index}
										className={
											styles.errorContent + ' h-10'
										}
									>
										<div
											style={{
												width: '25px',
												height: '25px',
											}}
										>
											<Image
												width={100}
												height={100}
												src={ErrorIcon}
												alt="error"
											/>
										</div>
										<h2 className="text-base font-medium ">
											{items[1]}
										</h2>
									</div>
								);
							}
							for (let values in items[1]) {
								return (
									<div
										key={index}
										className={
											styles.errorContent + ' h-10'
										}
									>
										<div
											style={{
												width: '25px',
												height: '25px',
											}}
										>
											<Image
												width={100}
												height={100}
												src={ErrorIcon}
												alt="error"
											/>
										</div>
										<h2 className="text-base font-medium ">
											{items[1][values]}
										</h2>
									</div>
								);
							}
						})}
				</Form.Item>
				<div className={`flex justify-center ${styles.saveButton}`}>
					<Button loading={loading} type="primary" htmlType="submit">
						Save and Continue
					</Button>
				</div>
			</Form>
		</div>
	);
};
