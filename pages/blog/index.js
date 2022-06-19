import { useState, useEffect } from "react";
import Image from "next/image";
import { Layout } from "../../components";
import { Pagination } from "antd";
import styles from "../../public/css/Blog.module.scss";
// import { BlogHero, SingleBlog } from "../../utils";
import axios from "axios";
import moment from "moment";
import CustomErrorPage from "components/CustomErrorPage/CustomErrorPage";
// import Loader from "components/loader";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Link from "next/link";
import Router, { withRouter } from "next/router";

const Blog = ({ router }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [_, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [mostRecentBlog, setMostRecentBlog] = useState(null);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const reqOne = axios.get(
          `${process.env.BASE_URL}blogs/posts/active?page=${router.query.page}`
        );

        const reqTwo = axios.get(
          `${process.env.BASE_URL}blogs/posts/active?page=${1}`
        );

        const [resOne, resTwo] = await Promise.all([reqOne, reqTwo]);
        setBlogs(resOne.data);
        setMostRecentBlog(resTwo.data.data[0]);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };

    func();
  }, [router.query.page]);

  const paginationHandler = (page, pageSize = 10) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  if (errorMessage) return <CustomErrorPage message={errorMessage} />;

  return (
    <Layout defaultMarginTop={true}>
      <div className={styles.container}>
        <div className={styles.pageTitle}>
          <h3>Kreatesell blog</h3>
          <p>Tips to make money online and Kreatesell updates.</p>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroImage}>
            {mostRecentBlog?.thumbnail &&
              mostRecentBlog?.thumbnail !== "string" && (
                <Image
                  src={mostRecentBlog?.thumbnail}
                  alt={mostRecentBlog?.thumbnail_alt}
                  width="635"
                  height="380"
                />
              )}
          </div>
          <div className={styles.content}>
            <div className={styles.date}>
              {moment(mostRecentBlog?.created_at).format("MMMM, DD YYYY")}
            </div>
            <Link
              href={`/blog/${mostRecentBlog?.category}/${mostRecentBlog?.id}`}
            >
              <a>
                <h2 className={styles.title}>{mostRecentBlog?.title} </h2>
              </a>
            </Link>

            <p className={styles.excerpt}>{mostRecentBlog?.excerpt}</p>
          </div>
        </div>

        {/* Dummy Blog Post. Blog data will be mapped here */}
        <div className={styles.singlePostContainer}>
          {blogs?.data &&
            blogs?.data?.map((item, index) => (
              <BlogPreview
                key={item?.id}
                id={item?.id}
                title={item.title}
                category={item.category}
                excerpt={item?.excerpt}
                created_at={item?.created_at}
                thumbnail={item?.thumbnail}
                thumbnail_alt={item?.thumbnail_alt}
              />
            ))}
        </div>
        {/* Dummy Blog Post. Blog data will be mapped here */}

        {/* Pagination */}
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            onChange={paginationHandler}
            current={router?.query?.page}
            total={blogs?.total_records}
            defaultPageSize={10}
          />
        </div>
        {/* Pagination */}
      </div>
    </Layout>
  );
};
// const Blog = ({ blogs, error, router, mostRecentBlog }) => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const startLoading = () => setIsLoading(true);
//   const stopLoading = () => setIsLoading(false);

//   useEffect(() => {
//     Router.events.on("routeChangeStart", startLoading);
//     Router.events.on("routeChangeComplete", stopLoading);
//     return () => {
//       Router.events.off("routeChangeStart", startLoading);
//       Router.events.off("routeChangeComplete", stopLoading);
//     };
//   }, []);

//   const paginationHandler = (page, pageSize = 10) => {
//     const currentPath = router.pathname;
//     const currentQuery = router.query;
//     currentQuery.page = page;

//     router.push({
//       pathname: currentPath,
//       query: currentQuery,
//     });
//   };

//   if (error) return <CustomErrorPage message={errorMessage} />;

//   // if(isLoading) return <Loa

//   return (
//     <Layout defaultMarginTop={true}>
//       <div className={styles.container}>
//         <div className={styles.pageTitle}>
//           <h3>Kreatesell blog</h3>
//           <p>Tips to make money online and Kreatesell updates.</p>
//         </div>

//         <div className={styles.hero}>
//           <div className={styles.heroImage}>
//             {mostRecentBlog?.thumbnail &&
//               mostRecentBlog?.thumbnail !== "string" && (
//                 <Image
//                   src={mostRecentBlog?.thumbnail}
//                   alt={mostRecentBlog?.thumbnail_alt}
//                   width="635"
//                   height="380"
//                 />
//               )}
//           </div>
//           <div className={styles.content}>
//             <div className={styles.date}>
//               {moment(mostRecentBlog?.created_at).format("MMMM, DD YYYY")}
//             </div>
//             <Link
//               href={`/blog/${mostRecentBlog?.category}/${mostRecentBlog?.id}`}
//             >
//               <a>
//                 <h2 className={styles.title}>{mostRecentBlog?.title} </h2>
//               </a>
//             </Link>

//             <p className={styles.excerpt}>{mostRecentBlog?.excerpt}</p>
//           </div>
//         </div>

//         {/* Dummy Blog Post. Blog data will be mapped here */}
//         <div className={styles.singlePostContainer}>
//           {blogs?.data &&
//             blogs?.data?.map((item, index) => (
//               <BlogPreview
//                 key={item?.id}
//                 id={item?.id}
//                 title={item.title}
//                 category={item.category}
//                 excerpt={item?.excerpt}
//                 created_at={item?.created_at}
//                 thumbnail={item?.thumbnail}
//                 thumbnail_alt={item?.thumbnail_alt}
//               />
//             ))}
//         </div>
//         {/* Dummy Blog Post. Blog data will be mapped here */}

//         {/* Pagination */}
//         <div className={styles.pagination}>
//           <Pagination
//             defaultCurrent={1}
//             onChange={paginationHandler}
//             current={router?.query?.page}
//             total={blogs?.total_records}
//             defaultPageSize={10}
//           />
//         </div>
//         {/* Pagination */}
//       </div>
//     </Layout>
//   );
// };

export default withRouter(Blog);

export const BlogPreview = ({
  title,
  id,
  category,
  excerpt,
  created_at,
  thumbnail,
  thumbnail_alt,
}) => {
  return (
    <div className={styles.singlePost}>
      <div className={styles.singleImage}>
        {thumbnail && thumbnail !== "string" && (
          <Image
            src={thumbnail}
            width="345"
            height="220"
            alt={thumbnail_alt ? thumbnail_alt : title}
            className={styles.blogImage}
          />
        )}
      </div>
      <div className={styles.singleDate}>
        {moment(created_at).format("MMMM, DD YYYY")}

        {/* {formatDistanceToNow(
          new Date(
            new Date(created_at).getFullYear(),
            new Date(created_at).getMonth(),
            new Date(created_at).getDay()
          ),
          { addSuffix: true }
        )}   */}
      </div>
      <Link href={`/blog/${category}/${id}`}>
        <a>
          <h4 className={styles.singleTitle}>{title}</h4>
        </a>
      </Link>
      <div className={styles.excerptDiv}>
        <p className={styles.singleExcerpt}>{excerpt}</p>
      </div>
      <div className={styles.divider} />
    </div>
  );
};

// export async function getServerSideProps(ctx) {
//   try {
//     const page = parseInt(ctx.query.page) || 1;

//     const reqOne = axios.get(
//       `${process.env.BASE_URL}blogs/posts/active?page=${page}`
//     );

//     const reqTwo = axios.get(
//       `${process.env.BASE_URL}blogs/posts/active?page=${1}`
//     );

//     const [resOne, resTwo] = await Promise.all([reqOne, reqTwo]);

//     return {
//       props: {
//         blogs: resOne.data,
//         mostRecentBlog: resTwo.data.data[0],
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: error.message,
//       },
//     };
//   }
// }
