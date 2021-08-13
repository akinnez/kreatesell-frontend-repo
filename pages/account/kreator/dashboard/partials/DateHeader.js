import { Select, Input } from "../../../../../components";
import styles from "../../../../../public/css/Dashboard.module.scss";

export const DateHeader = () => {
	const dayOptions = [
		{ value: "Custom", label: "Custom" },
		{ value: "Today", label: "Today" },
		{ value: "Yesterday", label: "Yesterday" },
		{ value: "Last 7 days", label: "Last 7 days" },
		{ value: "Last 30 days", label: "Last 30 days" },
		{ value: "This year", label: "This year" },
		{ value: "All time", label: "All time" },
	];

	const kreatorsOptions = [
		{ value: "Kreator’s Dashboard", label: "Kreator’s Dashboard" },
		{ value: "Quick Stats", label: "Quick Stats" },
		{ value: "Add Product", label: "Add Product" },
		{ value: "Coupons", label: "Coupons" },
		{ value: "Affiliate Options", label: "Affiliate Options" },
		{ value: "Reports", label: "Reports" },
	];

	const affiliateOptions = [
		{ value: "Affiliate Dashboard", label: "Affiliate Dashboard" },
		{ value: "Quick Stats", label: "Quick Stats" },
		{ value: "Find Products", label: "Find Products" },
	];
	return (
		<div className={styles.container}>
			<div className={styles.selector}>
				<div className={styles.kreatorSelect}>
					<Select
						options={kreatorsOptions}
						placeholder="Kreators"
						value="Custom Select"
						border="none"
						transparentBg={true}
					/>
				</div>
				<div className={styles.affiliateSelect}>
					<Select
						options={affiliateOptions}
						placeholder="Affiliates"
						value="Custom Select"
						border="none"
						transparentBg={true}
					/>
				</div>
			</div>

			<div className={styles.searchDate}>
				<div className={styles.selectDayCont}>
					<div className={styles.filter}>Filter</div>
					<div className={styles.selectDay}>
						<Select
							options={dayOptions}
							value="Custom Select"
							placeholder="Today"
						/>
					</div>
				</div>

				<div className={styles.selectCurrencyCont}>
					<div className={styles.filter}>Currency</div>
					<div className={styles.selectCurrency}>
						<Select
							options={dayOptions}
							value="Custom Select"
							placeholder="All Currencies"
						/>
					</div>
				</div>

				<div className={styles.fromDateCont}>
					<div className={styles.label}>Show from</div>
					<div className={styles.selectDate}>
						<Input type="date" className={styles.date} />
					</div>
				</div>

				<div className={styles.toDateCont}>
					<div className={styles.filter}>to</div>
					<div className={styles.toDate}>
						<Input type="date" className={styles.date} />
					</div>
				</div>
			</div>
		</div>
	);
};
