import { Select, Input } from "components";
import { SVGFilter } from "../../utils";
import Image from "next/image";
import { dayOptions } from "./partials";
import styles from "../../public/css/Dashboard.module.scss";
import { format } from "date-fns";

export const ProductHeader = () => {
	const fmtDt = format(Date.now(), "yyyy-MM-dd");

	return (
		<div
			className={`w-full flex flex-col lg:flex-row items-center ${styles.productHeader}`}
		>
			<div className="flex w-full lg:w-1/2 justify-evenly">
				<div className="w-1/2 md:w-full pr-4 pt-3">
					<p className={styles.label}>Search</p>
					<Input placeholder="Search" className={styles.search} />
				</div>

				<div className="hidden lg:block w-full h-11 pr-4 pt-2">
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

				<div className="w-1/2 md:w-full h-11 lg:pr-4 pt-2">
					<Select
						options={dayOptions}
						value="Custom Select"
						placeholder="All"
						placeHolderColor="#8c8c8c"
						label="Product Type"
						height="44px"
						className="h-11"
					/>
				</div>
			</div>

			<div className="flex w-full lg:w-1/2 justify-evenly lg:justify-between pt-3 items-center">
				<div className="w-2/5 pr-2 md:pr-0">
					<p className={styles.label}>Date from</p>
					<div>
						<input type="date" className={styles.date} defaultValue={fmtDt} />
					</div>
				</div>

				<div className="w-2/5 pr-2 md:pr-0">
					<p className={styles.label}>Date to</p>
					<div>
						<input type="date" className={styles.date} defaultValue={fmtDt} />
					</div>
				</div>

				<div className="h-16 py-5">
					<Image src={SVGFilter} alt="filter" width="80" height="40" />
				</div>
			</div>
		</div>
	);
};
