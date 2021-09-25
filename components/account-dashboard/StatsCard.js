import Image from "next/image";
import { useRouter } from "next/router";
import { RightArrow, GrossSales, Profit, UnitSales, Visit } from "../../utils";
import styles from "../../public/css/Dashboard.module.scss";

export const StatsCard = ({
	name,
	totalVisits,
	unitSales,
	grossSales,
	profit,
}) => {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.midSection}>
				<div className={styles.title}>
					<div className={styles.userType}>{name}</div>

					{/* {router.pathname !==
						("/account/kreator/kreator/dashboard/affiliate" ||
							"/account/kreator/kreator/dashboard/kreator") && (
						<div
							className={styles.userTypeLink}
							onClick={() =>
								router.push(`/account/dashboard/${name.toLowerCase()}`)
							}
						>
							<p>{name}’s Dashboard</p>
							<div className={styles.arrowIcon}>
								<RightArrow color="#0072EF" />
							</div>
						</div>
					)} */}

					{router.pathname === "/account/dashboard/affiliate" && (
						<div
							className={styles.userTypeLink}
							onClick={() => router.push("/account/dashboard/affiliate/order")}
						>
							<p>See Orders</p>
							<div className={styles.arrowIcon}>
								<RightArrow color="#0072EF" />
							</div>
						</div>
					)}

					{router.pathname === "/account/dashboard/kreator" && (
						<div
							className={styles.userTypeLink}
							onClick={() => router.push("/account/dashboard/kreator/order")}
						>
							<p>See Orders</p>
							<div className={styles.arrowIcon}>
								<RightArrow color="#0072EF" />
							</div>
						</div>
					)}
				</div>

				<div className={styles.cardContainer}>
					<div className={styles.firstCard}>
						<div className={styles.iconCont}>
							<div className={styles.icon}>
								<Image src={Visit} width="60" height="60" />
							</div>
							<div className={styles.countCont}>
								<div className={styles.value}>{totalVisits}</div>
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
								<div className={styles.value}>{unitSales}</div>
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
								<div className={styles.value}>{grossSales}</div>
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
