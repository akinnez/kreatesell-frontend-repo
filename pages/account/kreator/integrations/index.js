import Head from 'next/head';
import AuthLayout from 'components/authlayout';
import Image from 'next/image';
import { ComingSoon, Mailchimp, GetResponse, Zapier } from 'utils';
import styles from 'public/css/AbandonedCarts.module.scss';

const Integrations = () => {


	return (
		<AuthLayout>
			<Head>
				<title>KreateSell | Integrations</title>
			</Head>
			<div className="w-full h-5/6 bg-white flex items-center justify-center">
				<div className="bg-white">
					<div className="ml-36">
						<Image
							src={ComingSoon}
							alt="commingsoonicon"
							width={105}
							height={120}
						// className='ml-5'
						/>
					</div>
					<h1 className={styles.abadonedCartText}>Coming Soon!</h1>
					<p className={styles.abadonedCartP}>
						You can now integrate apps such as mailchimp
					</p>
					<p className={styles.abadonedCartP}>
						Zapier and Getresponse into the platform without{' '}
					</p>
					<p className={styles.abadonedCartP}>
						having to go to their individual sites.
					</p>
					<div className='mt-2 flex items-center justify-center p-4'>
						<div className='p-2'>
							<Image
								src={Mailchimp}
								alt="Mailchimpicon"
								width={100}
								height={25}
							// className='ml-5'
							/>
						</div>
						<div className='p-2'>
							<Image
								src={Zapier}
								alt="Zapiericon"
								width={105}
								height={27}
							// className='ml-5'
							/>
						</div>
						<div className='p-2'>
							<Image
								src={GetResponse}
								alt="GetResponseicon"
								width={110}
								height={15}
							// className='ml-5'
							/>
						</div>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Integrations;  
