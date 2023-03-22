import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import useSWR from 'swr';
import axios from 'axios';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
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
	checkExpiredUserToken,
	showToast,
} from 'utils';
import CustomErrorPage from 'components/CustomErrorPage/CustomErrorPage';
// import {Button} from 'components/button/Button';
import { Button } from 'antd';
import BackButton from 'components/BackButton';
import { Input } from 'components/input/Input';
import FileUpload from 'components/PostTicket/FileUpload';

const CardBody = ({ ticketId, ticket }) => {
	const [showIssue, setShowIssue] = useState(false);
	const router = useRouter();
	const [files, setFiles] = useState([]);
	const [uploadingFiles, setUploadingFiles] = useState([]);

	// const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const [reopenSection, setReopenSection] = useState(false);

	useEffect(() => {
		if (router.query.reopen === 'true') {
			setReopenSection(true);
		}
	}, [router?.query]);

	const handleReopen = () => {
		setReopenSection(true);
	};
	const handleSubmit = () => {
		checkExpiredUserToken();
		const token = getUserToken();
		setSubmitting(true);
		if (/*!subject || subject === '' ||*/ !message || message === '') {
			setSubmitting(false);
			return showToast('All fields are required', 'error');
		}
		const formData = new FormData();
		for (let i = 0; i < uploadingFiles.length; i++) {
			formData.append('ImagePaths', uploadingFiles[i]);
		}
		formData.append('Subject', ticket.heading);
		formData.append('Message', message);
		formData.append('Department', router?.query?.department);
		return axios
			.post(
				`${process.env.BASE_URL}tickets/re-open?ticketId=${ticketId}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				// setSubject('');
				setMessage('');
				setFiles([]);
				// showSuccessModalFn(true);
				showToast(
					res?.data?.message || `Ticket has been opened successfully`,
					'success'
				);
				setSubmitting(false);
				setTimeout(() => {
					router.push('/account/kreator/help');
				}, 500);
			})
			.catch((err) => {
				showToast(`${err.message}`, 'error');
				setSubmitting(false);
			});
	};
	// console.log('ticket', ticket);

	return (
		<>
			<div className={styles.cardResponsDiv}>
				<div
					className={`mb-5 flex justify-between ${styles.ticketDetails}`}
				>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Ticket ID</p>
						<p className={styles.value}>
							{ticket?.ticket_reference}
						</p>
					</div>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Status</p>
						<span
							className={`${styles.status} ${ticket.status === 'Closed'
									? styles.closed
									: styles.open
								}`}
						>
							{ticket.status}
						</span>
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
							className="p-2"
							onClick={() => setShowIssue((prev) => !prev)}
						><span className='mr-3'>Show Message</span>{!showIssue ? (
							<Image
								src={CollapseArrowRight}
								alt="icon"
							/>
						) : (
							<Image src={CollapseArrowDown} alt="icon"/>
						)}</Button>
					</div>
					<section
						className={`${styles.complainDescription} ${showIssue ? styles.block : styles.hidden
							}`}
					>
						<p
							className={`mt-5 ${styles.description}`}
							dangerouslySetInnerHTML={{
								__html: ticket.message,
							}}
						/>
						<div className={`${styles.attachments} flex flex-col`}>
							Attachments ({ticket?.uploaded_image_list?.length})
							{/* files */}
							{Array.isArray(ticket?.uploaded_image_list) &&
								ticket?.uploaded_image_list.map((file, idx) => (
									<div
										key={idx}
										className={`flex gap-2 ${styles.files}`}
									>
										<Image src={Folder} alt="icon" />
										<a
											target="_blank"
											rel="noreferrer"
											href={file}
										>
											<p
												className={`mb-0 ${styles.fileName}`}
											>
												file-{idx}.
												{
													file.split('.')[
													file.split('.').length -
													1
													]
												}
											</p>
										</a>
									</div>
								))}
						</div>
					</section>
				</div>
				<RenderIf condition={Array.isArray(ticket.ticket_response)}>
					{ticket?.ticket_response?.map((tick) => (
						<div key={tick.id} className={styles.adminResponse}>
							<div className="flex gap-10 items-center">
								<h2 className={`mb-0 ${styles.title}`}>
									Admin Response
								</h2>
								<p className="mb-0">
									{formatDateAndTime(tick.created_at)}
								</p>
							</div>
							<p
								className={styles.response}
								dangerouslySetInnerHTML={{
									__html: tick.message,
								}}
							/>

							{/* border bottom here */}
							<RenderIf
								condition={
									Array.isArray(tick.reply_photos) &&
									tick?.reply_photos?.length > 0
								}
							>
								<div
									className={`${styles.attachments} flex flex-col`}
								>
									Attachments ({tick?.reply_photos?.length})
									{/* files */}
									<div
										className={`flex gap-4 ${styles.files}`}
									>
										<Image src={Folder} alt="icon" />
										<p
											className={`mb-0 ${styles.fileName}`}
										>
											Yesyoucan.png
										</p>
									</div>
								</div>
							</RenderIf>
							{/*TODO: Make it's own component */}
							{/* <div
								className={`mb-10 ${styles.complainContainer}`}
							>
								<div
									className={`flex justify-between items-center`}
								>
									<h2 className={`${styles.complain} mb-0`}>
										{ticket?.heading}
									</h2>
									<p className={styles.value2}>
										{formatDateAndTime(ticket?.created_at)}
									</p>
									<Button
										text="Show Message"
										icon={
											!showIssue ? (
												<Image
													src={CollapseArrowRight}
													alt="icon"
												/>
											) : (
												<Image
													src={CollapseArrowDown}
													alt="icon"
												/>
											)
										}
										className="p-2"
										onClick={() =>
											setShowIssue((prev) => !prev)
										}
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
									<div
										className={`${styles.attachments} flex flex-col`}
									>
										Attachments (
										{ticket?.uploaded_image_list?.length})
									
										{Array.isArray(
											ticket?.uploaded_image_list
										) &&
											ticket?.uploaded_image_list.map(
												(file, idx) => (
													<div
														key={idx}
														className={`flex gap-2 ${styles.files}`}
													>
														<Image
															src={Folder}
															alt="icon"
														/>
														<a
															target="_blank"
															rel="noreferrer"
															href={file}
														>
															<p
																className={`mb-0 ${styles.fileName}`}
															>
																file-{idx}.
																{
																	file.split(
																		'.'
																	)[
																		file.split(
																			'.'
																		)
																			.length -
																			1
																	]
																}
															</p>
														</a>
													</div>
												)
											)}
									</div>
								</section>
							</div> */}
						</div>
					))}
				</RenderIf>
				<RenderIf
					condition={ticket?.status?.toLowerCase() === 'closed'}
				>
					<Button
						text="Reopen"
						leftIcon={<Image alt="icon" src={MailReopen} />}
						className="p-3"
						bgColor="blue"
						onClick={handleReopen}
					/>
				</RenderIf>
				<RenderIf condition={ticket?.status?.toLowerCase() === 'open'}>
					<Button
						text="Reply"
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
							value={message}
							onChange={(e) => setMessage(e)}
							placeholder={
								'Write the details of your ticket here'
							}
							style={{ height: '200px' }}
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
					<div className={styles.digitalBtn}>
						<Button
							disabled={false || files?.length > 5}
							// bgColor="blue"
							// text="Submit Response"
							className="p-2 rounded-lg"
							type="primary"
							htmlType="submit"
							loading={submitting}
							onClick={() => handleSubmit()}
						>
							Submit Response
						</Button>
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						<Button
							disabled={false}
							// text="Cancel"
							className={styles.cancelSubmit}
							onClick={() => router.back()}
						>
							Cancel
						</Button>
					</div>
				</div>
			</RenderIf>
		</>
	);
};

{
	/* <Button
						type="primary"
						htmlType="submit" 
						loading={loading} 
						// disabled={(compareToPrice && noMatchingCurrency) || !isOpMoreThanSp}
						disabled={disableButton() || isGreaterthanSug} 
					>
						{productType === 'Digital Download'
							? 'Save and Preview'
							: 'Save and Continue'}
					</Button> */
}
const Index = (props) => {
	const ticketsURL = (id) =>
		`${process.env.BASE_URL}tickets/kreator/fetch/${id}`;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [ticket, setTicket] = useState({});
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
			setLoading(false);
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
		return (
			<AuthLayout>
				<Loader />
			</AuthLayout>
		);
	}
	// console.log('ticket', ticket);
	return (
		<>
			<AuthLayout>
				<div className="mb-10">
					<BackButton />
				</div>
				<div className={styles.container}>
					<CardBody {...{ ticketId, ticket }} />
				</div>
			</AuthLayout>
		</>
	);
};

export default Index;
