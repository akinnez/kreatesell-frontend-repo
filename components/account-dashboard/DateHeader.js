import { Select, Input } from "../";
import styles from "../../public/css/Dashboard.module.scss";
import { SVGFilter } from "../../utils";
import Image from "next/image";
import {
	dayOptions,
	kreatorsOptions,
	affiliateOptions,
	currencyOptions,
} from "./partials";
// import { format } from "date-fns";

export const DateHeader = ({ showSelect = true }) => {
	return (
		<div className={styles.container}>
			{showSelect && (
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
			)}

			<div className={styles.dateHeader}>
				<div className={styles.searchCont}>
					<Input
						placeholder="Search"
						label="Search"
						className={styles.searchStyles}
						labelStyle={styles.label}
					/>
				</div>
				<div className={styles.today}>
					<Select
						options={dayOptions}
						value="Custom Select"
						placeholder="Today"
						placeHolderColor="#8c8c8c"
						label="Show"
						className={styles.select}
						height="44px"
					/>
				</div>

				<div className={styles.currency}>
					<Select
						options={currencyOptions}
						value="Custom Select"
						placeholder="NGN"
						placeHolderColor="#8c8c8c"
						label="Currency"
						className={styles.select}
						height="44px"
					/>
				</div>

				<div className={styles.dateCont}>
					<div className={styles.label}>Date from</div>
					<div className={styles.selectDate}>
						<Input type="date" className={styles.date} />
					</div>
				</div>

				<div className={styles.dateCont}>
					<div className={styles.label}>Date to</div>
					<div className={styles.selectDate}>
						<Input type="date" className={styles.date} />
					</div>
				</div>

				<div className={styles.filterCont}>
					<Image src={SVGFilter} alt="filter" width="80" height="44" />
				</div>
			</div>
		</div>
	);
};
