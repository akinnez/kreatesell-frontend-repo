import { Select, Input } from "components";
import { SVGFilter } from "../../utils";
import Image from "next/image";
import { dayOptions, currencyOptions } from "./partials";
import styles from "../../public/css/Dashboard.module.scss";

export const CouponHeader = ({
	handleSearchInput,
	handleProductStatus,
	handleStartDate,
	handleEndDate,
	handleSearchSubmit,
	productStatusOptions,
}) => {
	// const fmtDt = format(Date.now(), "yyyy-MM-dd");

	// useEffect(() => {}, [handleSearchInput]);

	return (
		<div className={`w-full ${styles.productHeader}`}>
			{/* <div
			className={`w-full grid gap-4 items-center grid-cols-3 lg:grid-cols-6 ${styles.productHeader}`}
		> */}
			<div className={`pt-5 w-full ${styles.searchInput}`}>
				<p className={styles.label}>Search</p>
				<Input
					placeholder="Click here to Search"
					className={styles.search}
					onChange={handleSearchInput}
				/>
			</div>

			<div className={`w-full hidden lg:block ${styles.selectToday}`}>
				<Select
					options={dayOptions}
					value="Custom Select"
					placeholder="Today"
					placeHolderColor="#8c8c8c"
					label="Show"
					height="44px"
					className="h-11"
				/>
			</div>

			<div className={`w-full ${styles.selectProduct}`}>
				<Select
					options={currencyOptions}
					placeholder="All"
					placeHolderColor="#8c8c8c"
					label="Currency"
					height="44px"
					className="h-11"
					onChange={(e) => handleProductStatus(e.value)}
				/>
			</div>

			<div className={`pt-1 w-full ${styles.fromDate}`}>
				<p className={styles.label}>From</p>
				<div>
					<input
						type="date"
						className={styles.date}
						// defaultValue={fmtDt}
						onChange={handleStartDate}
					/>
				</div>
			</div>

			<div className={`pt-1 w-full ${styles.toDate}`}>
				<p className={styles.label}>To</p>
				<div>
					<input
						type="date"
						className={styles.date}
						// defaultValue={fmtDt}
						onChange={handleEndDate}
					/>
				</div>
			</div>

			<div
				className={`h-16 py-5 w-full cursor-pointer ${styles.filterCont}`}
				onClick={handleSearchSubmit}
			>
				<Image src={SVGFilter} alt="filter" width="130" height="44" />
			</div>
		</div>
	);
};
