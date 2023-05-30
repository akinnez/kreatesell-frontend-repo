import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useSelector } from 'react-redux';
import { Card, Row, Col } from 'antd';

import { PlayIcon2, PlayIconBlue, LogoV2, SettingsIcon, ArrowLeft } from 'utils';
import { Button } from 'components/form-input';
import BackButton from 'components/BackButton';
import Accordion from './Accordion';
import styles from 'public/css/PreviewMembership.module.scss';
import { AuthGetProductById } from 'redux/actions';
import { CloudDownload } from 'utils/icons/CloudDownload';

const PreviewMembership = () => {
	const router = useRouter();
	const getProduct = AuthGetProductById();

	// const {pathname} = router;

	const {
		product,
		product: { product_content },
	} = useSelector((state) => state.product);

	const [activeLink, setActiveLink] = useState({});

	// console.log(activeLink, 'activeLink');
	const [activeSelectedSectionId, setActiveSelectedSectionId] =
		useState(null);
	const [accordionData, setAccordionData] = useState([]);
	const [selectedSection, setSelectedSection] = useState([]);
	const [showMobileContents, setShowMobileContents] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const css = document.createElement('style');
			css.innerHTML =
				'.ql-video { width: 100% !important; height: 368px !important;}';
			document.body.appendChild(css);
		}
	}, []);

	useEffect(() => {
		if (router.query.id) {
			getProduct(router.query.id);
		}
	}, [router.query.id]);

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
		const products = product_content.map((product) => {
			return {
				title: product.section_name,
				subList: product.product_subsection,
				id: product.id,
				product,
			};
		});
		setAccordionData(products);
	};

	const fileMedia = activeLink?.files ? activeLink?.files[0]?.filename : '';

	const fileMediaType = activeLink?.files ? activeLink?.files[0]?.type : '';

	useMemo(() => {
		if (Array.isArray(product_content) && product_content.length > 0) {
			sortProducts();
		}
	}, [product_content]);

	if (accordionData.length === 0) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<Head>
				<title>KreateSell | Preview Subscription</title>
			</Head>
			<section>

			</section>
			<div className={styles.container2}>
				<header className={`flex px-5 w-full`}>
					<div className={`flex items-center gap-5 ${styles.left}`}>
						<h3 className="hidden md:block mb-0">
							<Image
								src={LogoV2}
								onClick={() => router.push('/')}
								width={40}
								height={40}
								alt=""
							/>
						</h3>
						<div className='block md:hidden'>
							<Image alt="" src={ArrowLeft} />
						</div>
						<div className='hidden md:block'>
							<BackButton />
						</div>

					</div>
					<div
						className={`flex items-center justify-end md:gap-5 gap-3 ${styles.right}`}
					>
						<Button
							className={styles.outlinedBtn}
							htmlType="button"
							label="Edit Subscription"
							onClick={() =>
								router.push(
									`/account/kreator/products/create?productId=${router?.query?.id}&tab=one-time-subscription`
								)
							}
						/>
						<Button
							type="primary"
							onClick={() =>
								router.push(
									`/account/kreator/products/preview/${router?.query?.id}`
								)
							}
							htmlType="button"
							label="Preview and Publish"
						/>
					</div>
				</header>
				<section>
					<Row className={`${styles.largeScreen}`} gutter={[16, 16]}>
						<Col span={9} className={styles.left}>
							<Card className={styles.card}>
								<h1 className={styles.mainTitle}>
									{product?.product_details?.product_name}
								</h1>
								<hr />
								<div>
									<div className={styles.accordion}>
										{accordionData.map(
											(
												{ title, subList, product },
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
														// pathname,
													}}
												/>
											)
										)}
									</div>
								</div>
							</Card>
						</Col>
						<Col span={15} className={styles.right}>
							<Card className={styles.card}>
								{/* <h1 className={styles.sectionName}>
								How To Invest In Cryptocurrency
								</h1> */}
								<h1 className={styles.sectionTitle}>
									{activeLink?.product_section_name}
								</h1>
								{/* {activeLink?.id} */}
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
							</div>
							<Card>
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
							<h2 className={`text-left ${styles.mainTitle} ml-5 py-3 flex items-center gap-3`} onClick={() => setShowMobileContents(false)}>
								<Image alt="" src={ArrowLeft} />
								BACK
							</h2>
						)}
						<div className={`bg-white w-full mx-auto px-2 py-5`}>
							{!showMobileContents && (
								<>
									<div className={`flex items-center justify-between py-2 px-2 border-b border-gray-200 rounded-xl`}>
										<h2 className={`${styles.mainTitle}`}>
											{product?.product_details?.product_name}
										</h2>
									</div>
									<div className={`mt-3`}>
										<div className={styles.mobileAccordion}>
											{accordionData.map(
												(
													{ title, subList, product },
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
															setShowMobileContents
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
											{activeLink?.product_section_name}
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

												// style={{
												// 	padding: '1rem',
												// 	marginBottom: '1rem',
												// }}
												className='p-2 md:p-4 mb-4'
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
								</div>
							)}

						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default PreviewMembership;
