import {useMemo} from 'react';

import {useSelector} from 'react-redux';
import {Divider, Modal, Typography} from 'antd';
import CloseIcon from 'components/affiliates/CloseIcon';
import Spinner from 'components/Spinner';
import BankInformation from '../BankInformation';
import PayoutsForm from '../PayoutsForm';
import styles from './index.module.scss';
import useCurrency from 'hooks/useCurrency';

const {Title, Text} = Typography;

const EditBankDetails = ({
	editModal,
	hideEditModal,
	bankDetails,
	showSuccessModal,
}) => {
	const {countries, banksByCountryId, loading} = useSelector(
		(state) => state.utils
	);

	console.log(bankDetails, 'bankdetails');

	// const memoizedCountries = useMemo(() => {
	// 	if (countries) {
	// 		return [
	// 			...countries.filter((ctr) => ctr.is_payable),

	// 		];
	// 	}
	// 	return [];
	// }, [countries]);

	return (
		<Modal
			title={null}
			footer={null}
			visible={editModal}
			onCancel={hideEditModal}
			closeIcon={<CloseIcon />}
			className={styles.modal}
			width={765}
		>
			<header className={styles.header}>
				<Title level={2}>Existing Bank Details</Title>
				<BankInformation bankDetails={bankDetails} />
			</header>
			<Divider className={styles.divider} />
			<section className={styles.text}>
				<Title level={2}>Update Your Bank Account Details</Title>
				<p>
					<Text>We pay your money into this account</Text>
				</p>
			</section>
			{loading ? (
				<Spinner />
			) : countries.length === 0 ? (
				<div>
					<Text>
						Something has gone wrong. Please Try again later
					</Text>
				</div>
			) : (
				<section>
					<PayoutsForm
						hideModal={hideEditModal}
						showSuccessModal={showSuccessModal}
						countries={countries}
						banksByCountryId={banksByCountryId}
						bankDetails={bankDetails}
					/>
				</section>
			)}
		</Modal>
	);
};

export default EditBankDetails;
