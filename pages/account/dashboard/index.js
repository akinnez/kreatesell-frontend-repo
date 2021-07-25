import { useState } from "react";
import Image from "next/image";
// import { Input, Select } from "../../../components";
import { Input } from "../../../components";
import Select from "react-select";
import { format } from "date-fns";
import { DateRangePicker } from "react-dates";
import { AuthLayout } from "../../../components/authlayout";
import styles from "../../../public/css/Dashboard.module.scss";
import {
	GrossSales,
	Profit,
	UnitSales,
	Visit,
	RightArrow,
} from "../../../utils";

const Dashboard = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [focusedInput, setFocusedInput] = useState(null);

	const date = format(new Date(), "yyyy-LL-d");

	const dayOptions = [
		{ value: "Today", label: "Today" },
		{ value: "Yesterday", label: "Yesterday" },
		{ value: "Last 7 days", label: "Last 7 days" },
		{ value: "Last 30 days", label: "Last 30 days" },
		{ value: "This year", label: "This year" },
		{ value: "All time", label: "All time" },
	];

	return (
		<AuthLayout>
			<div className={styles.container}>
				<div className={styles.searchDate}>
					<div className={styles.input}>
						<Input type="search" placeholder="Search" />
					</div>

					<div className={styles.dayAndDate}>
						<div className={styles.selectCont}>
							<Select
								name="day"
								value="Select value"
								options={dayOptions}
								className={styles.select}
							/>
						</div>
						<div className={styles.date}>
							<DateRangePicker
								startDate={startDate}
								startDateId="your_unique_start_date_id"
								endDate={endDate}
								endDateId="your_unique_end_date_id"
								onDatesChange={({ startDate, endDate }) => {
									setEndDate(endDate);
									setStartDate(startDate);
								}}
								focusedInput={focusedInput}
								onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
								startDatePlaceholderText={date}
								endDatePlaceholderText={date}
							/>
						</div>
					</div>
				</div>

				<div className={styles.midSection}>
					<div className={styles.title}>
						<div className={styles.userType}>Kreator</div>
						<div className={styles.userTypeLink}>
							<p>Kreator’s’s Dashboard</p>
							<div className={styles.arrowIcon}>
								<RightArrow color="#0072EF" />
							</div>
						</div>
					</div>
					<div className={styles.cardContainer}>
						<div className={styles.firstCard}>
							<div className={styles.iconCont}>
								<div className={styles.icon}>
									<Image src={Visit} width="60" height="60" />
								</div>
								<div className={styles.countCont}>
									<div className={styles.value}>23456</div>
									<div className={styles.valueText}>Total visits</div>
								</div>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.iconCont}>
								<div className={styles.icon}>
									<Image src={UnitSales} width="60" height="60" />
								</div>
								<div className={styles.countCont}>
									<div className={styles.value}>23456</div>
									<div className={styles.valueText}>Sales in Unit</div>
								</div>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.iconCont}>
								<div className={styles.icon}>
									<Image src={GrossSales} width="60" height="60" />
								</div>
								<div className={styles.countCont}>
									<div className={styles.value}>23456</div>
									<div className={styles.valueText}>Gross Sales</div>
								</div>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.iconCont}>
								<div className={styles.icon}>
									<Image src={Profit} width="60" height="60" />
								</div>
								<div className={styles.countCont}>
									<div className={styles.value}>23456</div>
									<div className={styles.valueText}>Profit</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.midSection}>
					<div className={styles.title}>
						<div className={styles.userType}>Affiliate</div>
						<div className={styles.userTypeLink}>
							<p>Affiliate’s Dashboard</p>
							<div className={styles.arrowIcon}>
								<RightArrow color="#0072EF" />
							</div>
						</div>
					</div>
					<div className={styles.cardContainer}>
						<div className={styles.firstCard}>
							<div className={styles.iconCont}>
								<div className={styles.icon}>
									<Image src={Visit} width="60" height="60" />
								</div>
								<div className={styles.countCont}>
									<div className={styles.value}>23456</div>
									<div className={styles.valueText}>Total visits</div>
								</div>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.iconCont}>
								<div className={styles.icon}>
									<Image src={UnitSales} width="60" height="60" />
								</div>
								<div className={styles.countCont}>
									<div className={styles.value}>23456</div>
									<div className={styles.valueText}>Sales in Unit</div>
								</div>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.iconCont}>
								<div className={styles.icon}>
									<Image src={GrossSales} width="60" height="60" />
								</div>
								<div className={styles.countCont}>
									<div className={styles.value}>23456</div>
									<div className={styles.valueText}>Gross Sales</div>
								</div>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.iconCont}>
								<div className={styles.icon}>
									<Image src={Profit} width="60" height="60" />
								</div>
								<div className={styles.countCont}>
									<div className={styles.value}>23456</div>
									<div className={styles.valueText}>Profit</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Dashboard;
