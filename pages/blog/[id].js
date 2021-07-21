import Image from "next/image";
import { BlogPreview } from ".";
import { Layout } from "../../components";
import { FBLike, RelatedBlog, RelatedImgSmall, BlogHero } from "../../utils";
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
					<div className={styles.emojiCont}>
						<div>
							<Image src={FBLike} width="18.75" height="19.31" />
						</div>
						<p className={styles.like}>Like</p>
						<div className={styles.divider}>|</div>
						<div className={styles.emoji}>👍 😥 ❤️</div>
					</div>
				</div>

				<div className={styles.main}>
					<div className={styles.main}>
						<div className={styles.img}>
							<Image src={BlogHero} width="723" height="433" />
						</div>
						<p>
							Meet Your New Kreatesell Store <br />
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
							pellentesque dui urna, convallis. Ut mi ut enim porttitor lacus.
							Quis convallis neque in erat amet, egestas feugiat. Mattis nullam
							id diam posuere libero leo. <br />
							You can access these features right now by logging into your
							kreatesell account and visiting your dashboard. <br />
							1. Store Builder The new store builder allows you to have far more
							control over the design and layout of your store. Make your store
							match you brand with the new powerful customization options. You
							can edit colors, fonts and so much more. Let’s dive into the what
							the new store builder is capable of. <br />
							Add Sections To Your Store One area you’ll love is the ability to
							add sections to any page on your store. Here are a few examples:{" "}
							<br />
							Video section — include YouTube/Vimeo videos on your store <br />{" "}
							Gallery section — share photos in different layouts with store
							visitors <br /> Testimonial section — encourage people to purchase
							with warm messages from previous customers Newsletter section — an
							important part of marketing is building a list of fans who you can
							promote future products to <br /> Featured product section — embed
							a featured product on any page of your store so it’s easier to
							purchase and many other types of sections
						</p>

						<div className={styles.img}>
							<Image src={BlogHero} width="723" height="433" />
						</div>
						<p>
							Meet Your New Kreatesell Store <br />
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
							pellentesque dui urna, convallis. Ut mi ut enim porttitor lacus.
							Quis convallis neque in erat amet, egestas feugiat. Mattis nullam
							id diam posuere libero leo. <br />
							You can access these features right now by logging into your
							kreatesell account and visiting your dashboard. <br />
							1. Store Builder The new store builder allows you to have far more
							control over the design and layout of your store. Make your store
							match you brand with the new powerful customization options. You
							can edit colors, fonts and so much more. Let’s dive into the what
							the new store builder is capable of. <br />
							Add Sections To Your Store One area you’ll love is the ability to
							add sections to any page on your store. Here are a few examples:{" "}
							<br />
							Video section — include YouTube/Vimeo videos on your store <br />{" "}
							Gallery section — share photos in different layouts with store
							visitors <br /> Testimonial section — encourage people to purchase
							with warm messages from previous customers Newsletter section — an
							important part of marketing is building a list of fans who you can
							promote future products to <br /> Featured product section — embed
							a featured product on any page of your store so it’s easier to
							purchase and many other types of sections
						</p>
					</div>

					<aside className={styles.aside}>
						<SideBlogPost />
						<SideBlogPost />
						<SideBlogPost />
						<div className={styles.RelatedImgSmall}>
							<Image src={RelatedImgSmall} width="350" height="308" />
						</div>
						<SideBlogPost />
						<SideBlogPost />
						<SideBlogPost />
						<div className={styles.RelatedImgSmall}>
							<Image src={RelatedImgSmall} width="350" height="308" />
						</div>
						<div className={styles.RelatedImgSmall}>
							<Image src={RelatedImgSmall} width="350" height="308" />
						</div>
					</aside>
				</div>

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

const SideBlogPost = () => {
	return (
		<div className={styles.asideContainer}>
			<div className={styles.image}>
				<Image src={RelatedBlog} width="160" height="141" />
			</div>
			<div className={styles.content}>
				<p className={styles.date}>March 05, 2021</p>
				<h4 className={styles.title}>
					A mauris morbi senectu. A mauris morbi.{" "}
				</h4>
				<div className={styles.excerpt}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum
					pellentesque dui urna, convallis. Ut mi ut enim porttitor lacus. Quis
					convallis neque in erat amet, egestas feugiat. Mattis nullam id diam
					posuere libero leo.
				</div>
			</div>
		</div>
	);
};

export default SingleBlogPost;
