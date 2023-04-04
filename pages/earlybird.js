import styles from '../public/css/Earlybirdhome.module.scss';
import { Navbar } from 'components/EarlybirdNav';
import MainAttention from 'components/Attention';
import SneakPeak from 'components/SneakPeak';
// import SocialIcons from "components/SocialIcons";
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { Footer } from 'components/EarlybirdFooter';
import WaitlistModal from './WaitlistModal/WaitlistModal';
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	function detailsSubmissionSuccess(msg = '') {
		const isAlreadyOnList = msg === 'already on wait-list';
		const guestStatus = isAlreadyOnList ? 'already on' : 'on';

		Modal.success({
			title: (
				<Title
					text={
						<span>
							{isAlreadyOnList ? '' : `Hurray! `}
							You&rsquo;re {guestStatus} the exclusive wait-list.
						</span>
					}
				/>
			),
			content: isAlreadyOnList ? (
				<FinalMsg text="Thank you for registering." />
			) : (
				<Content />
			),
			width: 700,
		});
	}

	function detailsSubmissionFailure() {
		Modal.error({
			title: (
				<Title
					text={
						'Sorry, we encountered a problem while saving your details.'
					}
				/>
			),
			content: <FinalMsg text="Please, try again." />,
			width: 700,
		});
	}

	return (
		<>
			<Head>
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `
            (function(m, o, n, t, e, r, _){
              m['__GetResponseAnalyticsObject'] = e;m[e] = m[e] || function() {(m[e].q = m[e].q || []).push(arguments)};
              r = o.createElement(n);_ = o.getElementsByTagName(n)[0];r.async = 1;r.src = t;r.setAttribute('crossorigin', 'use-credentials');_.parentNode .insertBefore(r, _);
          })(window, document, 'script', 'https://ga.getresponse.com/script/5ee813de-9ca5-4d1f-8300-de4d1a7fcd5c/ga.js', 'GrTracking');
            `
					}}
				/>
			</Head>
			{showModal && (
				<WaitlistModal
					setShowModal={setShowModal}
					showSubmissionSuccessModal={detailsSubmissionSuccess}
					showSubmissionFailureModal={detailsSubmissionFailure}
				/>
			)}
			<div className={styles.container}>
				<Navbar />
				<section className={styles.doFlex}>
					<MainAttention
						showSubmissionSuccessModal={detailsSubmissionSuccess}
						showSubmissionFailureModal={detailsSubmissionFailure}
						setShowModal={setShowModal}
					/>
					<SneakPeak setShowModal={setShowModal} />
				</section>
				{/* <SocialIcons /> */}
				<Footer />
			</div>
		</>
	);
}

const Title = ({ text }) => <h1 className={styles.heading}>{text}</h1>;

const Content = () => (
	<p className={styles.content}>
		You&rsquo;ll be alerted immediately{' '}
		<span className={styles.blue}>Kreate</span>
		<span className={styles.green}>Sell</span> launches.
	</p>
);

const FinalMsg = ({ text }) => <p className={styles.content}>{text}</p>;
