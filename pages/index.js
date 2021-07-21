import { Layout } from "../components";
import styles from "../public/css/Home.module.scss";

export default function Home() {
	return (
		<Layout subFooter={true} defaultMarginTop={true}>
			<h1 className={styles.container}>Kreatesell Home Page</h1>
		</Layout>
	);
}
