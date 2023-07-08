import styles from '../public/css/Home.module.scss';
import React from 'react';
import LogoImg from 'public/images/logo.svg';

import {MaintenanceIcon2} from '../utils';
import Image from 'next/image';

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={`${styles.body}`}>
				<nav
					className={`flex justify-center items-center py-9 bg-white absolute left-0 right-0 ${styles.boxShadow}`}
				>
					<Image src={LogoImg} alt="logo" width={140} height={30} />
				</nav>
				<div className="flex flex-col border-black justify-center items-center min-h-screen">
					<div className="hidden md:block">
						<Image
							src={MaintenanceIcon2}
							width={400}
							height={400}
							alt="maintenance icon"
						/>
					</div>
					<div className="block md:hidden">
						<Image
							src={MaintenanceIcon2}
							width={250}
							height={250}
							alt="maintenance icon"
						/>
					</div>
					<h3 className={styles.maintenanceHeader}>
						Site is under maintenance
					</h3>
					<p className={styles.maintenanceSubtitle}>
						The things we love sometimes need to be taken <br />{' '}
						care of. We are currently performing a routine site{' '}
						<br /> maintenance and KreateSell will be back soon.
					</p>
				</div>

				{/* Image comes here */}
			</div>
		</div>
	);
}
