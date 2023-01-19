import React, { useState, useEffect } from 'react';
import style from './Index.module.scss';
// import { Checkbox, Row, Col, Spin, Form } from 'antd';
// import {Button} from '../form-input';
import ApiService from '../../utils/axios';
import { ChangePassword } from '../../redux/actions';
import { useSelector } from 'react-redux';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
// import {useRouter} from 'next/router';

import {
	Button,
	FormError,
	Modal,
	PasswordInput,
	ChangePasswordSuccessModal,
} from '../';

const Index = () => {
	// const [state, setState] = useState()
	// const [loading, setLoading] = useState(false)

	// useEffect(() => {
	//   setLoading(true)
	//   ApiService.request(
	//     'GET',
	//     'v1/kreatesell/utils/allowed-currencies',
	//     (res) => {
	//       setLoading(false)
	//       const item = res?.data?.currencies?.map(({ id, short_name }) => ({
	//         label: short_name,
	//         value: id,
	//       }))
	//       setState(item)
	//     },
	//   )
	// }, [])

	// const router = useRouter();

	const { loading } = useSelector((state) => state.auth);

	const [modalVisible, setVisible] = useState(false);

	const changePassword = ChangePassword();

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const passwordData = {
		current_password: currentPassword,
		new_password: newPassword,
		confirm_password: confirmPassword,
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await changePassword(passwordData, () => {
				setVisible(true);
				// router.push('/login');
				localStorage.clear();
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={style.wrapper}>
			<h3>Account Settings</h3>
			<div className={style.bordered}>
				<h4>Password</h4>
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					className={style.container}
				>
					<PasswordInput
						label={<MainPassWordLabel />}
						name="password"
						placeholder="Enter current password"
						onChange={(e) => setCurrentPassword(e.target.value)}
						type="password"
					/>

					<PasswordInput
						label="New Password"
						name="password"
						placeholder="Choose new password"
						onChange={(e) => setNewPassword(e.target.value)}
						type="password"
					/>

					<PasswordInput
						label="Repeat New Password"
						name="confirm_password"
						placeholder="Repeat new password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
					/>

					<Button
						text="Reset password"
						bgColor="primaryBlue"
						loading={loading}
					/>
				</form>

				{/* <Modal
					onClose={() => setVisible(false)}
					visible={modalVisible}
					cancelPropagation={true}
				>
					<ChangePasswordSuccessModal />
				</Modal> */}
 
				<DialogOverlay
					isOpen={modalVisible}
					onDismiss={() => setVisible(false)}
					className="pt-12 "
				>
					<DialogContent className={style.modal} aria-label="modal">
						<ChangePasswordSuccessModal />
					</DialogContent>
				</DialogOverlay>
			</div>
		</div>
	);
};

const MainPassWordLabel = () => {
	return (
		<p className={style.mainText}>
			Current Password -{' '}
			<span>Enter current password to set a new password</span>
		</p>
	);
};
export default Index;
