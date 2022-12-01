import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {Row, Col, Modal} from 'antd';

import styles from '../../public/css/checkoutSuccess.module.scss';
import {Button, Input} from 'components';
import Spinner from 'components/Spinner';
import {
	ZipFile,
	SuccessProduct,
	OtherProductsSuccess,
	ExternalLink2,
	SuccessCheck,
	DownloadIcon2,
	SuccessKreatesellLogo,
	UserPicture,
	CourseFileIcon,
	ErrorIcon,
} from 'utils';
import CloseIcon from 'components/affiliates/CloseIcon';
import {PoweredByKS} from 'components/PoweredByKs';
import {dateOptions, timeOptions} from 'utils';
import {CloudDownload} from 'utils/icons/CloudDownload';

const AccessPageModal = ({showAccessPageModal, setShowAccessPageModal}) => {
	// make call to access page here
	return (
		<Modal
			title={null}
			footer={null}
			visible={showAccessPageModal}
			onCancel={() => setShowAccessPageModal(false)}
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
						onChange={() => {}}
						containerStyle={{width: '100%'}}
					/>

					{/* TODO: show for incorrect email */}
					{true && (
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
					/>
				</div>
			</div>
		</Modal>
	);
};

const Success = () => {
	// make call to get page details here
	const [showAccessPageModal, setShowAccessPageModal] = useState(false);
	return (
		<>
			{showAccessPageModal && (
				<AccessPageModal
					{...{showAccessPageModal, setShowAccessPageModal}}
				/>
			)}
			<div className={styles.successContainer}>
				<nav>
					<div className={styles.titleContainer}>
						<h3 className="mb-0">Think fast and slow</h3>
					</div>
					<div className={styles.profileImageContainer}>
						<div className={styles.profileImage}>
							<Image
								src={UserPicture}
								// width={'100%'}
								// height={'100%'}
								alt="user profile picture"
							/>
						</div>
						<p className="mb-0">User Name</p>
					</div>
				</nav>
				<button onClick={() => setShowAccessPageModal(true)}>
					Show Modal
				</button>
				<div className={styles.body}>
					<section className={styles.successfulPurchase}>
						<div className={styles.successText}>
							<Image className={styles.icon} src={SuccessCheck} />
							<h2 className={styles.header}>
								Thank you for your purchase!
							</h2>
							<p className={styles.description}>
								Your purchase was successful and a receipt will
								be sent to your mail.
							</p>
						</div>
						<div className={styles.item}>
							<Row gutter={[32, 32]}>
								<Col md={{span: 8}} span={8}>
									<ProductCard />
								</Col>
								<Col md={{span: 16}} span={16}>
									<PurchaseSummaryCard />
								</Col>
							</Row>
						</div>
					</section>
					<section className={styles.otherProducts}>
						<h2 className={styles.headerText}>
							Other Products by the Kreator
						</h2>
						<Row gutter={[32, 32]}>
							<Col md={{span: 8}}>
								<OtherProductsCard />
							</Col>
							<Col md={{span: 8}}>
								<OtherProductsCard />
							</Col>
							<Col md={{span: 8}}>
								<OtherProductsCard />
							</Col>
							<Col md={{span: 8}}>
								<OtherProductsCard />
							</Col>
							<Col md={{span: 8}}>
								<OtherProductsCard />
							</Col>
							<Col md={{span: 8}}>
								<OtherProductsCard />
							</Col>
						</Row>
					</section>
				</div>

				<PoweredByKS />
			</div>
		</>
	);
};

const ProductCard = ({}) => {
	return (
		<div className={styles.productCardContainer}>
			<Image
				className={`${styles.productImage} rounded-t-lg`}
				src={SuccessProduct}
				width="320"
				height="300"
				alt="product image"
			/>
			<div className={styles.productDetails}>
				<p className={styles.productName}>Think fast and slow</p>
				<div className={styles.profileImageContainer}>
					<div className={styles.profileImage}>
						<Image
							src={UserPicture}
							// width={'100%'}
							// height={'100%'}
							alt="user profile picture"
						/>
					</div>
					<p className="mb-0">User Name</p>
				</div>
			</div>
		</div>
	);
};

const OtherProductsCard = ({}) => {
	return (
		<div className={styles.otherProductCardContainer}>
			<Image
				className={`${styles.productImage} rounded-t-lg`}
				src={OtherProductsSuccess}
				width="330"
				height="250"
			/>
			<div className={styles.productDetails}>
				<div className={styles.top}>
					<p className={styles.availability}>Out of Stock</p>
					<p className={styles.amountSold}>100 Sold</p>
				</div>
				<h5>Fundamental of Graphics Design</h5>
				<div className={styles.bottom}>
					<p>NGN 1000</p>
					<Image src={ExternalLink2} className={styles.goto} />
				</div>
			</div>
		</div>
	);
};

const PurchaseSummaryCard = ({}) => {
	const handleClick = (action = 'download') => {
		if (action === 'download') {
			console.log('download');
		} else if (action === 'viewCourse') {
			console.log('view course');
		}
	};
	return (
		<div className={styles.purchaseSummaryCardContainer}>
			<p className={styles.header}>Purchase Summary</p>
			<div className={`${styles.purchase} mb-2`}>
				<Image
					className={styles.purchaseIcon}
					src={ZipFile}
					// src={CourseFileIcon}
					height="80"
					width="80"
					alt=""
				/>
				<span className="">
					<div className={styles.top}>Think fast and slow.rar</div>
					<div className={styles.bottom}>
						<div>
							<p className={styles.left}>236MB</p>|
							<p className={styles.right}>NGN 5,000</p>
						</div>
						{/* TODO: don't show this button for preorder products */}
						<Button
							text="Download File"
							bgColor="blue"
							icon={<CloudDownload />}
							style={{padding: '1rem'}}
							onClick={() => handleClick('download')}
						/>
					</div>
				</span>
			</div>
			<br />
			<hr />
			<br />
			<div className={`${styles.purchase} mb-2`}>
				<Image
					className={styles.purchaseIcon}
					src={CourseFileIcon}
					height="80"
					width="80"
					alt=""
				/>
				<span className="">
					<div className={styles.top}>Think fast and slow.rar</div>
					<div className={styles.bottom}>
						<div>
							<p className={styles.left}>236MB</p>|
							<p className={styles.right}>NGN 5,000</p>
						</div>
						{/* TODO: don't show this button for preorder products */}
						<Button
							text="Access Course"
							bgColor="blue"
							icon={<CloudDownload />}
							style={{padding: '1rem'}}
							onClick={() => handleClick('download')}
						/>
					</div>
				</span>
			</div>
			{/* FIXME: show preorder */}
			<div className={styles.preorder2}>
				Thank you for your preorder.{' '}
				<span>The expected release date is Mar 31, 2022 9:00 AM</span>
			</div>
			{/* FIXME: show error for product not available */}
			<div className={styles.error}>
				<Image src={ErrorIcon} alt="" />
				This content file is unavailable. Please reach out to the{' '}
				<Link href="#">Kreator</Link> for more details.
			</div>
		</div>
	);
};

// {new Date(
//   product?.product_details?.preoder_date
// ).toLocaleDateString('en-US', dateOptions)}{' '}
// {new Date(
//   product?.product_details?.preoder_date
// ).toLocaleString('en-US', timeOptions)}

export default Success;
