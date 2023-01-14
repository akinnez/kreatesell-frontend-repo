import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';

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
	RenderIf,
} from 'utils';
import CustomErrorPage from 'components/CustomErrorPage/CustomErrorPage';
import {Button} from 'components/button/Button';
import BackButton from 'components/BackButton';

const CardBody = ({ticketId, ticket}) => {
	const [showIssue, setShowIssue] = useState(false);
	return (
		<>
			<div className={styles.cardResponsDiv}>
				<div
					className={`mb-5 flex justify-between ${styles.ticketDetails}`}
				>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Ticket ID</p>
						<p className={styles.value}>#{ticketId}</p>
					</div>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Status</p>
						<span className={styles.status}>{ticket.status}</span>
					</div>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Department</p>
						<p className={styles.value2}>
							{ticket.department || 'Technical'}
						</p>
					</div>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Submitted Date</p>
						<p className={styles.value2}>{ticket?.created_at}</p>
					</div>
				</div>
				<div className={`mb-10 ${styles.complainContainer}`}>
					<div className={`flex justify-between`}>
						<h2 className={`${styles.complain} mb-0`}>
							{ticket?.heading}
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
						<p
							className={`mt-5 ${styles.description}`}
							dangerouslySetInnerHTML={{
								__html: ticket.message,
							}}
						/>
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
				<RenderIf condition={ticket.replied}>
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
				</RenderIf>
			</div>
		</>
	);
};

// ticket object shape
// {
//   "id": 59,
//   "uploaded_image_list": [
//       "https://res.cloudinary.com/salvoagency/raw/upload/v1670422497/kreatesell/profilepicture/neh067jdcp3nw1ilsuve.png"
//   ],
//   "heading": "Ticket Heading",
//   "message": "<p>Testing tickets on admin</p>",
//   "replied": false,
//   "ticket_count": 1,
//   "file_path": "",
//   "status": "pending",
//   "ticket_reference": "TK#-KSmid638090827592930059",
//   "department": null,
//   "user_id": null,
//   "created_at": "2022-12-07T06:14:55.747"
// }
const Index = (props) => {
	const ticketsURL = (id) =>
		`${process.env.BASE_URL}tickets/kreator/fetch/${id}`;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [ticket, setTicket] = useState([]);
	const [ticketId, setTicketId] = useState('');
	const router = useRouter();
	useEffect(() => {
		setTicketId(router?.query?.response);
	}, [router?.query?.response]);
	const getUserTickets = async (id) => {
		const token = await getUserToken();
		try {
			const res = await axios.get(ticketsURL(id), {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTicket(res?.data);
			setLoading(false);
		} catch (error) {
			console.log(error);

			setError(true);
		}
	};

	useEffect(() => {
		if (router.query?.response) {
			getUserTickets(router.query?.response);
		}
	}, [router.query?.response]);

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
					<CardBody {...{ticketId, ticket}} />
				</div>
			</AuthLayout>
		</>
	);
};

export default Index;
