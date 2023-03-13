import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import axiosAPI from 'utils/axios';

const useFetchData = (url) => {
	const [affiliateLink, setAffiliateLink] = useState(null);
	const [salesPage, setSalesPage] = useState(null);
	const [error, setError] = useState(null);
	const router = useRouter();

	useEffect(() => {
		// if (url) {
		// 	axiosAPI.request(
		// 		'get',
		// 		url,
		// 		(res) => {
		// 			setData(res.data);
		// 		},
		// 		(err) => {
		// 			setError(err.message);
		// 		}
		// 	);
		// }
		if (router.query.productId && url) {
			const fetcher = async () => {
				const getAffiliateLink = axiosAPI.request(
					'get',
					url,
					(res) => {
						return res.data;
					},
					(err) => {
						return err.message;
					}
				);
				const getSalesPageLink = axiosAPI.request(
					'get',
					`affiliate/get-salespage-link?productId=${router.query.productId}`,
					(res) => {
						return res.data?.message;
					},
					(err) => {
						return err.message;
					}
				);

				const [affiliateLinkData, salesPageLinkData] =
					await Promise.all([getAffiliateLink, getSalesPageLink]);
				setAffiliateLink(affiliateLinkData);
				setSalesPage(salesPageLinkData);
			};
			fetcher();
		}
	}, [url, router.query.productId]);

	return {affiliateLink, salesPage, error};
};

export default useFetchData;
