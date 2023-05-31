import React, {useState, useEffect, useMemo} from 'react';
import Head from 'next/head';
import styles from 'public/css/PreviewMembership.module.scss';
import Image from 'next/image';
import {
	PlayIcon2,
	PlayIconBlue,
	KreateSellLogo,
	SettingsIcon,
	ArrowLeft,
} from 'utils';
// import { Button } from 'components/form-input';
import BackButton from 'components/BackButton';
import {useRouter} from 'next/router';
import {Card, Row, Col, Modal} from 'antd';
import Accordion from '../preview-membership/Accordion';
import {CloudDownload} from 'utils/icons/CloudDownload';

import axios from 'axios';
import {Input, Button} from 'components';

const AccessPageModal = ({
	showAccessPageModal,
	errorModal,
	setErrorModal,
	closeAccessPageModal,
	setCourseContent,
	setAcessProductDetails,
	product_id,
	setProdData,
}) => {
	const productLink = `${process.env.BASE_URL}v1/kreatesell/payment/access-product`;
	const [email, setEmail] = useState('');
	const productDetailsData = {
		product_id,
		customer_phone_number: '',
		customer_email: email,
	};

	const handleSubmit = async () => {
		// TODO: show toast or error message that there's no email
		setErrorModal(false);
		if (!productDetailsData?.customer_email) return;

		// TODO: validate email address
		try {
			const response = await axios.post(productLink, productDetailsData);
			setCourseContent(response?.data?.product_dto?.product_content);
			setAcessProductDetails(response?.data?.product_dto);
			setProdData(response?.data);
			// console.log(response?.data?.total_payment_to_date,'response?.data?')
			window.localStorage?.setItem(
				'total_payments_made',
				response?.data?.total_payment_to_date
			);
			//collect course content from response
			closeAccessPageModal();
		} catch (error) {
			setErrorModal(true);
		} finally {
		}
	};

	return (
		<Modal
			title={null}
			footer={null}
			visible={showAccessPageModal}
			onCancel={() => closeAccessPageModal()}
			closeIcon={null}
			closable={true}
			width={595}
			onOk={() => {}}
			style={{top: 200}}
			// centered
		>
			<div className={styles.modal}>
				<header className={styles.header}>
					<h2 className="mb-3">
						Input your email address to get access.
					</h2>
					<p className="mb-3">
						Once you enter the email address used to purchase this
						product, you will be able to access it again.
					</p>
				</header>

				<div className={styles.modalBody}>
					<Input
						name="email"
						placeholder="Enter your email"
						label="Email address"
						height="small"
						onChange={(e) => setEmail(e.target.value)}
						containerStyle={{width: '100%'}}
					/>

					{/* TODO: show for incorrect email */}
					{errorModal && (
						<div className={styles.preorder}>
							<h5 className="mb-2">
								This email address is incorrect
							</h5>
							<p className="mb-0">
								Check to make sure your email is correct before
								proceeding. You will only have access if you use
								the right email address.
							</p>
						</div>
					)}
					<Button
						type="button"
						text="Access Product"
						loading={false}
						disabled={false}
						bgColor="blue"
						style={{width: '100%'}}
						onClick={handleSubmit}
					/>
				</div>
			</div>
		</Modal>
	);
};

const BuyersPreview = () => {
	const router = useRouter();
	const productId = router?.query?.id;

	// const {pathname} = router;

	const [activeLink, setActiveLink] = useState({});
	const [activeSelectedSectionId, setActiveSelectedSectionId] =
		useState(null);
	const [accordionData, setAccordionData] = useState([]);
	const [selectedSection, setSelectedSection] = useState([]);
	const [showAccessPageModal, setShowAccessPageModal] = useState(false);
	const [activeSectionName, setActiveSectionName] = useState(false);
	const [showMobileContents, setShowMobileContents] = useState(false);

	const [errorModal, setErrorModal] = useState(false);
	const [courseContent, setCourseContent] = useState([]);
	const [acessProductDetails, setAcessProductDetails] = useState({});
	const [prodData, setProdData] = useState({});

	const productDetails = acessProductDetails?.product_details;

	const productTypeName = acessProductDetails?.product_type_details;

	//open email modal on loading of page
	useEffect(() => {
		setShowAccessPageModal(true);
	}, []);

	//email verification modal
	const closeAccessPageModal = () => {
		setShowAccessPageModal(false);
		errorModal && setErrorModal(false);
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const css = document.createElement('style');
			css.innerHTML =
				'.ql-video { width: 100% !important; height: 368px !important;}';
			document.body.appendChild(css);
		}
	}, []);

	const handleDownload = (fileLink, extension) => {
		fetch(fileLink, {
			method: 'GET',
			headers: {
				// TODO: set content file
				// 'Content-Type': 'image/pdf',
			},
		})
			.then((response) => response.blob())
			.then((blob) => {
				// Create blob link to download
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute(
					'download',
					`${productDetails?.product_name}.${extension}`
				);

				// Append to html link element page
				document.body.appendChild(link);

				// Start download
				link.click();

				// Clean up and remove the link
				link.parentNode.removeChild(link);
			});
	};

	useEffect(() => {
		if (accordionData.length > 0) {
			// programatically select the first item in the section
			setSelectedSection(accordionData[0].subList);
			setActiveSelectedSectionId(accordionData[0].id);
		}
	}, [accordionData.length]);

	useEffect(() => {
		// programatically select the first item in subsection
		setActiveLink(selectedSection[0]);
	}, [selectedSection]);

	const sortProducts = () => {
		const products = courseContent?.map((product) => {
			return {
				title: product.section_name,
				subList: product.product_subsection,
				id: product.id,
				product,
			};
		});
		setAccordionData(products);
	};

	const fileMedia = activeLink?.files
		? activeLink?.files[activeLink?.files.length - 1]?.filename
		: '';

	const fileMediaType = activeLink?.files
		? activeLink?.files[activeLink?.files.length - 1]?.type
		: '';

	useMemo(() => {
		if (Array.isArray(courseContent) && courseContent.length > 0) {
			sortProducts();
		}
	}, [courseContent]);

	return (
		<>
			<Head>
				<title>KreateSell | Buyers Preview Membership</title>
			</Head>

			{showAccessPageModal && (
				<AccessPageModal
					showAccessPageModal={showAccessPageModal}
					errorModal={errorModal}
					setErrorModal={setErrorModal}
					closeAccessPageModal={closeAccessPageModal}
					setCourseContent={setCourseContent}
					setAcessProductDetails={setAcessProductDetails}
					product_id={productId}
					setProdData={setProdData}
				/>
			)}

			{!showAccessPageModal && (
				<div className={styles.container2}>
					<header className={`flex px-5 items-center`}>
						<div className={`flex items-center ${styles.left}`}>
							<h3 className="hidden md:block mb-0">
								<Image
									src={KreateSellLogo}
									onClick={() => router.push('/')}
									width={150}
									height={40}
									alt=""
								/>
							</h3>
						</div>
						<div
							className={`flex items-center gap-5 ${styles.middle} `}
						>
							<h3
								className={`hidden md:block ${styles.previewTitle}`}
							>
								{productDetails?.product_name}
							</h3>
						</div>
						<div
							className={`w-full hidden md:flex items-center gap-2 justify-end cursor-pointer ${styles?.left}`}
							onClick={() =>
								router.push(`/store/${prodData?.store_name}`)
							}
						>
							<div>
								{prodData?.kreator_profile_pic && (
									<Image
										src={prodData?.kreator_profile_pic}
										// onClick={() => router.push('/')}
										width={40}
										height={40}
										alt=""
									/>
								)}
							</div>
							<h3 className="text-base">
								{prodData?.kreator_name}
							</h3>
						</div>

						{/* header nav for mobile */}
						<div
							className={`md:hidden flex items-center gap-4 w-full px-2 ml-4`}
						>
							<h3 className="md:hidden block mb-0 w-1/2">
								<Image
									src={KreateSellLogo}
									onClick={() => router.push('/')}
									width={150}
									height={40}
									alt=""
								/>
							</h3>
							<div
								className="w-full flex items-center gap-2 justify-end"
								onClick={() =>
									router.push(
										`/store/${prodData?.store_name}`
									)
								}
							>
								<div>
									{prodData?.kreator_profile_pic && (
										<Image
											src={prodData?.kreator_profile_pic}
											// onClick={() => router.push('/')}
											width={40}
											height={40}
											alt=""
										/>
									)}
								</div>
								<h3 className="text-xs">
									{prodData?.kreator_name}
								</h3>
							</div>
						</div>
						{/* header nav for mobile */}
					</header>

					<section>
						<Row
							className={`${styles.largeScreen}`}
							gutter={[16, 16]}
						>
							<Col span={9} className={styles.left}>
								<Card className={styles.card}>
									<h1 className={styles.mainTitle}>
										{productDetails?.product_name}
									</h1>
									<hr />
									<div>
										<div className={styles.accordion}>
											{accordionData.map(
												(
													{title, subList, product},
													idx
												) => (
													<Accordion
														key={idx}
														// pathname={pathname}
														{...{
															setActiveLink,
															subList,
															title,
															activeLink,
															product,
															setActiveSectionName,
															// pathname,
														}}
													/>
												)
											)}
										</div>
									</div>
									{productTypeName === 'Membership' && (
										<div
											className={`w-full mt-5 py-2 ${styles.manageMembershipContainer}`}
											onClick={() =>
												router.push(
													`/account/kreator/products/buyersPreview/manageMembership/${router?.query?.id}`
												)
											}
										>
											<p
												className={`text-base text-white text-center ${styles.manageMembershipText}`}
											>
												Manage Membership
											</p>
										</div>
									)}

									{activeSectionName && (
										<div
											className={
												styles.accessDeniedContainer
											}
										>
											<h2>
												You do not have access to this
												Section
											</h2>
											<p>
												This section is only accessible
												to subscribers who have made
												payment up to x times. Please
												make more payments in your
												subscription to get access.
											</p>
											<button
												onClick={() =>
													router.push(
														`/checkout/payment/${router?.query?.id}`
													)
												}
											>
												I want to make payment
											</button>
										</div>
									)}
								</Card>
							</Col>
							<Col span={15} className={styles.right}>
								<Card className={styles.card}>
									<h1 className={styles.sectionName}>
										{activeLink?.product_section_name}
									</h1>
								</Card>
								<div
									style={{
										padding: '20px',
										backgroundColor: 'white',
									}}
								>
									{activeLink?.files &&
										fileMediaType === 'image' && (
											<Image
												src={fileMedia}
												alt="media"
												width={755}
												height={450}
												objectFit="cover"
											/>
										)}
									{activeLink?.files &&
										fileMediaType === 'audio' && (
											<audio
												controls
												controlsList="nodownload"
												className={styles.audio}
											>
												<source
													src={fileMedia}
													type="audio/mpeg"
												/>
											</audio>
										)}
									{activeLink?.files &&
										fileMediaType === 'video' && (
											<video
												controls
												controlsList="nodownload"
												loop
												src={fileMedia}
												alt=""
												className={styles.previewVideo}
											/>
										)}
									{activeLink?.files &&
										fileMediaType === 'applicaation' && (
											<div>
												<iframe
													src={`https://docs.google.com/gview?url=${fileMedia}&embedded=true`}
													style={{
														width: '100%',
														height: '400px',
														border: 'none',
													}}
												></iframe>
											</div>
										)}
								</div>

								<Card>
									{activeLink?.is_content_downloadable && (
										<Button
											icon={<CloudDownload />}
											text="Download Content"
											bgColor="blue"
											style={{
												padding: '1rem',
												marginBottom: '1rem',
											}}
											onClick={() =>
												handleDownload(
													activeLink?.files[
														activeLink?.files
															.length - 1
													]?.filename,
													activeLink?.files[
														activeLink?.files
															.length - 1
													]?.extension
												)
											}
										/>
									)}
									<div
										className={styles.sectionName}
										dangerouslySetInnerHTML={{
											__html: activeLink?.product_section_description,
										}}
									/>
								</Card>
							</Col>
						</Row>
						{/* mobile */}
						<div className={`${styles.mobile}`}>
							{showMobileContents && (
								<h2
									className={`text-left ${styles.mainTitle} ml-5 py-3 flex items-center gap-3`}
									onClick={() => setShowMobileContents(false)}
								>
									<Image alt="" src={ArrowLeft} />
									BACK
								</h2>
							)}
							<div
								className={`bg-white w-full mx-auto px-2 py-5`}
							>
								{!showMobileContents && (
									<>
										<div
											className={`flex items-center justify-between py-2 px-2 border-b border-gray-200 rounded-xl`}
										>
											<h2
												className={`${styles.mainTitle}`}
											>
												{productDetails?.product_name}
											</h2>
											{productTypeName ===
												'Membership' && (
												<h3
													className="md:hidden block mb-0"
													onClick={() =>
														router.push(
															`/account/kreator/products/buyersPreview/manageMembership/${router?.query?.id}`
														)
													}
												>
													<Image
														src={SettingsIcon}
														width={50}
														height={50}
														alt=""
													/>
												</h3>
											)}
										</div>
										<div className={`mt-3`}>
											<div
												className={
													styles.mobileAccordion
												}
											>
												{accordionData.map(
													(
														{
															title,
															subList,
															product,
														},
														idx
													) => (
														<Accordion
															key={idx}
															// pathname={pathname}
															{...{
																setActiveLink,
																subList,
																title,
																activeLink,
																product,
																setActiveSectionName,
																setShowMobileContents,
																// pathname,
															}}
														/>
													)
												)}
											</div>
										</div>
									</>
								)}
								{showMobileContents && (
									<div className={styles.right}>
										<div>
											<h1 className={styles.sectionName}>
												{
													activeLink?.product_section_name
												}
											</h1>
										</div>
										<div
											style={{
												padding: '20px',
												backgroundColor: 'white',
											}}
										>
											{activeLink?.files &&
												fileMediaType === 'image' && (
													<Image
														src={fileMedia}
														alt="media"
														width={755}
														height={450}
														objectFit="cover"
													/>
												)}
											{activeLink?.files &&
												fileMediaType === 'audio' && (
													<audio
														controls
														controlsList="nodownload"
														className={styles.audio}
													>
														<source
															src={fileMedia}
															type="audio/mpeg"
														/>
													</audio>
												)}
											{activeLink?.files &&
												fileMediaType === 'video' && (
													<video
														controls
														controlsList="nodownload"
														loop
														src={fileMedia}
														alt=""
														className={
															styles.previewVideo
														}
													/>
												)}
											{activeLink?.files &&
												fileMediaType ===
													'applicaation' && (
													<div>
														<iframe
															src={`https://docs.google.com/gview?url=${fileMedia}&embedded=true`}
															style={{
																width: '100%',
																height: '400px',
																border: 'none',
															}}
														></iframe>
													</div>
												)}
										</div>

										<Card>
											{activeLink?.is_content_downloadable && (
												<Button
													icon={<CloudDownload />}
													text="Download Content"
													bgColor="blue"
													// style={{
													// 	padding: '1rem',
													// 	marginBottom: '1rem',
													// }}
													className="p-2 md:p-4 mb-4"
													onClick={() =>
														handleDownload(
															activeLink?.files[
																activeLink
																	?.files
																	.length - 1
															]?.filename,
															activeLink?.files[
																activeLink
																	?.files
																	.length - 1
															]?.extension
														)
													}
												/>
											)}
											<div
												className={styles.sectionName}
												dangerouslySetInnerHTML={{
													__html: activeLink?.product_section_description,
												}}
											/>
										</Card>
									</div>
								)}
							</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
};

export default BuyersPreview;
