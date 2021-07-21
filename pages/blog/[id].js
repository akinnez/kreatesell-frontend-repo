import Image from "next/image";
import { BlogPreview } from ".";
import { Layout } from "../../components";
import styles from "../../public/css/SingleBlog.module.scss";

const SingleBlogPost = () => {
	return (
		<Layout defaultMarginTop={true}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>A mauris morbi senectus.</h2>
					<div className={styles.author}>
						By FARAI MUTSAKA, Associated Press{" "}
						<span className={styles.time}>16 hours ago</span>
					</div>
				</div>

				<div className={styles.main}></div>

				<div className={styles.moreNewsContainer}>
					<h3>More News</h3>
					<div className={styles.moreNews}>
						<BlogPreview />
						<BlogPreview />
						<BlogPreview />
						<BlogPreview />
						<BlogPreview />
						<BlogPreview />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SingleBlogPost;
