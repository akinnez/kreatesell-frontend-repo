import {GET_ACTIVE_BLOGS_URL} from '../apiUrl';
import axios from 'axios';

export const getBlogs = async () => {
	try {
		const res = await axios.get(GET_ACTIVE_BLOGS_URL);
		return res?.data?.data;
	} catch (error) {
		console.log('error is', error);
		return error;
	}
};
