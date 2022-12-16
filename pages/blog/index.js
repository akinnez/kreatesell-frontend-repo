import {useState, useEffect} from 'react';
import Image from 'next/image';
import Router, {withRouter, useRouter} from 'next/router';
import Link from 'next/link';

import {Pagination} from 'antd';
import axios from 'axios';
import moment from 'moment';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import {Layout, Input} from '../../components';
import styles from '../../public/css/Blog.module.scss';
import {BlogHero, SingleBlog} from '../../utils';
import CustomErrorPage from 'components/CustomErrorPage/CustomErrorPage';
import Loader from 'components/loader';
import {Briefcase, Clock} from '../../utils';
import BlogTab from 'components/Blog/blogTabs';
import Spinner from 'components/Spinner';

const Blog = () => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isBlogDataLoading, setIsBlogDataLoading] = useState(true);
	const [active, setActive] = useState('All');
	const [Blogs, setBlogs] = useState({});
	const [RecentBlogs, setMostRecentBlog] = useState({});
	const [page, setPage] = useState(1);
	const startLoading = () => setIsLoading(true);
	const stopLoading = () => setIsLoading(false);
	useEffect(() => {
		Router.events.on('routeChangeStart', startLoading);
		Router.events.on('routeChangeComplete', stopLoading);
		return () => {
			Router.events.off('routeChangeStart', startLoading);
			Router.events.off('routeChangeComplete', stopLoading);
		};
	}, []);
	// console.log("recent blogs", RecentBlogs)
	// console.log("blogs", Blogs)
	useEffect(() => {
		const func = async () => {
			setIsBlogDataLoading(true);
			try {
				const reqOne = axios.get(
					// `${process.env.BASE_URL}blogs/posts/active?page=${page}`
					`${process.env.BASE_URL}blogs/posts/active?page=${router.query.page}`
				);

				const res = await reqOne;
				setBlogs(res.data);
				setMostRecentBlog(res.data.data[0]);
			} catch (err) {
				setErrorMessage(err.message);
			} finally {
				setIsBlogDataLoading(false);
			}
		};

		func();
	}, [router.query.page]);

	useEffect(() => {
		if (router.query.page) {
			setPage(router.query.page);
		}
	}, [router.query.page]);

	// console.log("router.query.page",router.query.page);
	// console.log("page",page);
	const paginationHandler = (page, pageSize = 10) => {
		const currentPath = router.pathname;
		const currentQuery = router.query;
		currentQuery.page = page;
		setPage(page);
		router.push({
			pathname: currentPath,
			query: currentQuery,
		});
	};

	if (errorMessage) return <CustomErrorPage message={errorMessage} />;
	if (isBlogDataLoading)
		return (
			<Layout defaultMarginTop={true}>
				<div
					style={{
						height: 'calc(100vh - 7rem)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Spinner />
				</div>
			</Layout>
		);
	return (
		<Layout defaultMarginTop={true}>
			<div className={styles.container}>
				<div className={styles.pageTitle}>
					<h3>Kreatesell blog</h3>
					<p>Tips to make money online and KreateSell updates.</p>
				</div>
				<div className={styles.hero}>
					<div className={styles.left}>
						<div className={styles.heroImage}>
							<Image
								src={RecentBlogs?.thumbnail}
								alt={RecentBlogs?.thumbnail_alt}
								width="635"
								height="380"
								className={styles.recentBlogImage}
							/>
						</div>
						<div className={styles.content}>
							{/* <div className={styles.date}>
              {moment(mostRecentBlog[0]?.created_at).format("MMMM, DD YYYY")}
            </div> */}
							<Link
								href={`/blog/${RecentBlogs?.category}/${RecentBlogs?.id}`}
							>
								<a>
									<h2 className={styles.title}>
										{RecentBlogs?.title}{' '}
									</h2>
								</a>
							</Link>
							<div className={styles.categoryTime}>
								<span className={styles.category}>
									<Image src={Briefcase} alt="" width="25" />{' '}
									{RecentBlogs?.category}
								</span>
								<p className={styles.time}>
									{' '}
									<Image src={Clock} alt="" width="15" />{' '}
									{moment(RecentBlogs?.created_at).fromNow()}
								</p>
							</div>
							<p
								className={styles.description}
								dangerouslySetInnerHTML={{
									__html: RecentBlogs.description,
								}}
							/>
							{/* <p className={styles.excerpt}>{mostRecentBlog[0]?.excerpt} yehgdubbdbi</p> */}
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.search}>
							<Input
								type="search"
								placeholder="Search by keyword"
								className={styles.input}
								// onChange={(e)=>handleInputChange(e.target.value)}
							/>
						</div>
						<div className={styles.categories}>
							<h3 className={styles.header}>Categories: </h3>
							<BlogTab {...{active, setActive}} />
						</div>
					</div>
				</div>

				{/* Dummy Blog Post. Blog data will be mapped here */}
				<div className={styles.singlePostContainer}>
					{Blogs?.data &&
						Blogs?.data?.map((item, index) => (
							<BlogPreview
								key={item?.id}
								id={item?.id}
								title={item.title}
								category={item.category}
								excerpt={item?.description}
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
						// defaultCurrent={page}
						onChange={paginationHandler}
						current={page || router?.query?.page}
						total={Blogs?.total_records}
						defaultPageSize={10}
					/>
				</div>
				{/* Pagination */}
			</div>
		</Layout>
	);
};

export default Blog;

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
				{thumbnail !== 'string' && (
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
				{moment(created_at).format('MMMM, DD YYYY')}

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
			<div className={styles.categoryTime}>
				<span className={styles.category}>
					<Image src={Briefcase} alt="" width="25" />
					{'  '}Marketing
				</span>
				<p className={styles.time}>
					<Image src={Clock} alt="" width="15" /> 7 days ago
				</p>
			</div>
			<p
				className={styles.description}
				dangerouslySetInnerHTML={{
					__html: excerpt,
				}}
			/>
			{/* <div className={styles.excerptDiv}>
        <p className={styles.singleExcerpt}>{excerpt}</p>
      </div> */}
			<div className={styles.divider} />
		</div>
	);
};
