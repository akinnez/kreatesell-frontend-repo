import {Button} from 'components/button/Button';
import React from 'react';
import Image from 'next/image';
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {FacebookBtn, showToast} from 'utils';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';

const FacebookLoginComponent = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const responseFacebook = (response) => {
		// Login failed
		if (response.status === 'unknown') {
			return false;
		}
		if (response.accessToken) {
			axios
				.post(
					`${process.env.BASE_URL}auth/facebookSignUp?accessToken=${response.accessToken}`,
					{}
				)
				.then((res) => {
					// console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", res?.data);
					localStorage.setItem('token', res?.data?.data?.token);
					localStorage.setItem(
						'user',
						JSON.stringify(res?.data?.data?.user)
					);
					router.push('/account/dashboard');
				})
				.catch((err) => {
					// showToast(err.message, "error");
					console.log(err);
				});
		}
	};
	const responseFacebookSignup = (response) => {
		// Login failed
		if (response.status === 'unknown') {
			return false;
		}
		if (response.accessToken) {
			axios
				.post(
					`${process.env.BASE_URL}auth/facebookSignUp?accessToken=${response.accessToken}`,
					{}
				)
				.then((res) => {
					router.push('/login');
				})
				.catch((err) => {
					// showToast(err.message, "error");
					console.log(err);
				});
		}
	};

	return (
		<FacebookLogin
			appId={process.env.FB_APP_ID}
			callback={
				router.pathname === 'signup'
					? responseFacebookSignup
					: responseFacebook
			}
			render={(renderProps) => (
				<button onClick={() => renderProps.onClick()}>
					<Image src={FacebookBtn} alt="sign up with facebook" />
				</button>
			)}
		/>
	);
};

export default FacebookLoginComponent;
