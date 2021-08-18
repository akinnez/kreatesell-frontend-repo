import Image from "next/image";
import { Layout, Pagination } from "../../components";
import styles from "../../public/css/Blog.module.scss";
import { BlogHero, SingleBlog } from "../../utils";

const Blog = () => {
	return (
		<Layout defaultMarginTop={true}>
			<div className={styles.container}>
				<div className={styles.pageTitle}>
					<h3>Kreatesell blog</h3>
					<p>Tips to make money online and Kreatesell updates.</p>
				</div>

				<div className={styles.hero}>
					<div className={styles.heroImage}>
						<Image src={BlogHero} width="635" height="380" />
					</div>
					<div className={styles.content}>
						<div className={styles.date}>March 05, 2021</div>
						<h2 className={styles.title}>A mauris morbi senectus. </h2>
						<p className={styles.excerpt}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
							pellentesque dui urna, convallis. Ut mi ut enim porttitor lacus.
							Quis convallis neque in erat amet, egestas feugiat. Mattis nullam
							id diam posuere libero leo.
						</p>
					</div>
				</div>

				{/* Dummy Blog Post. Blog data will be mapped here */}
				<div className={styles.singlePostContainer}>
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
					<BlogPreview />
				</div>
				{/* Dummy Blog Post. Blog data will be mapped here */}

				{/* Pagination */}
				<div className={styles.pagination}>
					<Pagination
						onPageChange={null}
						totalCount={100}
						currentPage={1}
						pageSize={9}
						className="pagination-bar"
					/>
				</div>
				{/* Pagination */}
			</div>
		</Layout>
	);
};

export const BlogPreview = () => {
	return (
		<div className={styles.singlePost}>
			<div className={styles.singleImage}>
				<Image src={SingleBlog} width="345" height="220" />
			</div>
			<div className={styles.singleDate}>March 05, 2021</div>
			<h4 className={styles.singleTitle}>
				A mauris morbi senectu. A mauris morbi.
			</h4>
			<p className={styles.singleExcerpt}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
				pellentesque dui urna, convallis. Ut mi ut enim porttitor lacus. Quis
				convallis neque in erat amet, egestas feugiat. Mattis nullam id diam
				posuere libero leo.
			</p>
			<div className={styles.divider} />
		</div>
	);
};

export default Blog;
