import {useState} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useRouter} from 'next/router';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import EditorToolbar, {
	modules,
	formats,
} from '../../../../../components/PostTicket/EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {MdReply, MdClose} from 'react-icons/md';
import {Modal} from 'antd';

import {Button} from 'components/button/Button';
import AuthLayout from '../../../../../components/authlayout';
import FileUpload from 'components/PostTicket/FileUpload';
import styles from '../../../../../public/css/PostTicket.module.scss';
import {Input} from 'components/input/Input';
import {
	showToast,
	checkExpiredUserToken,
	getUserToken,
	CloseIcon,
	SuccessCheck,
} from 'utils';
import BackButton from 'components/BackButton';
import {useSelector} from 'react-redux';
import TelegramFloatingDiv from 'components/FloatingDivs/TelegramFloatingDiv';

const CardProfile = ({storeDetails, user}) => {
	return (
		<div className={styles.cardBodyDiv}>
			<div className={styles.userDiv}>
				<div className={styles.userImageDiv}>
					{storeDetails?.display_picture && (
						<Image
							src={storeDetails?.display_picture}
							width={60}
							height={60}
							layout="fixed"
							alt="Kreator's Image"
							className={styles.userImage}
						/>
					)}
					<div className={styles.checkedImage}>
						<Image
							src="/images/upgrade-active-tick.svg"
							alt="Checked"
							width={20}
							height={20}
						/>
					</div>
				</div>
				<div className={styles.userInfoDiv}>
					<h5 className={styles.userName}> {user?.full_name}</h5>
					<p className={styles.userRole}> Kreator</p>
				</div>
			</div>
		</div>
	);
};

const CardBody = (props) => {
	const {
		files,
		setFiles,
		subject,
		message,
		handleChangeSubject,
		handleChangeMessage,
		handleSubmit,
		submitting,
		uploadingFiles,
		setUploadingFiles,
	} = props;

	const router = useRouter();
	const {store} = useSelector((state) => state.store);
	return (
		<div>
			<div className={styles.cardResponsDiv}>
				<div
					className={`mb-5 flex justify-between ${styles.ticketDetailsMobile}`}
				>
					{/* FIXME: This shouldnt be here */}
					{/* <div className={`flex justify-between`}>
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
							<p className={styles.value2}>
								{router.query?.department}
							</p>
						</div>
					</div>
					<div className={styles.ticketDetail}>
						<p className={styles.title}>Submitted Date</p>
						<p className={styles.value2}>Jun 12th 2021, 3:50 PM</p>
					</div> */}
				</div>
				<CardProfile
					storeDetails={store?.store_details}
					user={store?.user}
				/>
				<div className={styles.formContainer}>
					<div className={styles.inputDiv}>
						<Input
							type="text"
							value={subject}
							placeholder="Give a heading to your ticket"
							label="Ticket Heading"
							labelStyle={styles.labelStyle}
							height={30}
							onChange={(e) => handleChangeSubject(e)}
						/>
					</div>
					<h6 className={styles.labelStyle}>Message</h6>
					<div className="text-editor">
						<EditorToolbar />
						<ReactQuill
							theme="snow"
							value={message}
							onChange={(e) => handleChangeMessage(e)}
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
							disabled={submitting || files?.length > 5}
							bgColor="blue"
							text="Submit"
							onClick={() => handleSubmit()}
						/>
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						<Button
							disabled={submitting}
							text="Cancel"
							className={styles.cancelSubmit}
							onClick={() => router.back()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const Department = () => {
	const router = useRouter();

	const [files, setFiles] = useState([]);
	const [uploadingFiles, setUploadingFiles] = useState([]);
	const [message, setMessage] = useState('');
	const [subject, setSubject] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const handleChangeSubject = (e) => setSubject(e.target.value);
	const handleChangeMessage = (e) => setMessage(e);

	const hideSuccessModal = () => setShowSuccessModal(false);
	const showSuccessModalFn = () => setShowSuccessModal(true);

	const handleSubmit = () => {
		checkExpiredUserToken();
		const token = getUserToken();

		setSubmitting(true);
		if (!subject || subject === '' || !message || message === '') {
			setSubmitting(false);
			return showToast('All fields are required', 'error');
		}
		const formData = new FormData();

		for (let i = 0; i < uploadingFiles.length; i++) {
			formData.append('ImagePaths', uploadingFiles[i]);
		}
		formData.append('Subject', subject);
		formData.append('Message', message);
		formData.append('Department', router?.query?.department);

		return axios
			.post(`${process.env.BASE_URL}tickets/Create`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setSubject('');
				setMessage('');
				setFiles([]);
				showSuccessModalFn(true);
				// showToast('Ticket have been opened successfully', 'success');
				setSubmitting(false);
			})
			.catch((err) => {
				showToast(`${err.message}`, 'error');
				setSubmitting(false);
			});
	};
	return (
		<AuthLayout>
			<div className={styles.container}>
				<TelegramFloatingDiv left="15%" top="50%" />
				<div className="mb-10">
					<BackButton />
				</div>
				<div className={styles.headerDiv}>
					<h3 className={styles.header}>Open a Ticket</h3>
					<p className={styles.subHeader}>
						This helps the assigned support team to quickly and
						efficiently attend to you without any mix up.
					</p>
				</div>
				<CardBody
					subject={subject}
					message={message}
					handleChangeSubject={handleChangeSubject}
					handleChangeMessage={handleChangeMessage}
					files={files}
					setFiles={setFiles}
					handleSubmit={handleSubmit}
					submitting={submitting}
					uploadingFiles={uploadingFiles}
					setUploadingFiles={setUploadingFiles}
				/>
			</div>
			{showSuccessModal && (
				<SuccessModal {...{showSuccessModal, hideSuccessModal}} />
			)}
		</AuthLayout>
	);
};

const SuccessModal = ({showSuccessModal, hideSuccessModal}) => {
	const router = useRouter();
	return (
		<Modal
			title={null}
			footer={null}
			visible={showSuccessModal}
			onCancel={hideSuccessModal}
			closeIcon={<Image alt="" src={CloseIcon} />}
			width={'50%'}
			style={{top: 180}}
		>
			<div className={`flex flex-col items-center p-10 ${styles.body}`}>
				<div className={`mb-5 ${styles.imageContainer}`}>
					<Image src={SuccessCheck} alt="" />
				</div>
				<h2 className={`mb-2 ${styles.mainText}`}>
					Your complaint has been submitted
				</h2>
				<p className={`text-center mb-10 ${styles.subTitle}`}>
					A member of our customer support team would get back to you
					shortly
				</p>
				<Button
					type="button"
					text="Go back"
					bgColor="blue"
					onClick={() =>
						router.push({pathname: `/account/kreator/help`})
					}
				/>
			</div>
		</Modal>
	);
};

export default Department;
