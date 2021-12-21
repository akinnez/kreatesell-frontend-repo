import Image from "next/image";
import { Line } from "react-chartjs-2";
import { Select } from "../";
import { DownloadIcon } from "../../utils";
import { dayOptions } from "./partials";
import styles from "./Recent.module.scss";

export const RecentAnalytics = () => {
	const data = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				data: [25, 0, 50, 75, 25, 100, 50, 25, 75, 75, 25, 100],
				fill: false,
				backgroundColor: "#0072EF",
				borderColor: "#40A9FF",
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<div className={styles.container}>
			<div className={styles.download}>
				<p>Download CSV</p>
				<div className={styles.downloadIcon}>
					<Image src={DownloadIcon} />
				</div>
			</div>

			<div className={styles.analytics}>
				<div className={styles.recentSales}>
					<div className={styles.graphTitle}>
						<div className={styles.recentTitle}>Recent Sales</div>

						<div className={styles.graphLegend}>
							<div className={styles.roundIcon}></div>
							<p>Last 12 months</p>
						</div>
					</div>
					<Line data={data} options={options} />
				</div>

				<div className={styles.recentSection}>
					<div className={styles.customers}>
						<div className={styles.customerTitle}>Recent Customers</div>
						<div className={styles.customerSubTitle}>
							<ul className={styles.titleList}>
								<li>Customer name</li>
								<li>Transaction ID</li>
								<li>Date</li>
							</ul>
							<ul className={styles.contentList}>
								<li>Kathryn Murphy</li>
								<li>3455323324</li>
								<li>20/03/2021</li>
							</ul>
							<ul className={styles.contentList}>
								<li>Kathryn Murphy</li>
								<li>3455323324</li>
								<li>20/03/2021</li>
							</ul>
							<ul className={styles.contentList}>
								<li>Kathryn Murphy</li>
								<li>3455323324</li>
								<li>20/03/2021</li>
							</ul>
						</div>
					</div>

					<div className={styles.revenue}>
						<div className={styles.revenueTitle}>Total Revenue</div>
						<div className={styles.revenueAmount}>
							<sup className={styles.currency}>#</sup>0
						</div>
						<div className={styles.duration}>
							<div className={styles.selectCont}>
								<Select
									name="day"
									value="Select value"
									options={dayOptions}
									placeholder="Sales this Week"
									arrowIconColor="#0072EF"
									borderColor="#69C0FF"
									bgColor="#E6F7FF"
									placeHolderColor="#0072EF"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
