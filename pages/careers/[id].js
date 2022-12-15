import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import useSWR from 'swr';
import axios from 'axios';

import ApiService from 'utils/axios';
import Spinner from 'components/Spinner';
import styles from '../../public/css/Career.module.scss';
import {
	CareerNavigationCard,
	TitleDescription,
	TitleDescriptionList,
} from '../../components/careers';
import {Layout, CareersForm, Modal, Button} from '../../components';
import {CareerSuccess, CareerFailure} from '../../utils';

export default function Career() {
	const Router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [jobStatus, setJobstatus] = useState('failure');
	const [loading, setLoading] = useState({
		submitting: false,
	});
	const fetcher = () =>
		axios
			.get(
				`${process.env.BASE_URL}admin/SingleJobRole?jobId=${Router.query.id}`
			)
			.then((res) => res?.data?.data)
			.catch((err) => {
				// console.log(err)
			});
	const {data: job, error} = useSWR(
		() =>
			!!Router.query.id
				? `${process.env.BASE_URL}admin/SingleJobRole?jobId=${Router.query.id}`
				: null,
		fetcher
	);
	const handleSubmit = (values, file) => {
		setLoading({submitting: true});
		var formData = new FormData();
		formData.append('JobsId', Router.query.id);
		formData.append('FirstName', values.first_name);
		formData.append('LastName', values.last_name);
		formData.append('Email', values.email);
		formData.append('Phone', values.phone);
		formData.append('FaceBookProfile', values.facebook);
		formData.append('InstagramProfile', values.instagram);
		formData.append('LinkedInProfile', values.linkedin);
		formData.append('Achievement', values.achievement);
		formData.append('WorkExperience', values.experience);
		formData.append('Location', values.location);
		formData.append('Gem', values.personality);
		formData.append('Consent', true);
		formData.append('portfolio', file.portfolio);
		formData.append('Files', file.fit);
		formData.append('Files', file.resume);

		ApiService.request(
			'post',
			'/admin/Apply/Jobs',
			({data}) => {
				setLoading({submitting: false});
				setJobstatus('success');
				setShowModal(true);
				// console.log(data);
			},
			(err) => {
				setLoading({submitting: false});
				setJobstatus('failure');
				setShowModal(true);
				console.log(err.message || err.data);
			},
			formData
		);
	};

	if (!job && !error) {
		return (
			<Layout subFooter={false} defaultMarginTop={true}>
				<Head>
					<title>KreateSell | Job</title>
				</Head>
				<div
					style={{paddingTop: '10px', height: 'calc(100vh - 107px)'}}
				>
					<Spinner />
				</div>
			</Layout>
		);
	}

	// if(error) return <h3>Error</h3>
	return (
		<>
			<Layout subFooter={false} defaultMarginTop={true}>
				<div className={styles.container}>
					<CareerNavigationCard
						department={job.category}
						role={job.title}
						description={`${job.location} | ${job.contract_type}`}
					/>
					<div className={styles.body}>
						<section className={styles.role}>
							<TitleDescription
								title={`${job.title} at KreateSell`}
								description={`${job.description1}`}
							/>
						</section>
						<section className={styles.about}>
							<TitleDescription
								title="About Growth Marketer Role"
								description="We are looking for a Growth Marketer to join our Marketing team and develop a strategy for exponential business growth at launch and as we scale.
                <br/><br/>
                If you're data-enthusiast, energetic, Comfortable working in a fast-paced, deadline-driven environment, don't need un-ending supervision and are confident of your abilities
                <br/><br/>
                If you answered YES to these questions, we will like you onboard our growing team.
                <br/><br/>
                You will start work as soon as the selection process is completed.
                "
							/>
						</section>
						<section className={styles.benefits}>
							<TitleDescriptionList
								title="Benefits"
								subtitle={null}
								list={job?.benefits || ''}
							/>
						</section>
						<section className={styles.responsibilities}>
							{!!job.responsibilities && (
								<TitleDescriptionList
									title="Job Responsibilities"
									subtitle={`As a ${job.title} at KreateSell, you will:`}
									list={job?.responsibilities || ''}
								/>
							)}
						</section>
						{!!job.metrics && (
							<section className={styles.metrics}>
								<TitleDescriptionList
									title="Metrics, Testing and Reporting:"
									subtitle={null}
									list={job.metrics || ''}
								/>
							</section>
						)}
						{!!job.requirements && (
							<section className={styles.requirements}>
								<TitleDescriptionList
									title={'Job Requirements'}
									subtitle={`Our ideal ${job.title} at KreateSell should have:`}
									list={job.requirements}
								/>
							</section>
						)}
						{job.attributes && (
							<section className={styles.attributes}>
								<TitleDescriptionList
									title={'Your Attributes:'}
									subtitle={null}
									list={job.attributes || ''}
								/>
							</section>
						)}
						{!!job.instructions && (
							<section className={styles.instructions}>
								<TitleDescriptionList
									title={'Important Instructions To Follow!'}
									subtitle={null}
									list={job.instructions || ''}
								/>
							</section>
						)}
					</div>
					<section id="CareerPageForm" className={styles.form}>
						<CareersForm
							submitCB={handleSubmit}
							jobID={Router.query.id}
							loading={loading}
						/>
					</section>
				</div>
			</Layout>
			<Modal
				onClose={() => setShowModal(false)}
				visible={showModal}
				cancelPropagation={true}
				containerStyle={styles.modalContainer}
				className={styles.modalOuterContainer}
				closeButton={true}
				closeBtnAction={() => setShowModal(false)}
			>
				<ApplicationStatusModal
					status={jobStatus}
					closeModal={() => setShowModal(false)}
				/>
			</Modal>
		</>
	);
}

const statusObj = {
	success: {
		icon: CareerSuccess,
		applicationStatus: 'Application Submitted Successfully',
		description:
			'Thank you for applying. Your application would be reviewed and a<br/> member of our recruitment team would contact you with further<br/> instructions if you are successful.',
		btnClassName: styles.successButtonClassName,
		btnText: 'Home',
	},
	failure: {
		icon: CareerFailure,
		applicationStatus: 'Application Failed',
		description:
			'Sorry, we encountered a problem in submitting you application.<br/> Please, try again.',
		btnClassName: styles.failureButtonClassName,
	},
};
const ApplicationStatusModal = ({status = 'success', closeModal}) => {
	const Router = useRouter();
	return (
		<div className={styles.modalBody}>
			{/* icon */}
			<Image
				src={statusObj[status].icon}
				alt="status Icon"
				width={150}
				height={200}
			/>
			<h3 className={styles.status}>
				{statusObj[status].applicationStatus}
			</h3>
			<p
				className={styles.description}
				dangerouslySetInnerHTML={{
					__html: statusObj[status].description,
				}}
			/>
			{status === 'success' ? (
				<Button
					text={'Home'}
					bgColor="blue"
					className={styles.btnCont}
					loading={false}
					onClick={() => Router.push('/careers')}
				/>
			) : (
				<Button
					text={'Try Again'}
					className={styles.errorBtnCont}
					loading={false}
					onClick={closeModal}
				/>
			)}
		</div>
	);
};
