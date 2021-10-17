import { Button } from "components";
import styles from "./Domain.module.scss";

export const EmptyDomain = ({ showHeader = true }) => {
	return (
		<div>
			{showHeader && (
				<div className="flex justify-between items-center pt-2">
					<h3 className="text-black-100 font-medium text-2xl">Domains</h3>
					<div>
						<Button
							text="Connect a domain"
							bgColor="blue"
							className={styles.btnStyle}
						/>
					</div>
				</div>
			)}

			<div className="productBorder mt-4 flex items-center flex-col">
				<div className="text-base text-black-100 font-medium">
					Connect an existing domain
				</div>
				<p className="text-xs text-base-gray-200 pt-2">
					Have a domain? Connect it here.
				</p>
				<div className="mt-4">
					<Button
						text="Connect a domain"
						bgColor="blue"
						className={styles.btnStyle}
					/>
				</div>
			</div>
		</div>
	);
};
