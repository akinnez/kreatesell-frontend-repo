import Image from "next/image";
import { Layout } from "components";
import {
  FBLike,
  RelatedBlog,
  RelatedImgSmall,
  BlogHero,
  showToast,
} from "utils";
import styles from "public/css/SingleBlog.module.scss";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { IoFolderOpenSharp } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import {
  MdOutlineShare,
  MdOutlineCancel,
  MdOutlineModeEdit,
  MdDeleteForever,
  MdContentCopy,
} from "react-icons/md";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import { DiscussionEmbed } from "disqus-react";

const SingleBlogPost = ({ blog, recentBlogs, moreBlogs }) => {
  const router = useRouter();
  console.log(router);
  const genUrl = `https://kreatesell.com${router.asPath}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(genUrl);
    showToast("Link Copied", "success");
  };

  const disqusConfig = {
    url: genUrl,
    identifier: blog.id,
    title: blog.title,
  };

  const bgStyle = { fill: "#000000" };
  const SideBlogPost = ({
    excerpt,
    title,
    thumbnail,
    thumbnail_alt,
    created_at,
  }) => {
    return (
      <div className={styles.asideContainer}>
        <div className={styles.image}>
          <img src={thumbnail} width="160" height="141" alt={thumbnail_alt} />
        </div>
        <div className={styles.content}>
          <p className={styles.date}>
            {moment(created_at).format("MMM DD YYYY")}
          </p>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.excerpt}>{excerpt}</div>
        </div>
      </div>
    );
  };

  const BlogPreview = ({
    title,
    id,
    excerpt,
    created_at,
    thumbnail,
    thumbnail_alt = "kreatesell blog",
  }) => {
    return (
      <div className={styles.singlePost}>
        <div className={styles.singleImage}>
          <img
            src={thumbnail}
            width="345"
            height="220"
            alt={thumbnail_alt ? thumbnail_alt : title}
            className={styles.blogImage}
          />
        </div>
        <div className={styles.singleDate}>
          {moment(created_at).format("DD MMMM YYYY")} &nbsp;
          {/* {formatDistanceToNow(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDay()
            ),
            { addSuffix: true }
          )} */}
        </div>
        <Link href={`/blog/${title}/${id}`}>
          <h4 className={styles.singleTitle}>{title}</h4>
        </Link>
        <div className={styles.excerptDiv}>
          <p className={styles.singleExcerpt}>{excerpt}</p>
        </div>
        <div className={styles.divider} />
      </div>
    );
  };

  return (
    <Layout defaultMarginTop={true}>
      <Head>
        <meta name="title" content={`${blog?.title} | KreateSell Blog`} />
        <meta name="keywords" content={blog?.tags} />
        <meta name="description" content={blog?.excerpt} />

        <meta property="og:site_name" content={"KreateSell"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://kreatesell.com"} />
        <meta property="og:title" content={blog?.title} />
        <meta property="og:description" content={blog?.excerpt} />
        <meta property="twitter:card" content={blog?.excerpt} />
        <meta property="twitter:url" content={"https://kreatesell.com"} />
        <meta property="twitter:title" content={blog?.title} />
        {/* <meta name="twitter:site" content={twitterHandle} />
			<meta name="twitter:creator" content={twitterHandle} /> */}
        <meta property="twitter:description" content={blog?.excerpt} />
        <meta property="twitter:image:alt" content={blog?.thumbnail_alt} />

        <title>{`${blog?.title} | KreateSell Blog`}</title>
      </Head>
      <div className={styles.container}>
        <article className={styles.blogArticleStyle}>
          <section className={styles.blogMain}>
            <div className={styles.header}>
              <h2 className={styles.title}>{blog?.title}</h2>
              <div className={styles.smallInfoDiv}>
                <div className={styles.smallInfoCategoryDiv}>
                  <IoFolderOpenSharp className={styles.smallIcon} />
                  <p> {blog?.category}</p> &nbsp;
                </div>
                <div className={styles.smallInfoDateDiv}>
                  <AiOutlineClockCircle className={styles.smallIcon} />
                  <p>
                    {formatDistanceToNow(
                      new Date(
                        new Date(blog?.created_at).getFullYear(),
                        new Date(blog?.created_at).getMonth(),
                        new Date(blog?.created_at).getDay()
                      ),
                      { addSuffix: true }
                    )}
                  </p>
                  &nbsp;
                </div>
                <div className={styles.smallInfoDateDiv}>
                  <AiOutlineClockCircle className={styles.smallIcon} />
                  <p>{blog?.read_minutes} min read</p>
                  &nbsp;
                </div>
              </div>
              <div className={styles.author}>
                <img
                  src="/images/placeholder-2.jpg"
                  alt="admin"
                  className={styles.adminImage}
                />
                <div className={styles.adminNameDiv}>
                  <h6 className={styles.adminName}>By FARAI MUTSAKA</h6>
                  <p className={styles.adminTitle}>Admin</p>
                </div>
              </div>
              <div className={styles.thumbnailDiv}>
                <img
                  src={blog?.thumbnail}
                  className={styles.thumbnailImage}
                  alt={blog?.thumbnail_alt}
                />
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog?.description }}></div>
            <br />
            <div className={styles.blogBottomDiv}>
              <div className={styles.likeDiv}>
                <AiFillLike className={styles.likeIcon} /> {blog?.like_count}
              </div>
              <section className={styles.socialsSection}>
                <div className={styles.socialsDiv}>
                  <div className={styles.likeButtonDiv}>
                    <AiFillLike className={styles.likeIcon} /> Like
                  </div>
                </div>
                <div className={styles.socialDiv}>
                  <ul className={styles.socialUl}>
                    <li className={styles.socialLi}>
                      <FacebookShareButton url={genUrl}>
                        <FacebookIcon size={"1.4rem"} bgStyle={bgStyle} />
                      </FacebookShareButton>
                    </li>
                    <li className={styles.socialLi}>
                      <LinkedinShareButton
                        url={genUrl}
                        title={blog?.title}
                        summary={blog?.excerpt}
                        source="www.kretesell.com"
                        windowWidth={750}
                        windowHeight={600}
                      >
                        <LinkedinIcon size={"1.4rem"} round bgStyle={bgStyle} />
                      </LinkedinShareButton>
                    </li>
                    <li className={styles.socialLi}>
                      <WhatsappShareButton
                        url={genUrl}
                        title={blog?.title}
                        separator=":: "
                      >
                        <WhatsappIcon size={"1.4rem"} round bgStyle={bgStyle} />
                      </WhatsappShareButton>
                    </li>
                    <li className={styles.socialLi}>
                      <TwitterShareButton
                        url={genUrl}
                        title={blog?.title}
                        windowWidth={750}
                        windowHeight={600}
                      >
                        <TwitterIcon size={"1.4rem"} round bgStyle={bgStyle} />
                      </TwitterShareButton>
                    </li>
                  </ul>
                  <div className={styles.copyBtnDiv}>
                    <button
                      className={styles.copyBtn}
                      onClick={() => handleCopyLink(genUrl)}
                    >
                      <MdContentCopy className={styles.copyIcon} /> Copy Link
                    </button>
                  </div>
                </div>
              </section>
            </div>
            <br />
            <br />
            {/* Disqus Section */}
            <div className={styles.disqusSection}>
              <DiscussionEmbed
                shortname={process.env.DISQUS_SHORTNAME}
                config={disqusConfig}
              />
            </div>
          </section>
          <aside className={styles.aside}>
            <h3 className={styles.heading}>Latest Posts</h3>
            <div className={styles.line} />
            <div className={styles.sideBlogDiv}>
              {recentBlogs?.data &&
                recentBlogs?.data
                  ?.filter((item) => item?.id !== blog?.id)
                  .slice(0, 6)
                  .map((item, index) => (
                    <SideBlogPost
                      key={index}
                      excerpt={item.excerpt}
                      title={item?.title}
                      thumbnail={item?.thumbnail}
                      thumbnail_alt={item?.thumbnail_alt}
                      created_at={item?.created_at}
                    />
                  ))}
            </div>
            <br />
            <br />
            <section>
              <h3 className={styles.heading}>Tags:</h3>
              <div className={styles.tagsContainer}>
                <br />
                {blog?.tags?.split(",").map((item, index) => (
                  <div key={`${item}mm${index}`} className={styles.blogTag}>
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </article>
        <br />
        <div className={styles.moreNewsContainer}>
          <h3 className={styles.moreNewsHeading}>More News</h3>
          <div className={styles.moreNews}>
            {moreBlogs &&
              moreBlogs?.length > 0 &&
              moreBlogs
                ?.filter((item) => item?.id !== blog?.id)
                .slice(0, 6)
                .map((item, index) => (
                  <BlogPreview
                    key={index}
                    excerpt={item.excerpt}
                    title={item?.title}
                    thumbnail={item?.thumbnail}
                    thumbnail_alt={item?.thumbnail_alt}
                    created_at={item?.created_at}
                  />
                ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths(context) {
  let result = {};
  try {
    result = await axios.get(`${process.env.BASE_URL}blogs/posts`);
  } catch (error) {
    console.log(error);
  }
  const paths = result?.data?.data?.map((item, index) => ({
    params: { title: item?.category || null, id: item?.id || null },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let result = {};
  let resultTwo = {};
  let moreBlogs = {};
  try {
    result = await axios.get(
      `${process.env.BASE_URL}blogs/posts/${context.params.id}`
    );
    resultTwo = await axios.get(
      `${process.env.BASE_URL}blogs/posts/active?page=${1}`
    );
    moreBlogs = await axios.get(
      `${process.env.BASE_URL}blogs/post-category/${context.params.title}`
    );
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      blog: result?.data,
      recentBlogs: resultTwo?.data ? resultTwo?.data : {},
      moreBlogs: moreBlogs?.data ? moreBlogs?.data : {},
    }, // will be passed to the page component as props
  };
}

export default SingleBlogPost;
