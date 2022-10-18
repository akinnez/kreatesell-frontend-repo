import {updateNotifications} from 'redux/actions';
import axiosApi from 'utils/axios';

export const generateName = (name, type) => {
	return name
		? name
		: type === 'affiliate request'
		? 'A Kreator'
		: 'An affiliate';
};

export const generateProductName = (productName, type) => {
	return productName
		? productName
		: type === 'affiliate request'
		? 'their product'
		: 'A product';
};

export const updateNotificationsFn = (id, dispatch, mutate) => {
	axiosApi.request(
		'post',
		`${process.env.BASE_URL}notification/read?id=${id}`,
		() => {
			dispatch(updateNotifications(id));
			mutate(`${process.env.BASE_URL}notification/get-notifications`);
		},
		() => null
	);
};
