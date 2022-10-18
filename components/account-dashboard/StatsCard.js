import Image from 'next/image';
import {GrossSales, Profit, UnitSales, Visit} from '../../utils';
import styles from '../../public/css/Dashboard.module.scss';

export const StatsCard = ({
	totalVisits,
	unitSales,
	grossSales,
	profit,
	isAffiliateCard = false,
	isAnAffiliate = false,
}) => {
	return (
		<div className={styles.container}>
			<div
				className={`${styles.midSection} ${
					isAffiliateCard && !isAnAffiliate
						? styles.notYetAnAffiliate
						: ''
				}`}
			>
				<div className={styles.cardContainer}>
					<div className={styles.firstCard}>
						<div className={styles.iconCont}>
							<div className={styles.icon}>
								<Image
									src={Visit}
									width="60"
									height="60"
									alt="visits"
								/>
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>
									{totalVisits}
								</div>
								<div className={styles.valueText}>
									Total visits
								</div>
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
									alt="unit sales"
								/>
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>{unitSales}</div>
								<div className={styles.valueText}>
									Sales in Unit
								</div>
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
									alt="gross sales"
								/>
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>{grossSales}</div>
								<div className={styles.valueText}>
									Gross Sales
								</div>
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
									alt="profits"
								/>
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>{profit}</div>
								<div className={styles.valueText}>Profit</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
