import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Switch} from 'antd';
import ApiService from '../../utils/axios';

const TwoFactor = () => {
	const [loading, setLoading] = useState(false);
	const [checked, setChecked] = useState(false);
	const {
		store: {user},
	} = useSelector((state) => state.store);

	useEffect(() => {
		if (user?.is2_fa_set) {
			setChecked(true);
		}
	}, [user]);

	const handleChange = () => {
		setLoading(true);
		ApiService.request('post', 'Seller/Activate/De-Activate2FA', (res) => {
			setLoading(false);
			if (res.message.includes('successfully activated 2fa')) {
				setChecked(true);
			} else {
				setChecked(false);
			}
		});
	};

	return (
		<>
			<Row style={{marginTop: '50px'}}>
				<Col md={18} sm={24}>
					<h2>Enable Two-Factor Authentication using email</h2>
					<p style={{color: '#8C8C8C'}}>
						Two-factor Authentication is an additional security
						layer to secure your account.
					</p>
				</Col>
				<Col
					md={6}
					sm={24}
					style={{display: 'flex', justifyContent: 'flex-end'}}
				>
					<Switch onChange={handleChange} {...{checked, loading}} />
				</Col>
			</Row>
		</>
	);
};

export default TwoFactor;
