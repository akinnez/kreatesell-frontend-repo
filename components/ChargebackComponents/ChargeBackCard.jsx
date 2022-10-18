import Image from 'next/image';
import {GrossSales, Profit, UnitSales, Visit} from '../../utils';
import styles from './ChargeBackCard.module.scss';

export const ChargeBackCard = ({pending, won = 0, lost = 0, declined = 0}) => {
	return (
		<div className={styles.container}>
			<div className={styles.midSection}>
				<div className={styles.cardContainer}>
					<div className={styles.firstCard}>
						<div className={styles.iconCont}>
							<div className={styles.icon}>
								<Image
									src={Visit}
									width="60"
									height="60"
									alt="card icon"
								/>
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>{pending}</div>
								<div className={styles.valueText}>Pending</div>
							</div>
						</div>
					</div>

					<div className={styles.card}>
						<div className={styles.iconCont}>
							<div className={styles.icon}>
								<Image
									src={UnitSales}
									width="60"
									height="60"
									alt="card icon"
								/>
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>{won}</div>
								<div className={styles.valueText}>Won</div>
							</div>
						</div>
					</div>

					<div className={styles.card}>
						<div className={styles.iconCont}>
							<div className={styles.icon}>
								<Image
									src={GrossSales}
									width="60"
									height="60"
									alt="card icon"
								/>
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>{lost}</div>
								<div className={styles.valueText}>Lost</div>
							</div>
						</div>
					</div>

					<div className={styles.card}>
						<div className={styles.iconCont}>
							<div className={styles.icon}>
								<Image
									src={Profit}
									width="60"
									height="60"
									alt="card icon"
								/>
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>{declined}</div>
								<div className={styles.valueText}>Decline</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
