import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';

import useSWR from 'swr';
import axios from 'axios';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import EditorToolbar, {
	modules,
	formats,
} from '../../../../../components/PostTicket/EditorToolbar';
import 'react-quill/dist/quill.snow.css';

import AuthLayout from 'components/authlayout';
import styles from '../../../../../public/css/Response.module.scss';
import Loader from 'components/loader';
import {
	getUserToken,
	CollapseArrowDown,
	CollapseArrowRight,
	Folder,
	RenderIf,
	MailReopen,
	formatDateAndTime,
} from 'utils';
import CustomErrorPage from 'components/CustomErrorPage/CustomErrorPage';
import {Button} from 'components/button/Button';
import BackButton from 'components/BackButton';
import {Input} from 'components/input/Input';
import FileUpload from 'components/PostTicket/FileUpload';

const CardBody = ({ticketId, ticket}) => {
	const [showIssue, setShowIssue] = useState(false);

	const [files, setFiles] = useState([]);
	const [uploadingFiles, setUploadingFiles] = useState([]);

	const [reopenSection, setReopenSection] = useState(false);
	const handleReopen = () => {
		setReopenSection(true);
	};

	const handleSubmit = () => {
		// checkExpiredUserToken();
		// const token = getUserToken();
		// setSubmitting(true);
		// if (!subject || subject === '' || !message || message === '') {
		// 	setSubmitting(false);
		// 	return showToast('All fields are required', 'error');
		// }
		// const formData = new FormData();
		// for (let i = 0; i < uploadingFiles.length; i++) {
		// 	formData.append('ImagePaths', uploadingFiles[i]);
		// }
		// formData.append('Subject', subject);
		// formData.append('Message', message);
		// formData.append('Department', router?.query?.department);
		// return axios
		// 	.post(`${process.env.BASE_URL}tickets/Create`, formData, {
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	})
		// 	.then((res) => {
		// 		setSubject('');
		// 		setMessage('');
		// 		setFiles([]);
		// 		showSuccessModalFn(true);
		// 		// showToast('Ticket have been opened successfully', 'success');
		// 		setSubmitting(false);
		// 	})
		// 	.catch((err) => {
		// 		showToast(`${err.message}`, 'error');
		// 		setSubmitting(false);
		// 	});
	};
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
						<p className={styles.value2}>
							{formatDateAndTime(ticket?.created_at)}
						</p>
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
				<RenderIf condition={true || ticket.status === 'closed'}>
					<Button
						text="Repopen"
						leftIcon={<Image alt="icon" src={MailReopen} />}
						className="p-3"
						bgColor="blue"
						onClick={handleReopen}
					/>
				</RenderIf>
			</div>
			<RenderIf condition={reopenSection}>
				<div className={styles.formContainer}>
					<h6 className={styles.labelStyle}>Message</h6>
					<div className="text-editor">
						<EditorToolbar />
						<ReactQuill
							theme="snow"
							value={''}
							onChange={(e) => console.log(e)}
							placeholder={
								'Write the details of your ticket here'
							}
							style={{height: '200px'}}
							modules={modules}
							formats={formats}
						/>
					</div>

					<br />
					<h6 className={styles.labelStyle}>Attachment</h6>
					<FileUpload
						files={files}
						setFiles={setFiles}
						uploadingFiles={uploadingFiles}
						setUploadingFiles={setUploadingFiles}
					/>
					<br />
					<div style={{marginTop: '6px'}}>
						<Button
							disabled={false || files?.length > 5}
							bgColor="blue"
							text="Submit Response"
							className="p-2"
							onClick={() => handleSubmit()}
						/>
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						<Button
							disabled={false}
							text="Cancel"
							className={styles.cancelSubmit}
							onClick={() => router.back()}
						/>
					</div>
				</div>
			</RenderIf>
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
	// console.log('ticket', ticket);
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
