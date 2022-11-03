import React, {useState, useEffect} from 'react';
import Image from 'next/image';

import useSWR from 'swr';
import axios from 'axios';

import AuthLayout from 'components/authlayout';
import styles from '../../../../../public/css/Response.module.scss';
import Loader from 'components/loader';
import {
	getUserToken,
	CollapseArrowDown,
	CollapseArrowRight,
	Folder,
} from 'utils';
import CustomErrorPage from 'components/CustomErrorPage/CustomErrorPage';
import {Button} from 'components/button/Button';
import BackButton from 'components/BackButton';

const CardBody = (props) => {
	const [showIssue, setShowIssue] = useState(false);
	return (
		<>
			<div className={styles.cardResponsDiv}>
				<div
					className={`mb-5 flex justify-between ${styles.ticketDetails}`}
				>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Ticket ID</p>
						<p className={styles.value}>#456789</p>
					</div>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Status</p>
						<span className={styles.status}>Open</span>
					</div>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Department</p>
						<p className={styles.value2}>Technical</p>
					</div>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Submitted Date</p>
						<p className={styles.value2}>Jun 12th 2021, 3:50 PM</p>
					</div>
				</div>
				<div className={`mb-10 ${styles.complainContainer}`}>
					<div className={`flex justify-between`}>
						<h2 className={`${styles.complain} mb-0`}>
							Login Difficulties
						</h2>
						<Button
							text="Show Message"
							icon={
								!showIssue ? (
									<Image
										src={CollapseArrowRight}
										alt="icon"
									/>
								) : (
									<Image src={CollapseArrowDown} alt="icon" />
								)
							}
							className="p-2"
							onClick={() => setShowIssue((prev) => !prev)}
						/>
					</div>
					<section
						className={`${styles.complainDescription} ${
							showIssue ? styles.block : styles.hidden
						}`}
					>
						<p className={`mt-5 ${styles.description}`}>
							I can&apos;t seem to log into my account and i can
							not share my link with customers. I would love if
							this is resolved as soon as possible.
						</p>
						<div className={`${styles.attachments} flex flex-col`}>
							Attachments (1)
							{/* files */}
							<div className={`flex gap-2 ${styles.files}`}>
								<Image src={Folder} alt="icon" />
								<p className={`mb-0 ${styles.fileName}`}>
									Yesyoucan.png
								</p>
							</div>
						</div>
					</section>
				</div>
				<div className={styles.adminResponse}>
					<h2 className={styles.title}>Admin Response</h2>
					<p className={styles.response}>
						This would be resolved shortly. My apologies for the
						inconveniences.
					</p>
					{/* border bottom here */}
					<div className={`${styles.attachments} flex flex-col`}>
						Attachments (1)
						{/* files */}
						<div className={`flex gap-4 ${styles.files}`}>
							<Image src={Folder} alt="icon" />
							<p className={`mb-0 ${styles.fileName}`}>
								Yesyoucan.png
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const Index = (props) => {
	const ticketsURL = `${process.env.BASE_URL}auth/KreatorTickets`;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [tickets, setTickets] = useState([]);

	const getUsertTickets = async () => {
		const token = await getUserToken();
		try {
			const res = await axios.get(ticketsURL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setTickets(res?.data?.data);
			setLoading(false);
		} catch (error) {
			console.log(error);

			setError(true);
		}
	};

	useEffect(() => {
		getUsertTickets();
	}, []);

	if (error) {
		return <CustomErrorPage />;
	}

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<AuthLayout>
				<div className="mb-10">
					<BackButton />
				</div>
				<div className={styles.container}>
					<CardBody />
				</div>
			</AuthLayout>
		</>
	);
};

export default Index;
