import React, {useState, useEffect, useMemo} from 'react';
import Head from 'next/head';
import styles from 'public/css/PreviewMembership.module.scss';
import Image from 'next/image';
import {PlayIcon2, PlayIconBlue, KreateSellLogo} from 'utils';
import {Button} from 'components/form-input';
import BackButton from 'components/BackButton';
import {useRouter} from 'next/router';
import {Card, Row, Col} from 'antd';
import Accordion from '../preview-membership/Accordion';
import {useSelector} from 'react-redux';
import {AuthGetProductById, GetProductByIDNotAut} from 'redux/actions';

const BuyersPreview = () => {
	const router = useRouter();
	const getProduct = GetProductByIDNotAut();

	const {
		product,
		product: {product_content},
	} = useSelector((state) => state.product);

	const [activeLink, setActiveLink] = useState({});
	const [activeSelectedSectionId, setActiveSelectedSectionId] =
		useState(null);
	const [accordionData, setAccordionData] = useState([]);
	const [selectedSection, setSelectedSection] = useState([]);

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
			};
		});
		setAccordionData(products);
	};

	const fileMedia = activeLink?.files ? activeLink?.files[0]?.filename : '';

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
				<title>KreateSell | Buyers Preview Membership</title>
			</Head>
			<div className={styles.container2}>
				<header className={`flex px-5`}>
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
					<div className={`flex items-center gap-5 ${styles.middle}`}>
						<h3 className={styles.previewTitle}>
							{product?.product_details?.product_name}
						</h3>
					</div>
					<div className={styles.right}></div>
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
											({title, subList}, idx) => (
												<Accordion
													key={idx}
													{...{
														setActiveLink,
														subList,
														title,
														activeLink,
													}}
												/>
											)
										)}
									</div>
								</div>
							</Card>
							<div
								className={`w-full mt-3 py-2 ${styles.manageMembershipContainer}`}
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
						</Col>
						<Col span={15} className={styles.right}>
							<Card className={styles.card}>
								<h1 className={styles.sectionName}>
									{activeLink?.product_section_name}
								</h1>
								{/* <h1 className={styles.sectionTitle}>
									How To Invest In Cryptocurrency
								</h1> */}
								{/* {activeLink?.id} */}
							</Card>
							<div
								style={{
									padding: '20px',
									backgroundColor: 'white',
								}}
							>
								{activeLink?.files && (
									<Image
										src={fileMedia}
										alt="media"
										width={700}
										height={450}
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
						<h2 className={`text-left ${styles.mainTitle}`}>
							{product?.product_details?.product_name}
						</h2>
						<div
							className={`flex justify-evenly ${styles.mainSections}`}
						>
							{accordionData.map(({title, id, subList}, idx) => (
								<div
									key={idx}
									className={`p-2 ${styles.title} ${
										id === activeSelectedSectionId &&
										styles.active
									}`}
									onClick={() => {
										setSelectedSection(subList);
										setActiveSelectedSectionId(id);
									}}
								>
									{title}
								</div>
							))}
						</div>
						<hr />
						{selectedSection.length > 0 && (
							<>
								<div
									className={`flex justify-evenly my-5 ${styles.subSection}`}
								>
									{selectedSection.map((sec, idx) => (
										<div
											key={idx}
											className={`p-3 ${
												styles.sections
											} ${
												activeLink?.id === sec.id &&
												styles.active2
											}`}
											onClick={() => {
												setActiveLink(sec);
											}}
										>
											{sec?.product_section_name}{' '}
											<Image
												src={
													activeLink?.id === sec.id
														? PlayIconBlue
														: PlayIcon2
												}
												width={20}
												height={15}
												alt=""
											/>
										</div>
									))}
								</div>
								<Card className={`${styles.card}`}>
									{activeLink?.id ? (
										<div>
											<h3>Lecture 1</h3>
											<h2>
												{
													product?.product_details
														?.product_name
												}
											</h2>
											<h1>
												How Cryptocurrency Came To Be
											</h1>
											<p>
												Lorem ipsum dolor sit amet,
												consectetur adipiscing elit.
												Lectus feugiat turpis sed fusce
												in. Pulvinar id enim tellus
												pharetra diam ac. Bibendum in
												consectetur amet mi condimentum
												suspendisse. Pellentes integer
												aliquet congue at proin
												adipiscing aliquet. Neque, nunc
												arcu euismod eget proin est
												volutpat, vestibulum nibh.
												Pharetra lectus semper tellus
												condimentum risus, tortor
												pulvinar nullam senectus.
												Dignissim malesuada eu, aliquam
												enim ultrices neque, eget nibh.
												At adipiscing congue bibendum
												at. Viverra justo, viverra
												dictum risus lacus nullam
												pharetra lacus. Aliquet feugiat
												magna proin elementum mauris.
												Duis vulputate ante magna
												tellus.
											</p>
											{activeLink?.id}
										</div>
									) : (
										<h2 className="text-center">
											Select a Lecture
										</h2>
									)}
								</Card>
							</>
						)}
					</div>
				</section>
			</div>
		</>
	);
};

export default BuyersPreview;
