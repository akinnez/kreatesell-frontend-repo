import * as Yup from 'yup';

export const SalesPageSchema1 = () => {
	return Yup.object().shape({
		salesPageUrl: Yup.string().required('Sales page url is required'),
	});
};
export const SalesPageSchema2 = () => {
	return Yup.object().shape({
		link: Yup.string().required('Link is required'),
		imageLink: Yup.string().required('Image Link is required'),
	});
};
