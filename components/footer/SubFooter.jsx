import { RightArrow } from "../../utils";
import { InputButton } from "../inputButton/InputButton";
import styles from "./Footer.module.scss";

export const SubFooter = () => {
	return (
		<div className={styles.subFooter}>
			<h3>
				Start making money <br /> with your content
			</h3>
			<div>
				<InputButton
					name="email"
					placeholder="Enter your email..."
					buttonText="Get Started Free"
					buttonIcon={<RightArrow />}
				/>
			</div>
		</div>
	);
};
