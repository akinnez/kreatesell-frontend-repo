import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {Spin, Layout} from 'antd';
import {ToastContainer} from 'react-toastify';
import Nav from './Header';
import {
	checkExpiredUserToken,
	getUser,
	showToast,
	_isUserLoggedIn,
	isAnEmpytyObject,
} from 'utils';
import {USER} from 'redux/types/auth.types';
import {GetProductTypes} from 'redux/actions/product.actions';
import useFetchStore from 'hooks/useFetchStore';
import useFetchUtilities from 'hooks/useFetchUtilities';
import useFetchNotifications from 'hooks/useFetchNotifications';
import styles from './index.module.scss';

const Loader = () => {
	return (
		<>
			<div className="loader">
				<Spin size="large" />
				<p>Please wait...</p>
			</div>

			<style jsx>{`
				.loader {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					flex-direction: column;
				}
			`}</style>
		</>
	);
};

const ProfileLayout = ({
	loading,
	children,
	contentStyle,
	mobilePadding = false,
	customWidth = false,
	style,
}) => {
	const {Content} = Layout;
	const router = useRouter();

	useEffect(() => {
		checkExpiredUserToken();
	}, []);
	useEffect(() => {
		if (!_isUserLoggedIn()) {
			showToast('Login required to view page', 'info');
			return router.push('/login');
		}
	}, []);

	const user = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const userIsEmpty = isAnEmpytyObject(user.user);
	const productTypes = GetProductTypes();

	useEffect(() => {
		if (userIsEmpty) {
			dispatch({type: USER.REQUEST});

			const userStorage = getUser();

			if (userStorage) {
				dispatch({type: USER.SUCCESS, payload: userStorage});
			}
		}
	}, [dispatch, userIsEmpty]);

	useEffect(() => {
		productTypes();
	}, []);

	useFetchUtilities();
	useFetchStore();
	useFetchNotifications();

	return (
		<>
			<Layout>
				<Layout>
					<Nav />
					<Content
						// style={{
						// 	backgroundColor: "rgba(245, 245, 245, 1)",
						// 	padding: "50px 20px 10px 20px",
						// }}

						// The previous style above was replaced with the one below cos a different bg needed to be dynamically rendered for mobile view.
						className={`content ${
							mobilePadding && `authLayout-no-mobile-padding`
						}`}
					>
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={true}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
						{loading ? (
							<Loader />
						) : (
							<div
								className={
									customWidth
										? styles.fullContainer
										: styles.container
								}
							>
								{children}
							</div>
						)}
					</Content>
					{/* <Footer>Footer</Footer> */}
				</Layout>
			</Layout>

			<style jsx>{`
				.content {
					background-color: rgba(245, 245, 245, 1);
					padding: 50px 20px 10px 20px;
				}
			`}</style>
		</>
	);
};

export default ProfileLayout;
