import React, {useState, useEffect} from 'react';
import useSWR from 'swr';

import axiosAPI from 'utils/axios';
import styles from './BlogTabs.module.scss';

const BlogTab = ({active, setActive}) => {
	const [categoriesData, setCategoriesData] = useState([{value: 'All'}]);
	const {data: categories, error: categoriesError} = useSWR(
		`${process.env.BASE_URL}blogs/posts/getcategories`,
		(url) => {
			return axiosAPI.request(
				'get',
				`${process.env.BASE_URL}blogs/posts/getcategories`,
				(res) => {
					return res?.data;
				},
				(err) => {
					showToast(err.message, 'error');
				}
			);
		}
	);

	const sortCategories = () => {
		if (categories) {
			categories?.forEach((cat) =>
				setCategoriesData((prev) => [...prev, {value: cat?.category}])
			);
		}
	};

	useEffect(() => {
		sortCategories();
	}, [categories]);

	// let allRoles = [
	//   { title: "All", tabKey: "All", value: "All" },
	//   { title: "Marketing", tabKey: "Marketing", value: "Marketing" },
	//   { title: "Features", tabKey: "Features", value: "Features" },
	//   { title: "Lifestyle", tabKey: "Lifestyle", value: "Lifestyle" },
	//   { title: "Press Release", tabKey: "PressRelease", value: "PressRelease" },
	//   { title: "Course Creation", tabKey: "CourseCreation", value: "CourseCreation" },
	//   { title: "Favourite", tabKey: "Favourite", value: "Favourite" },
	// ];
	if (!categories && !categoriesError) return <h1>Loading...</h1>;
	return (
		<div className={styles.tabContainer}>
			{categoriesData.map((tab, i) => (
				<div key={`${tab.value} ${i}`} className={styles.tabInner}>
					<button
						className={styles.tabButton}
						style={{
							color: active === tab.value ? '#ffffff' : '#000000',
							background:
								active === tab.value
									? '#0072ef'
									: 'transparent',
							border:
								active === tab.value
									? 'none'
									: '1px solid #8c8c8c',
							transition: 'all 0.3s ease-in',
						}}
						onClick={() => setActive(tab.value)}
					>
						{tab.value}
					</button>
				</div>
			))}
		</div>
	);
};

export default React.memo(BlogTab);
