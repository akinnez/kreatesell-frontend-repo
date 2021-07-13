import Image from "next/image";
import { Layout } from "../components";
import styles from "../public/css/HowItWorks.module.scss";
import { AddProduct, CreateStore, Publish } from "../utils";

const HowItWorks = () => {
	return (
		<Layout subFooter={true}>
			<div className={styles.container}>
				<div className={styles.title}>
					<h3>How it works</h3>
					<p>
						Amazing all-in-one tools that bring a winning customer experience
					</p>
				</div>

				<div className={styles.rowOne}>
					<div className={styles.image}>
						<Image
							src={CreateStore}
							width={280}
							height={297}
							alt="create-product"
						/>
					</div>
					<div className={styles.rowContent}>
						<div className={styles.rowNumber}>1</div>
						<div className={styles.content}>
							<h5>Create your Store</h5>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames{" "}
								<br />
								vitae, euismod sagittis elit morbi at at. Consequat etiam risus{" "}
								<br />
								lectus eget morbi nibh fringilla. Ipsum tincidunt ut nunc, lorem{" "}
								<br />
								pulvinar odio sed augue viverra. Mattis vel consectetur massa
								sagittis.
							</p>
						</div>
					</div>
				</div>

				<div className={styles.rowOne}>
					<div className={styles.rowContent}>
						<div className={styles.rowNumber}>2</div>
						<div className={styles.content}>
							<h5>Add Product</h5>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames{" "}
								<br />
								vitae, euismod sagittis elit morbi at at. Consequat etiam risus{" "}
								<br />
								lectus eget morbi nibh fringilla. Ipsum tincidunt ut nunc, lorem{" "}
								<br />
								pulvinar odio sed augue viverra. Mattis vel consectetur massa
								sagittis.
							</p>
						</div>
					</div>
					<div className={styles.image}>
						<Image
							src={AddProduct}
							width={280}
							height={297}
							alt="create-product"
						/>
					</div>
				</div>

				<div className={`${styles.rowOne} ${styles.rowThree}`}>
					<div className={styles.image}>
						<Image
							src={Publish}
							width={280}
							height={297}
							alt="create-product"
						/>
					</div>
					<div className={styles.rowContent}>
						<div className={styles.rowNumber}>3</div>
						<div className={styles.content}>
							<h5>Publish</h5>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames{" "}
								<br />
								vitae, euismod sagittis elit morbi at at. Consequat etiam risus{" "}
								<br />
								lectus eget morbi nibh fringilla. Ipsum tincidunt ut nunc, lorem{" "}
								<br />
								pulvinar odio sed augue viverra. Mattis vel consectetur massa
								sagittis.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default HowItWorks;
