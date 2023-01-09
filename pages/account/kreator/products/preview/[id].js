import {useRouter} from 'next/router';
import PreviewHeader from 'components/Preview/PreviewHeader';
import {AuthGetProductById, GetProductByIDNotAut} from 'redux/actions';
import {useEffect} from 'react';
import PreviewContent from 'components/Preview/PreviewContent';
import AuthLayout from '../../../../../components/authlayout';
import styles from '../../../../../components/Preview/PreviewHeader.module.scss';
import {PoweredByKS} from 'components/PoweredByKs';

// export default function PreviewProduct ({id}){
export default function PreviewProduct() {
	const router = useRouter();
	const getProductByID = GetProductByIDNotAut();

	useEffect(() => {
		if (router.query.id) {
			getProductByID(router.query.id);
		}
	}, [router.query.id]);

	if (!router.query.id) {
		return null;
	}

	return (
		<AuthLayout> 
			<div
				style={{
					position: 'absolute',
					background: '#e5e5e5',
					left: 0,
					top: 0,
					width: '100%',
				}}
				className={styles.previewPageContainer}
			>
				<PreviewHeader id={router.query.id} isPreviewMain={true} />
				<PreviewContent />
				<PoweredByKS />
			</div>
		</AuthLayout>
	);
}

// export async function getServerSideProps({query: {id}}){
//     return {
//         props: {
//             id
//         }
//     }
// }
