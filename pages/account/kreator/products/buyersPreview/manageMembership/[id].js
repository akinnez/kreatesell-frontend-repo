import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import styles from 'public/css/PreviewMembership.module.scss';
import { useSelector } from 'react-redux';
import { AuthGetProductById, GetProductByIDNotAut } from 'redux/actions';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { PlayIcon2, PlayIconBlue, KreateSellLogo, MastercardIcon } from 'utils';
import BackButton from 'components/BackButton';
import MembershipCancelAlert from './MembershipCancelAlert';
import MembershipCancelSuccessAlert from './MembershipCancelSuccessAlert';
import axios from 'axios';
// import {}

export const baseURL = process.env.BASE_URL;

const ManageMembership = () => {
	const router = useRouter();
	const getProduct = GetProductByIDNotAut();

	const [showCancelAlert, setShowCancelAlert] = useState(false);
	const [showSuccessCancel, setShowSuccessCancel] = useState(false);
	const [email, setEmail] = useState("")

	const {
		product,
		product: { product_content },
	} = useSelector((state) => state.product);

	// console.log(product?.product_details, 'productproductproductproduct')

	useEffect(() => {
		if (router.query.id) {
			getProduct(router.query.id);
		}
	}, [router.query.id]);

	// {
	// 	"customer_email": "string",  
	// 	"product_id": "string"
	//   }

	// /customer/unsubscribe
	const productId = router.query.id

	const handleCancelMembership = async () => {
		try {
			// const token = getToken()
			const response = await axios.post(`${baseURL}v1/customer/unsubscribe`, {
				customer_email: email,
				product_id: productId
			})
			console.log(response, 'testaRES')
			setShowCancelAlert(true)
		} catch (err) {
			console.log(err, 'testerr') 
		}
	}

	return (
		<>
			<Head>
				<title>KreateSell | Manage Membership</title>
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

				<div className="flex items-center w-full mt-4">
					<div className="flex-1 ml-9">
						<BackButton />
					</div>
					<div
						className={`flex-1 justify-center w-full ${styles.membershipHeader}`}
					>
						Manage Membership
					</div>
					<div className="flex-1"></div>
				</div>

				<div className="w-full flex justify-center items-center mt-6">
					<div className={`bg-white ${styles.manageContainer}`}>
						<h1 className={styles.manageContainerText}>
							Exixting Membership Details
						</h1>
						<p className={styles.membershipAmount}>NGN 5,000</p>

						<p className={styles.frequency}>Billing frequency</p>

						<input
							type="text"
							className={styles.frequencyInput}
							placeholder="weekly"
						/>
						<p className={`mt-3 ${styles.frequency}`}>
							Email Address
						</p>
						<input
							type="text"
							className={styles.emailInput}
							placeholder="email address"
							onChange={(e) => setEmail(e.target.value)}
						/>
						{/* <div
							className={`flex items-center justify-between ${styles.cardDetailsContainer}`}
						>
							<p className={styles.cardDetailsLeft}>
								Card details
							</p>
							<p className={styles.cardDetailsRight}>Save card</p>
						</div> */}

						{/* <div
							className={`flex items-center ${styles.cardContainer}`}
						>
							<div className={styles.cardImageContainer}>
								<Image
									src={MastercardIcon}
									width={32}
									height={19}
								/>
							</div>
							<div className="ml-3">
								<p className={styles.cardTextType}>
									Mastercard 
								</p>
								<p className={styles.cardTextExpiry}>
									Expires 12/2024
								</p>
							</div>
							<div className="ml-8">
								<p className={styles.cardTextExpiry}>
									**** **** **** 9988
								</p>
							</div>
						</div> */}

						<div
							className={styles.cancelMembershipContainer}
							onClick={() => handleCancelMembership()}
						>
							<p className={styles.cancelMemberShipText}>
								Cancel Membership
							</p>
						</div>
					</div>
				</div>
				{showCancelAlert && (
					<MembershipCancelAlert
						setShowCancelAlert={setShowCancelAlert}
						setShowSuccessCancel={setShowSuccessCancel}
					/>
				)}
				{showSuccessCancel && <MembershipCancelSuccessAlert />}
			</div>
		</>
	);
};

export default ManageMembership;
