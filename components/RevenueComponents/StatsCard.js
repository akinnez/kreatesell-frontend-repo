import Image from 'next/image';

import {Row, Col} from 'antd';

import {GrossSales, Profit, UnitSales, Visit} from '../../utils';
import styles from '../../public/css/AllRevenue.module.scss';

export const StatsCard = ({
	totalRevenue = 0,
	totalWithdrawn = 0,
	totalPending = 0,
	availableToWithdraw = 0,
}) => {
	return (
		<div className={`${styles.container} my-5`}>
			<div className={`flex justify-between items-center my-3`}>
				<h1 className={`${styles.earnings} mb-0`}>Earnings</h1>
				<h1 className={`${styles.expected} mb-0`}>
					Expected Earnings: <span>$4,500</span>
				</h1>
			</div>
			<div className={`${styles.midSection}`}>
				<div className={styles.cardContainer}>
					<Row gutter={[16, 16]} style={{width: '100%'}}>
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
											{totalRevenue}
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
											{totalWithdrawn}
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
											{totalPending}
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
											{availableToWithdraw}
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
