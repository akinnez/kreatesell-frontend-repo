import Image from 'next/image';

import {Row, Col} from 'antd';

import {GrossSales, Profit, UnitSales, Visit} from '../../utils';
import styles from '../../public/css/AllRevenue.module.scss';

export const StatsCard = ({
	totalVisits = 3,
	unitSales = 3,
	grossSales = 3,
	profit = 3,
}) => {
	return (
		<div className={`${styles.container} my-5`}>
			<div className={`flex justify-between my-3`}>
				<h1 className={`${styles.earnings} mb-0`}>Earnings</h1>
				<h1 className={`${styles.expected} mb-0`}>
					Expected Earnings: <span>$4,500</span>
				</h1>
			</div>
			<div className={`${styles.midSection}`}>
				<div className={styles.cardContainer}>
					<Row gutter={[16, 16]}>
						<Col xs={12} lg={6}>
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
											Total Revenue
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xs={12} lg={6}>
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
										<div className={styles.value}>
											{unitSales}
										</div>
										<div className={styles.valueText}>
											Withdrawn
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xs={12} lg={6}>
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
										<div className={styles.value}>
											{grossSales}
										</div>
										<div className={styles.valueText}>
											Pending for Clearance
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xs={12} lg={6}>
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
										<div className={styles.value}>
											{profit}
										</div>
										<div className={styles.valueText}>
											Available for Withdraw
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};
