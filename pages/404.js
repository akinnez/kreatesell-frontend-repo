import { Button } from "components";
import { ErrorImage } from "utils";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../public/css/error-404.module.scss";

const CustomErrorPage = () => {
	const router = useRouter();

	return (
		<div className={styles.error404}>
			<div>
				<Image src={ErrorImage} alt="page not found" />
			</div>

			<div>
				<h3 className="font-bold text-base-gray text-lg">Page not found.</h3>

				<p className="text-base-gray-200 text-sm">
					The page you are looking for might have been removed.
				</p>

				<div className={styles.btnCont}>
					<Button
						text="Return to home"
						bgColor="primaryBlue"
						className={styles.btn}
						onClick={() => router.push("/")}
					/>
				</div>
			</div>
		</div>
	);
};

export default CustomErrorPage;
