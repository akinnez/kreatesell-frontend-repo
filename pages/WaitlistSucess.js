import React from 'react';
import styles from '../public/css/Earlybirdhome.module.scss';
import {Navbar} from 'components/EarlybirdNav';
// import SocialIcons from "components/SocialIcons";
import 'antd/dist/antd.css';
import {Footer} from 'components/EarlybirdFooter';

const WaitlistSucess = () => {
	const onButtonClick = () => {
		// using Java Script method to get PDF file
		fetch('../KreateSell-Contact-Vcard.vcf').then((response) => {
			response.blob().then((blob) => {
				// Creating new object of PDF file
				const fileURL = window.URL.createObjectURL(blob);
				// Setting various property values
				let alink = document.createElement('a');
				alink.href = fileURL;
				alink.download = 'KreateSell-Contact-Vcard.vcf';
				alink.click();
			});
		});
	};

	return (
		<div className={styles.succesContainer}>
			<Navbar />
			<section className={styles.subheadersection}>
				<p className={styles.subheader}>Congratulations!</p>
				<div className={styles.success__msg__container}>
					<p>You have joined the exclusive early birds’ list!</p>
					<p>
						To be the first to know exactly when KreateSell launches
						and for updates on freebies and more, do these 3 things:
					</p>
					<p>
						1. Join the KreateSell Telegram channel -{' '}
						<a href="https://t.me/UseKreateSell">Click here</a>
					</p>
					<p>
						2. Join KreateSell’s Facebook Group -{' '}
						<a href="https://www.facebook.com/groups/1143014409782318/">
							Click here
						</a>
					</p>
					<p>
						3.{' '}
						<button
							onClick={() => onButtonClick()}
							style={{color: '#0072ef'}}
						>
							Click here
						</button>{' '}
						to save KreateSell’s contact to your address book
					</p>
				</div>
				<h3 className={styles.cheersText}>Cheers!</h3>
			</section>
			<Footer />
		</div>
	);
};

export default WaitlistSucess;

3;
